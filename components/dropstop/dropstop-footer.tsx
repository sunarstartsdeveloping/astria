import React from "react";
import Link from "next/link";

export function DropstopFooter() {
  return (
    <footer className="bg-white border-t border-neutral-200 text-neutral-600 text-xs mt-auto">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-neutral-900">Dropstop</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Official merchandise and physical goods store by Astria &amp; Co.
            </p>
            <p className="text-xs text-neutral-400">
              Narnaul, Haryana (Remote worldwide)
            </p>
          </div>

          {/* Catalog */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-neutral-900 uppercase tracking-wider">
              Categories
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-500">
              <li>
                <a href="#products" className="hover:text-neutral-900 transition-colors">
                  Apparel &amp; Fleece
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-neutral-900 transition-colors">
                  Desk Mats &amp; Keycaps
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-neutral-900 transition-colors">
                  Everyday Carry
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-neutral-900 transition-colors">
                  Lifestyle &amp; Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-neutral-900 uppercase tracking-wider">
              Customer Care
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-500">
              <li>
                <Link href="/shipping-policy" className="hover:text-neutral-900 transition-colors">
                  Shipping Policy (2–4 Days)
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-neutral-900 transition-colors">
                  7-Day Returns &amp; Refund
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-neutral-900 transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-neutral-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-neutral-900 uppercase tracking-wider">
              Contact &amp; Support
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-500">
              <li>
                <a
                  href="mailto:astriacreative.co@gmail.com"
                  className="hover:text-neutral-900 transition-colors"
                >
                  astriacreative.co@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+918278455700"
                  className="hover:text-neutral-900 transition-colors"
                >
                  +91 82784 55700
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/918278455700"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#567D4A] hover:underline"
                >
                  WhatsApp Support
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/astriacreative.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-900 transition-colors"
                >
                  Instagram @astriacreative.co
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom line */}
        <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
          <p>
            <Link
              href="/dropstop/admin"
              className="hover:text-neutral-700 transition-colors"
              title="Admin Console"
            >
              &copy;
            </Link>{" "}
            {new Date().getFullYear()} Dropstop by Astria &amp; Co. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-neutral-700 transition-colors">
              Astria &amp; Co. Main Agency
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
