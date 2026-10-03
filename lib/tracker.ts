"use client";

import {
  sendVisitorArrivalToTelegram,
  sendVisitorMilestoneToTelegram,
} from "./telegram";

export interface RecordedClick {
  x: number;
  y: number;
  t: number;
  tag: string;
  text: string;
  path: string;
}

export interface RecordedMovement {
  x: number;
  y: number;
  t: number;
}

export interface VisitorSessionRecord {
  id: string;
  startTime: number;
  lastActive: number;
  page: string;
  referrer: string;
  location?: string;
  ip?: string;
  isp?: string;
  device?: string;
  browser?: string;
  clicks: RecordedClick[];
  movements: RecordedMovement[];
  maxScroll: number;
}

const STORAGE_KEY_SESSIONS = "astria_recorded_sessions_v1";
const STORAGE_KEY_NOTIFIED = "astria_visitor_session_notified";
const MAX_SESSIONS = 25;
const MAX_MOVEMENTS_PER_SESSION = 500;

function getVisitorId(): string {
  if (typeof window === "undefined") return "anon";
  let vid = localStorage.getItem("astria_vid");
  if (!vid) {
    vid = Math.random().toString(36).substring(2, 8).toUpperCase();
    localStorage.setItem("astria_vid", vid);
  }
  return vid;
}

function parseDevice(): { device: string; browser: string; os: string } {
  if (typeof window === "undefined") {
    return { device: "Desktop", browser: "Unknown", os: "Unknown" };
  }
  const ua = navigator.userAgent;
  let device = "Desktop";
  if (/mobile/i.test(ua)) device = "Mobile";
  if (/ipad|tablet/i.test(ua)) device = "Tablet";

  let os = "Unknown OS";
  if (/mac/i.test(ua)) os = "macOS";
  else if (/win/i.test(ua)) os = "Windows";
  else if (/android/i.test(ua)) os = "Android";
  else if (/iphone|ipad|ipod/i.test(ua)) os = "iOS";
  else if (/linux/i.test(ua)) os = "Linux";

  let browser = "Unknown";
  if (/edg/i.test(ua)) browser = "Edge";
  else if (/chrome|crios/i.test(ua)) browser = "Chrome";
  else if (/firefox|fxios/i.test(ua)) browser = "Firefox";
  else if (/safari/i.test(ua)) browser = "Safari";

  return { device, browser, os };
}

let activeSession: VisitorSessionRecord | null = null;
let lastMoveTime = 0;
let hasSentScroll50 = false;
let hasSentScroll100 = false;

export function getRecordedSessions(): VisitorSessionRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SESSIONS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveActiveSession() {
  if (!activeSession || typeof window === "undefined") return;
  try {
    const existing = getRecordedSessions();
    const filtered = existing.filter((s) => s.id !== activeSession!.id);
    const updated = [activeSession, ...filtered].slice(0, MAX_SESSIONS);
    localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(updated));
  } catch {
    // quota or storage disabled
  }
}

export async function initVisitorTracking() {
  if (typeof window === "undefined") return;

  const visitorId = getVisitorId();
  const { device, browser, os } = parseDevice();
  const screen = `${window.screen.width}x${window.screen.height}`;
  const page = window.location.pathname + window.location.search;
  const referrer = document.referrer ? new URL(document.referrer).hostname : "Direct";

  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get("utm_source");
  const utmCampaign = urlParams.get("utm_campaign");
  const utm = utmSource ? `${utmSource}${utmCampaign ? ` / ${utmCampaign}` : ""}` : undefined;

  // Initialize in-memory active session
  activeSession = {
    id: `${visitorId}-${Date.now().toString(36)}`,
    startTime: Date.now(),
    lastActive: Date.now(),
    page,
    referrer,
    device,
    browser,
    clicks: [],
    movements: [],
    maxScroll: 0,
  };

  // Fetch IP & location in background
  let locationStr = "Unknown";
  let ipStr = "";
  let ispStr = "";

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const res = await fetch("https://ipwho.is/", { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (data && data.success) {
        locationStr = `${data.city || ""}, ${data.region || ""}, ${data.country || ""}`.replace(/^, |, $/g, "");
        ipStr = data.ip || "";
        ispStr = data.connection?.isp || "";
        if (activeSession) {
          activeSession.location = locationStr;
          activeSession.ip = ipStr;
          activeSession.isp = ispStr;
        }
      }
    }
  } catch {
    // Non-blocking fallback
  }

  // Check if we already notified Telegram for this browser session to avoid duplicate pings
  const sessionNotified = sessionStorage.getItem(STORAGE_KEY_NOTIFIED);
  if (!sessionNotified) {
    sessionStorage.setItem(STORAGE_KEY_NOTIFIED, "true");
    sendVisitorArrivalToTelegram({
      visitorId,
      location: locationStr,
      ip: ipStr,
      isp: ispStr,
      device,
      browser,
      os,
      screen,
      page,
      referrer,
      utm,
    }).catch(() => {});
  }

  // Setup movement & interaction listeners
  setupEventListeners(visitorId, locationStr);
}

function setupEventListeners(visitorId: string, locationStr: string) {
  const startTime = Date.now();

  function getTimeSpent(): string {
    const s = Math.floor((Date.now() - startTime) / 1000);
    if (s < 60) return `${s}s`;
    return `${Math.floor(s / 60)}m ${s % 60}s`;
  }

  // 1. Mouse movements (throttled 80ms)
  const onMouseMove = (e: MouseEvent) => {
    const now = Date.now();
    if (now - lastMoveTime > 80 && activeSession) {
      lastMoveTime = now;
      activeSession.lastActive = now;
      if (activeSession.movements.length < MAX_MOVEMENTS_PER_SESSION) {
        activeSession.movements.push({
          x: Math.round(e.clientX),
          y: Math.round(e.clientY),
          t: now - startTime,
        });
      }
    }
  };

  // 2. Click tracking
  const onClick = (e: MouseEvent) => {
    if (!activeSession) return;
    const target = e.target as HTMLElement | null;
    const tag = target?.tagName.toLowerCase() || "unknown";
    const text = (target?.innerText || target?.getAttribute("aria-label") || target?.getAttribute("title") || "").slice(0, 40).trim();

    activeSession.clicks.push({
      x: Math.round(e.clientX),
      y: Math.round(e.clientY),
      t: Date.now() - startTime,
      tag,
      text,
      path: window.location.pathname,
    });
    saveActiveSession();

    // Check for high-intent actions
    const lowerText = text.toLowerCase();
    const href = (target?.closest("a") as HTMLAnchorElement)?.href || "";

    if (
      lowerText.includes("consultation") ||
      lowerText.includes("get in touch") ||
      lowerText.includes("book") ||
      href.includes("whatsapp") ||
      href.startsWith("tel:") ||
      href.startsWith("mailto:")
    ) {
      sendVisitorMilestoneToTelegram({
        visitorId,
        action: href.includes("whatsapp") ? "WhatsApp Clicked" : "High Intent CTA Clicked",
        details: text || href,
        timeSpent: getTimeSpent(),
        page: window.location.pathname,
        location: locationStr,
      }).catch(() => {});
    }
  };

  // 3. Scroll depth tracking
  const onScroll = () => {
    if (!activeSession) return;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const scrolled = Math.min(100, Math.round((window.scrollY / totalHeight) * 100));

    if (scrolled > activeSession.maxScroll) {
      activeSession.maxScroll = scrolled;
    }

    if (scrolled >= 50 && !hasSentScroll50) {
      hasSentScroll50 = true;
      sendVisitorMilestoneToTelegram({
        visitorId,
        action: "Scrolled 50% of Page",
        details: "Engaged reading through agency highlights",
        timeSpent: getTimeSpent(),
        page: window.location.pathname,
        location: locationStr,
      }).catch(() => {});
    }

    if (scrolled >= 90 && !hasSentScroll100) {
      hasSentScroll100 = true;
      sendVisitorMilestoneToTelegram({
        visitorId,
        action: "Scrolled to Bottom (100%)",
        details: "Viewed all sections, services, and footer",
        timeSpent: getTimeSpent(),
        page: window.location.pathname,
        location: locationStr,
      }).catch(() => {});
    }
  };

  // 4. Save session periodically and on unload
  const interval = setInterval(saveActiveSession, 5000);
  window.addEventListener("beforeunload", saveActiveSession);
  window.addEventListener("mousemove", onMouseMove, { passive: true });
  window.addEventListener("click", onClick, { capture: true, passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });

  return () => {
    clearInterval(interval);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("click", onClick);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("beforeunload", saveActiveSession);
  };
}
