"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Send, MessageCircle } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";

const WHATSAPP_PHONE = "918278455700";
const DEFAULT_MESSAGE = "Hi Astria & Co., I'm reaching out from your website and would like to inquire about your services.";

const QUICK_PROMPTS = [
  "I want to build a new website / web app 🚀",
  "Looking for Meta ads & marketing automation 📈",
  "Need video editing & brand creative 🎬",
];

export function WhatsAppFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [customMsg, setCustomMsg] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  // Close on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleOpenChat = (messageText: string) => {
    const text = encodeURIComponent(messageText.trim() || DEFAULT_MESSAGE);
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    setHasInteracted(true);
  };

  return (
    <aside aria-label="WhatsApp Support Chat" className="fixed bottom-5 right-5 z-40 flex flex-col items-end print:hidden">
      {/* Quick Chat Bubble Card */}
      {isOpen && (
        <div
          ref={cardRef}
          role="dialog"
          aria-modal="true"
          aria-label="WhatsApp Chat Window"
          className="mb-3 w-[calc(100vw-40px)] sm:w-[360px] bg-[#0E130F] border border-emerald-500/30 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden text-white animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-[#128C7E] p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <WhatsAppIcon className="w-6 h-6 text-white" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-300 border-2 border-[#128C7E]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-sm">Astria &amp; Co.</span>
                  <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-medium">Verified</span>
                </div>
                <p className="text-[11px] text-white/80">Online • Replies in minutes</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-black/10 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label="Close WhatsApp chat card"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 space-y-3 bg-[#0A0D0A]/90">
            {/* Incoming Message Bubble */}
            <div className="bg-[#172019] border border-white/5 p-3 rounded-2xl rounded-tl-sm text-xs sm:text-sm text-white/90 leading-relaxed shadow-sm">
              <p className="font-medium text-emerald-400 mb-1">Astria Team</p>
              <p>
                Hi there! 👋 Welcome to Astria &amp; Co. Ready to divert your world digitally? Choose an option below or send us a message directly!
              </p>
              <span className="block text-[10px] text-white/40 text-right mt-1.5">
                Official Business Support
              </span>
            </div>

            {/* Quick Inquiry Prompts */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[11px] uppercase tracking-wider text-white/40 font-semibold px-1">
                Suggested questions:
              </p>
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOpenChat(prompt)}
                  className="w-full text-left p-2.5 rounded-xl bg-white/[0.04] hover:bg-emerald-500/10 hover:border-emerald-500/40 border border-white/10 text-xs text-white/80 hover:text-white transition-all cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Custom Input & Direct Send */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleOpenChat(customMsg);
              }}
              className="pt-2 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Type your message..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="flex-1 bg-white/[0.06] border border-white/15 focus:border-emerald-400 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 outline-none transition-all"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-emerald-950 cursor-pointer"
                title="Send on WhatsApp"
              >
                <span>Send</span>
                <Send size={13} />
              </button>
            </form>

            <div className="pt-1 text-center">
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-emerald-400/90 hover:text-emerald-300 underline underline-offset-2 transition-colors"
              >
                Or open WhatsApp app directly (+91 82784 55700) &rarr;
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <div className="relative group">
        {/* Tooltip on Desktop when closed and not yet interacted */}
        {!isOpen && !hasInteracted && (
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 bg-[#121813] text-white text-xs px-3.5 py-2 rounded-xl border border-emerald-500/30 shadow-xl whitespace-nowrap pointer-events-none animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Chat on WhatsApp</span>
          </div>
        )}

        <button
          onClick={handleToggle}
          aria-label={isOpen ? "Close WhatsApp chat" : "Open WhatsApp chat (+91 82784 55700)"}
          className={`relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg shadow-black/50 transition-all duration-300 cursor-pointer ${
            isOpen
              ? "bg-[#1E2520] text-white rotate-90 border border-white/20"
              : "bg-[#25D366] hover:bg-[#20ba5a] text-white hover:scale-110 active:scale-95 shadow-emerald-950/50"
          }`}
        >
          {/* Subtle radar ping effect when closed */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" />
          )}

          {isOpen ? (
            <X size={24} />
          ) : (
            <WhatsAppIcon className="w-7 h-7 text-white" />
          )}
        </button>
      </div>
    </aside>
  );
}
