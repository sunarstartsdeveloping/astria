"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { AstriaLogoMark } from "@/components/ui/astria-logo";
import { useDropstop } from "./dropstop-context";

export function DropstopHeader() {
  const { cartCount, setIsCartOpen } = useDropstop();

  return (
    <>
      {/* Plain Thin Top Shipping Strip */}
      <div className="bg-[#F4F4F5] border-b border-neutral-200 py-2 px-4 text-center text-xs text-neutral-600">
        <span>Free standard delivery on orders over ₹999</span>
        <span className="mx-2 text-neutral-300">•</span>
        <span>Cash on Delivery (COD) available pan-India</span>
      </div>

      {/* Main Standard Nav (~70px height) */}
      <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 h-[68px] flex items-center justify-between gap-6">
          {/* Left: Store Logo */}
          <Link
            href="/dropstop"
            className="flex items-baseline gap-2 group select-none"
            aria-label="Dropstop by Astria & Co. home"
          >
            <span className="text-xl font-medium tracking-tight text-neutral-900">
              Dropstop
            </span>
            <span className="text-xs text-neutral-500 font-normal">
              by Astria &amp; Co.
            </span>
          </Link>

          {/* Center: Standard Clean Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-600">
            <Link
              href="/dropstop#products"
              className="text-neutral-900 font-medium hover:text-[#567D4A] transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/#about"
              className="hover:text-neutral-900 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-neutral-900 transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/"
              className="hover:text-neutral-900 transition-colors text-xs text-neutral-400"
            >
              ← Astria &amp; Co. Main Site
            </Link>
          </nav>

          {/* Right: Cart Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-neutral-100 text-neutral-800 transition-colors cursor-pointer text-sm"
              aria-label={`Shopping Cart (${cartCount} items)`}
            >
              <ShoppingBag size={19} className="text-neutral-800 stroke-[1.75]" />
              <span className="hidden sm:inline text-sm font-normal">Cart</span>
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-medium rounded-full bg-[#567D4A] text-white">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
