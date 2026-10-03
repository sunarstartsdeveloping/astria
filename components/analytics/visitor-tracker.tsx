"use client";

import { useEffect, useState } from "react";
import {
  initVisitorTracking,
  getRecordedSessions,
  VisitorSessionRecord,
} from "@/lib/tracker";
import {
  Activity,
  MousePointer,
  MapPin,
  Smartphone,
  Eye,
  X,
  Play,
  Trash2,
  ExternalLink,
} from "lucide-react";

export function VisitorTracker() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [sessions, setSessions] = useState<VisitorSessionRecord[]>([]);
  const [selectedSession, setSelectedSession] = useState<VisitorSessionRecord | null>(null);
  const [isReplaying, setIsReplaying] = useState(false);
  const [replayCursor, setReplayCursor] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // 1. Initialize background visitor & movement tracking
    initVisitorTracking();

    // 2. Keyboard shortcut for site owner: Alt + Shift + T
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.shiftKey && (e.key === "T" || e.key === "t")) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };

    // 3. URL trigger check: ?tracker=admin
    if (typeof window !== "undefined" && window.location.search.includes("tracker=admin")) {
      setIsAdminOpen(true);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isAdminOpen) {
      const records = getRecordedSessions();
      setSessions(records);
      if (records.length > 0 && !selectedSession) {
        setSelectedSession(records[0]);
      }
    }
  }, [isAdminOpen, selectedSession]);

  // Replay mouse movement
  const startMovementReplay = (session: VisitorSessionRecord) => {
    if (!session.movements || session.movements.length === 0) {
      alert("No mouse movements recorded for this session (user may be on mobile or stayed still).");
      return;
    }

    setIsReplaying(true);
    let index = 0;
    const interval = setInterval(() => {
      if (index >= session.movements.length) {
        clearInterval(interval);
        setIsReplaying(false);
        setReplayCursor(null);
        return;
      }
      const pt = session.movements[index];
      setReplayCursor({ x: pt.x, y: pt.y });
      index++;
    }, 60);
  };

  const clearSessions = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("astria_recorded_sessions_v1");
      setSessions([]);
      setSelectedSession(null);
    }
  };

  return (
    <>
      {/* Visual Replay Pointer Overlay */}
      {isReplaying && replayCursor && (
        <div
          className="fixed z-[999999] pointer-events-none transition-all duration-75 flex items-center gap-1"
          style={{
            left: `${replayCursor.x}px`,
            top: `${replayCursor.y}px`,
            transform: "translate(-6px, -6px)",
          }}
        >
          <div className="w-5 h-5 rounded-full bg-emerald-500/80 border-2 border-white shadow-lg animate-ping absolute" />
          <div className="w-4 h-4 rounded-full bg-emerald-400 border border-white shadow-md relative" />
          <span className="text-[10px] bg-black/90 text-emerald-400 font-mono px-1.5 py-0.5 rounded ml-2 whitespace-nowrap shadow-sm border border-emerald-500/30">
            Visitor Cursor
          </span>
        </div>
      )}

      {/* Admin Analytics & Replay Modal (Triggered via Alt+Shift+T or ?tracker=admin) */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0e110e] border border-emerald-500/30 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base flex items-center gap-2">
                    Astria Live Movement & Visitor Tracker
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono uppercase">
                      Real-Time Active
                    </span>
                  </h3>
                  <p className="text-xs text-white/50">
                    Shortcut: <code className="text-emerald-400">Alt + Shift + T</code> • Alerts sent directly to Telegram
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearSessions}
                  title="Clear Stored Sessions"
                  className="p-2 text-white/40 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsAdminOpen(false)}
                  className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {/* Left Column: Sessions List */}
              <div className="overflow-y-auto p-4 space-y-2 max-h-[350px] md:max-h-[600px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    Recent Sessions ({sessions.length})
                  </span>
                </div>
                {sessions.length === 0 ? (
                  <div className="text-center py-8 text-white/40 text-xs">
                    No sessions recorded yet on this browser. Browse around the site to generate trails!
                  </div>
                ) : (
                  sessions.map((sess) => {
                    const isSelected = selectedSession?.id === sess.id;
                    const dateStr = new Date(sess.startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                    return (
                      <button
                        key={sess.id}
                        onClick={() => setSelectedSession(sess)}
                        className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex flex-col gap-1.5 ${
                          isSelected
                            ? "bg-emerald-500/10 border-emerald-500/40 text-white shadow-sm"
                            : "bg-white/[0.02] border-white/5 text-white/70 hover:bg-white/[0.05] hover:text-white"
                        }`}
                      >
                        <div className="flex items-center justify-between font-mono text-[11px]">
                          <span className="text-emerald-400 font-bold">#{sess.id.split("-")[0]}</span>
                          <span className="text-white/40">{dateStr}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-white/60 truncate">
                          <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate">{sess.location || "Detecting location..."}</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-white/40 pt-1 border-t border-white/5">
                          <span>{sess.device} • {sess.browser}</span>
                          <span>{sess.clicks.length} clicks • {sess.movements.length} pts</span>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Right Column: Selected Session Detail & Replay */}
              <div className="md:col-span-2 overflow-y-auto p-6 space-y-6 max-h-[450px] md:max-h-[600px]">
                {selectedSession ? (
                  <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3 bg-white/[0.03] border border-white/5 rounded-xl">
                        <span className="text-[10px] text-white/40 uppercase block">Max Scroll</span>
                        <span className="text-lg font-bold text-white font-mono">
                          {selectedSession.maxScroll}%
                        </span>
                      </div>
                      <div className="p-3 bg-white/[0.03] border border-white/5 rounded-xl">
                        <span className="text-[10px] text-white/40 uppercase block">Total Clicks</span>
                        <span className="text-lg font-bold text-white font-mono">
                          {selectedSession.clicks.length}
                        </span>
                      </div>
                      <div className="p-3 bg-white/[0.03] border border-white/5 rounded-xl">
                        <span className="text-[10px] text-white/40 uppercase block">Movements</span>
                        <span className="text-lg font-bold text-emerald-400 font-mono">
                          {selectedSession.movements.length} pts
                        </span>
                      </div>
                      <div className="p-3 bg-white/[0.03] border border-white/5 rounded-xl">
                        <span className="text-[10px] text-white/40 uppercase block">Landing Page</span>
                        <span className="text-xs font-medium text-white truncate block font-mono mt-1">
                          {selectedSession.page}
                        </span>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-wrap items-center gap-3 p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-xl">
                      <button
                        onClick={() => {
                          setIsAdminOpen(false);
                          startMovementReplay(selectedSession);
                        }}
                        disabled={selectedSession.movements.length === 0}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs rounded-lg transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        Watch Cursor Movement Replay
                      </button>
                      <span className="text-xs text-white/50">
                        Plays back the visitor's exact mouse path directly on the page!
                      </span>
                    </div>

                    {/* Visitor Metadata */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50">
                        Visitor Device & Network
                      </h4>
                      <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 text-xs space-y-2">
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-white/40">Location:</span>
                          <span className="text-white font-medium">{selectedSession.location || "N/A"}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-white/40">IP / ISP:</span>
                          <span className="text-white font-mono">{selectedSession.ip || "N/A"} ({selectedSession.isp || "N/A"})</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-white/40">Device & OS:</span>
                          <span className="text-white">{selectedSession.device} • {selectedSession.browser}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-white/40">Referrer:</span>
                          <span className="text-emerald-400">{selectedSession.referrer || "Direct"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Click Map / Interactions */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50">
                        Recorded Clicks & Interactions ({selectedSession.clicks.length})
                      </h4>
                      {selectedSession.clicks.length === 0 ? (
                        <p className="text-xs text-white/40">No clicks recorded for this session yet.</p>
                      ) : (
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                          {selectedSession.clicks.map((clk, idx) => (
                            <div
                              key={idx}
                              className="p-2.5 bg-white/[0.02] border border-white/5 rounded-lg flex items-center justify-between text-xs font-mono"
                            >
                              <div className="flex items-center gap-2 truncate">
                                <span className="w-5 h-5 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                                  {clk.tag}
                                </span>
                                <span className="text-white truncate max-w-[200px]">
                                  {clk.text || "Element"}
                                </span>
                              </div>
                              <div className="text-[10px] text-white/40 shrink-0">
                                ({clk.x}px, {clk.y}px) at +{Math.round(clk.t / 1000)}s
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-16 text-white/40 text-xs">
                    Select a session from the left to view details and movement replay.
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-white/10 bg-black/40 flex items-center justify-between text-xs text-white/50">
              <span>Astria & Co. Proprietary Movement Telemetry</span>
              <button
                onClick={() => setIsAdminOpen(false)}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
              >
                Close Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
