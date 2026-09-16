"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { AstriaLogoMark } from "@/components/ui/astria-logo";

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

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 h-[68px] z-50 border-b border-white/10 backdrop-blur-2xl transition-all duration-300 ${
          scrolled
            ? "translate-y-0 opacity-100 shadow-[0_8px_30px_rgba(0,0,0,0.5)] pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        } bg-[#0A0D0A]/90 text-white`}
      >
        <div className="max-w-[1140px] mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 text-lg font-bold tracking-wide text-white group">
            <span className="w-8 h-8 bg-[#2D4532] border border-emerald-500/20 rounded-lg flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <AstriaLogoMark className="w-4.5 h-4.5 text-white" />
            </span>
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
              className="md:hidden w-9 h-9 flex items-center justify-center text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[68px] z-40 bg-[#0A0D0A] p-8 flex flex-col gap-4 md:hidden text-white border-b border-white/10">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="text-xl font-semibold py-4 border-b border-white/10 text-white/80 hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            data-open-consultation="true"
            onClick={() => setMobileOpen(false)}
            className="mt-4 text-center text-sm font-semibold px-5 py-3 rounded-[10px] bg-brand text-white cursor-pointer"
          >
            Book a Call
          </button>
        </div>
      )}
    </>
  );
}
