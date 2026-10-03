// Telegram Bot integration for Astria & Co.
// Bot Username: @astriaaryan_bot
// Bot Token: 8996638171:AAH-7FC2E0OrLxvTbgID7JErHiDpD4Rc9G4

export const TELEGRAM_BOT_TOKEN =
  process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN ||
  "8996638171:AAH-7FC2E0OrLxvTbgID7JErHiDpD4Rc9G4";

export const DEFAULT_TELEGRAM_CHAT_ID =
  process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || "5765135287";

function escapeHtml(str: string): string {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Resolves the Telegram chat ID:
 * 1. From environment/default constant if specified
 * 2. From localStorage cache if previously found
 * 3. Dynamically from Telegram getUpdates (picks up the latest user who started or messaged the bot)
 */
export async function resolveTelegramChatId(): Promise<string | null> {
  if (DEFAULT_TELEGRAM_CHAT_ID) {
    return DEFAULT_TELEGRAM_CHAT_ID;
  }

  if (typeof window !== "undefined") {
    const cached = localStorage.getItem("astria_telegram_chat_id");
    if (cached) return cached;
  }

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`,
      { cache: "no-store" }
    );
    const data = await res.json();
    if (data.ok && Array.isArray(data.result) && data.result.length > 0) {
      for (let i = data.result.length - 1; i >= 0; i--) {
        const update = data.result[i];
        const chatId =
          update.message?.chat?.id ||
          update.channel_post?.chat?.id ||
          update.my_chat_member?.chat?.id;
        if (chatId) {
          const idStr = String(chatId);
          if (typeof window !== "undefined") {
            localStorage.setItem("astria_telegram_chat_id", idStr);
          }
          return idStr;
        }
      }
    }
  } catch (err) {
    console.error("Failed to auto-resolve Telegram chat ID:", err);
  }

  return null;
}

export interface ContactFormData {
  name: string;
  brand?: string;
  email: string;
  phone: string;
  website?: string;
  services?: string[];
  projectType?: string;
  brief: string;
  budget?: string;
  timeline?: string;
  source?: string;
  refs?: string;
  fileNames?: string[];
}

/**
 * Sends the contact form submission directly to the Telegram bot
 */
export async function sendContactToTelegram(data: ContactFormData): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const chatId = await resolveTelegramChatId();

    if (!chatId) {
      console.warn(
        "Telegram notification: No chat_id found. Please start @astriaaryan_bot on Telegram."
      );
      return {
        success: false,
        error:
          "Telegram Chat ID not resolved yet. Make sure to send /start to @astriaaryan_bot on Telegram.",
      };
    }

    const servicesText =
      data.services && data.services.length > 0
        ? data.services.join(", ")
        : "Not specified";

    const filesText =
      data.fileNames && data.fileNames.length > 0
        ? data.fileNames.join(", ")
        : "None";

    const now = new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    }).format(new Date());

    const message = `
⚡ <b>NEW CONTACT / CONSULTATION LEAD</b>
━━━━━━━━━━━━━━━━━━━━

👤 <b>Client Name:</b> ${escapeHtml(data.name)}
🏢 <b>Brand / Company:</b> ${escapeHtml(data.brand || "N/A")}
📧 <b>Email:</b> ${escapeHtml(data.email)}
📱 <b>Phone:</b> <code>${escapeHtml(data.phone)}</code>
🌐 <b>Website:</b> ${escapeHtml(data.website || "N/A")}

🛠 <b>Services Requested:</b>
👉 <i>${escapeHtml(servicesText)}</i>

📁 <b>Project Category:</b> ${escapeHtml(data.projectType || "N/A")}
💰 <b>Budget:</b> ${escapeHtml(data.budget || "Not specified")}
⏱ <b>Timeline:</b> ${escapeHtml(data.timeline || "Not specified")}
📢 <b>Source:</b> ${escapeHtml(data.source || "N/A")}

📎 <b>Attached References:</b> ${escapeHtml(filesText)}
🔗 <b>Links / Inspiration:</b> ${escapeHtml(data.refs || "N/A")}

📝 <b>Project Brief:</b>
${escapeHtml(data.brief)}

━━━━━━━━━━━━━━━━━━━━
⏰ <i>Received at: ${now} IST</i>
`.trim();

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      }
    );

    const result = await response.json();
    if (!result.ok) {
      console.error("Telegram API error response:", result);
      return {
        success: false,
        error: result.description || "Telegram API rejected message",
      };
    }

    return { success: true };
  } catch (err: unknown) {
    console.error("Failed to send contact to Telegram:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

export interface VisitorArrivalData {
  visitorId: string;
  ip?: string;
  location?: string;
  isp?: string;
  device?: string;
  browser?: string;
  os?: string;
  screen?: string;
  page?: string;
  referrer?: string;
  utm?: string;
}

/**
 * Sends a visitor arrival notification to Telegram
 */
export async function sendVisitorArrivalToTelegram(
  data: VisitorArrivalData
): Promise<{ success: boolean; error?: string }> {
  try {
    const chatId = await resolveTelegramChatId();
    if (!chatId) return { success: false, error: "No chat ID" };

    const now = new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    }).format(new Date());

    const message = `
🟢 <b>NEW VISITOR ON ASTRIA & CO.</b>
━━━━━━━━━━━━━━━━━━━━
📍 <b>Location:</b> ${escapeHtml(data.location || "Unknown")}
🌐 <b>IP & ISP:</b> <code>${escapeHtml(data.ip || "N/A")}</code> (${escapeHtml(data.isp || "N/A")})
📱 <b>Device:</b> ${escapeHtml(data.device || "Desktop")} • ${escapeHtml(data.browser || "Browser")} (${escapeHtml(data.os || "OS")})
🖥 <b>Screen:</b> ${escapeHtml(data.screen || "N/A")}
📄 <b>Landing Page:</b> <code>${escapeHtml(data.page || "/")}</code>
🔗 <b>Referrer:</b> ${escapeHtml(data.referrer || "Direct / Bookmark")}
${data.utm ? `🎯 <b>Campaign/UTM:</b> ${escapeHtml(data.utm)}\n` : ""}🆔 <b>Session ID:</b> <code>#${escapeHtml(data.visitorId)}</code>
━━━━━━━━━━━━━━━━━━━━
⏰ <i>${now} IST</i>
`.trim();

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      }
    );

    const result = await response.json();
    return { success: !!result.ok };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

export interface VisitorMilestoneData {
  visitorId: string;
  action: string;
  details?: string;
  timeSpent?: string;
  page?: string;
  location?: string;
}

/**
 * Sends high-intent visitor action or milestone update to Telegram
 */
export async function sendVisitorMilestoneToTelegram(
  data: VisitorMilestoneData
): Promise<{ success: boolean; error?: string }> {
  try {
    const chatId = await resolveTelegramChatId();
    if (!chatId) return { success: false, error: "No chat ID" };

    const now = new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    }).format(new Date());

    const message = `
⚡ <b>VISITOR ACTIVITY: ${escapeHtml(data.action.toUpperCase())}</b>
━━━━━━━━━━━━━━━━━━━━
🆔 <b>Visitor:</b> <code>#${escapeHtml(data.visitorId)}</code>
${data.location ? `📍 <b>From:</b> ${escapeHtml(data.location)}\n` : ""}🎯 <b>Action:</b> ${escapeHtml(data.action)}
${data.details ? `📝 <b>Details:</b> ${escapeHtml(data.details)}\n` : ""}📄 <b>Page:</b> <code>${escapeHtml(data.page || "/")}</code>
⏱ <b>Time on Site:</b> ${escapeHtml(data.timeSpent || "Just now")}
━━━━━━━━━━━━━━━━━━━━
⏰ <i>${now} IST</i>
`.trim();

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      }
    );

    const result = await response.json();
    return { success: !!result.ok };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

