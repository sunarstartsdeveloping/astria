import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { AstriaLogoMark } from "@/components/ui/astria-logo";

export function Footer() {
  return (
    <footer className="bg-[#101210] text-[#868886] pt-20 pb-10 border-t border-white/5">
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 max-w-sm">
            <Link href="/" className="flex items-center gap-3 text-lg font-bold tracking-wide text-white mb-4 group">
              <span className="w-8 h-8 bg-[#2D4532] border border-emerald-500/20 rounded-lg flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                <AstriaLogoMark className="w-4.5 h-4.5 text-white" />
              </span>
              Astria &amp; Co.
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-[#929592]">
              Diverting world digitally — crafting high-performance digital experiences that drive real business growth.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/astriacreative.co"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-[#1C1E1C] text-[#929592] hover:bg-brand hover:text-white transition-all text-xs font-medium group"
                aria-label="Instagram @astriacreative.co"
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400 group-hover:text-white transition-colors">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span>@astriacreative.co</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-5">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/#about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#work" className="hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-white transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-5">
              Services
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Graphic Design
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Sales Funnels
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Meta Ads
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Video Editing
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Automation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-5">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-brand flex-shrink-0" />
                <a href="mailto:astriacreative.co@gmail.com" className="hover:text-white transition-colors break-all">
                  astriacreative.co@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-brand flex-shrink-0" />
                <a href="tel:+918278455700" className="hover:text-white transition-colors">
                  +91 82784 55700
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-brand flex-shrink-0 mt-0.5" />
                <span className="leading-snug">Narnaul, Haryana (Works remotely worldwide)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom divider and copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#868886]">
          <p>&copy; {new Date().getFullYear()} Astria &amp; Co. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/refund-policy" className="hover:text-white transition-colors">
              Refund &amp; Cancellation
            </Link>
            <Link href="/shipping-policy" className="hover:text-white transition-colors">
              Delivery Policy
            </Link>
            <Link href="/copyright" className="hover:text-white transition-colors">
              Copyright &amp; IP
            </Link>
            <Link href="/security" className="hover:text-white transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
