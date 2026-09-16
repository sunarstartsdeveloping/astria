"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll on mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 h-[68px] z-50 border-b border-white/10 backdrop-blur-2xl transition-all duration-300 ${
          scrolled || mobileOpen
            ? "translate-y-0 opacity-100 shadow-[0_8px_30px_rgba(0,0,0,0.5)] pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        } bg-[#0A0D0A]/90 text-white`}
      >
        <div className="max-w-[1140px] mx-auto px-6 h-full flex items-center justify-between">
          {/* Brand Title */}
          <a href="#" className="text-lg font-bold tracking-tight text-white hover:text-emerald-400 transition-colors">
            Astria &amp; Co.
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-open-consultation="true"
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-[10px] bg-brand text-white hover:bg-brand-dark transition-all hover:-translate-y-0.5 shadow-md shadow-brand/20 cursor-pointer"
            >
              Book a Call
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 rounded-xl hover:bg-white/10 active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[68px] z-40 bg-[#0A0D0A]/98 backdrop-blur-2xl p-6 sm:p-8 flex flex-col justify-between md:hidden text-white border-b border-white/10 animate-in fade-in slide-in-from-top-2 duration-200 overflow-y-auto">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-lg font-semibold py-3.5 px-4 rounded-xl border-b border-white/5 text-white/80 hover:text-white hover:bg-white/5 active:bg-white/10 transition-all"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="pt-6 border-t border-white/10 space-y-3">
            <button
              type="button"
              data-open-consultation="true"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center text-sm font-semibold py-3.5 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-lg shadow-emerald-950 transition-all active:scale-[0.98] cursor-pointer"
            >
              Book a Strategy Call
            </button>
            <p className="text-center text-xs text-white/40">astriacreative.co@gmail.com</p>
          </div>
        </div>
      )}
    </>
  );
}
