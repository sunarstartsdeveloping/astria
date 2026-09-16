"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Footer } from "@/components/footer";

interface LegalPageLayoutProps {
  title: string;
  badge: string;
  lastUpdated?: string;
  children: ReactNode;
}

const LEGAL_LINKS = [
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/refund-policy", label: "Refund & Cancellation" },
  { href: "/shipping-policy", label: "Digital Delivery" },
  { href: "/copyright", label: "Copyright & IP" },
  { href: "/security", label: "Security Policy" },
  { href: "/contact", label: "Contact Us" },
];

export function LegalPageLayout({
  title,
  badge,
  lastUpdated = "September 15, 2026",
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#080B08] text-white selection:bg-emerald-600 selection:text-white">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 h-[68px] border-b border-white/10 bg-[#0A0D0A]/90 backdrop-blur-2xl px-6 flex items-center justify-between">
        <div className="max-w-[1140px] mx-auto w-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-lg font-bold tracking-wide text-white group">
            <span className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center text-white text-xs font-extrabold shadow-sm group-hover:scale-105 transition-transform">
              A
            </span>
            Astria &amp; Co.
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-white/70 hover:text-white px-3.5 py-1.5 rounded-lg border border-white/10 hover:border-white/20 transition-all"
            >
              <ArrowLeft size={15} />
              <span>Back to Home</span>
            </Link>
            <button
              type="button"
              data-open-consultation="true"
              className="hidden sm:inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-lg bg-brand text-white hover:bg-brand-dark transition-all cursor-pointer"
            >
              Book a Call
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1140px] mx-auto px-6 py-12 sm:py-16 w-full">
        {/* Page Header */}
        <div className="mb-12 border-b border-white/10 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <ShieldCheck size={13} />
              {badge}
            </span>
            <span className="text-xs font-mono text-white/40">
              ● Last Updated: {lastUpdated}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-white/60 max-w-2xl leading-relaxed">
            Official legal documentation and service terms for clients and visitors of Astria &amp; Co.
          </p>
        </div>

        {/* Layout Grid: Content + Sidebar Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Legal Content (8 cols) */}
          <div className="lg:col-span-8 space-y-8 text-white/80 leading-relaxed text-sm sm:text-base font-normal">
            {children}

            {/* Payment Gateway Compliance Callout */}
            <div className="mt-12 p-5 sm:p-6 rounded-2xl bg-[#0E130F] border border-white/10 relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-white mb-1.5">
                    Payment Gateway Security &amp; Compliance Guarantee
                  </h4>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                    Astria &amp; Co. utilizes industry-standard, PCI-DSS Level 1 certified payment processors (including Stripe, Razorpay, and authorized banking partners). All online credit card, debit card, net banking, and UPI transactions are encrypted end-to-end via 256-bit SSL encryption. We never store or access your sensitive card numbers or CVVs on our servers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Navigation & Contact Card (4 cols) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Quick Policies Navigation */}
            <div className="p-6 rounded-2xl bg-[#0E130F] border border-white/10">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">
                Compliance &amp; Legal
              </h3>
              <nav className="space-y-1">
                {LEGAL_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all group"
                  >
                    <span>{link.label}</span>
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-60 transition-opacity" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact Merchant Details Card */}
            <div className="p-6 rounded-2xl bg-[#0E130F] border border-white/10 space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Official Support
              </h3>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-2.5">
                  <Mail size={15} className="text-brand shrink-0 mt-0.5" />
                  <a href="mailto:astriacreative.co@gmail.com" className="text-white/80 hover:text-white break-all">
                    astriacreative.co@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={15} className="text-brand shrink-0" />
                  <a href="tel:+918278455700" className="text-white/80 hover:text-white">
                    +91 82784 55700
                  </a>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin size={15} className="text-brand shrink-0 mt-0.5" />
                  <span className="text-white/70">
                    Narnaul, Haryana, India (Works remotely worldwide)
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
