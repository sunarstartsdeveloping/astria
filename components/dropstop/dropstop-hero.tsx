"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight, ShieldCheck, Truck, Sparkles, Flame } from "lucide-react";
import { useDropstop } from "./dropstop-context";
import { DROPSTOP_PRODUCTS } from "@/data/dropstop-products";

export function DropstopHero() {
  const { setSelectedProduct } = useDropstop();
  const featuredProduct = DROPSTOP_PRODUCTS[0]; // Architectural Heavyweight Hoodie

  const scrollToProducts = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("products");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-[1140px] mx-auto px-4 sm:px-6 pt-5 pb-6">
      {/* Premium Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-[#0D120E] border border-white/10 text-white shadow-2xl">
        {/* Ambient Gradient Glows */}
        <div
          aria-hidden="true"
          className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-[#567D4A]/25 blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -right-20 w-80 h-80 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none"
        />

        {/* Subtle grid pattern background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-60"
        />

        <div className="relative z-10 p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Drop Tag Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/90 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-[#567D4A] animate-pulse" />
                <span className="font-semibold text-white tracking-wide uppercase text-[11px]">
                  Drop 01
                </span>
                <span className="text-white/40">•</span>
                <span className="text-emerald-400 font-medium">Limited Studio Batch</span>
              </div>

              {/* Headline */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.12]">
                  Tactile essentials for{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-100 to-white">
                    digital architects.
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-neutral-300 max-w-xl leading-relaxed pt-1">
                  Heavyweight combed cotton apparel, precision desk gear, and daily carry engineered
                  by Astria &amp; Co. Designed for creators, founders, and engineers.
                </p>
              </div>

              {/* Trust Badges Row */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-neutral-300/90 pt-1">
                <div className="flex items-center gap-1.5">
                  <Truck size={14} className="text-[#567D4A]" />
                  <span>Free shipping &gt; ₹999</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#567D4A]" />
                  <span>Cash on Delivery (COD)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles size={14} className="text-[#567D4A]" />
                  <span>7-day exchange guarantee</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#products"
                  onClick={scrollToProducts}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#567D4A] hover:bg-[#48693E] text-white text-sm font-semibold transition-all shadow-lg shadow-[#567D4A]/25 hover:translate-y-[-1px] cursor-pointer"
                >
                  <span>Explore Drop 01</span>
                  <ArrowDown size={15} />
                </a>

                {featuredProduct && (
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(featuredProduct)}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white/90 hover:text-white text-sm font-medium transition-all cursor-pointer backdrop-blur-sm"
                  >
                    <span>View Flagship Hoodie</span>
                    <ArrowRight size={14} className="text-white/60" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Featured Product Spotlight Card */}
            {featuredProduct && (
              <div className="lg:col-span-5">
                <div
                  onClick={() => setSelectedProduct(featuredProduct)}
                  className="group relative rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 p-4 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-md"
                >
                  {/* Spotlight Top Bar */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                      <Flame size={12} />
                      Top Pick
                    </span>
                    <span className="text-[11px] text-white/50 group-hover:text-white/80 transition-colors">
                      Quick View &rarr;
                    </span>
                  </div>

                  {/* Product Thumbnail */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-900 mb-3.5 border border-white/5">
                    <Image
                      src={featuredProduct.image}
                      alt={featuredProduct.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 420px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-white">
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/10">
                        450 GSM Fleece
                      </span>
                      <span className="text-[11px] text-emerald-300 font-medium bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                        ★ {featuredProduct.rating} ({featuredProduct.reviewsCount})
                      </span>
                    </div>
                  </div>

                  {/* Title & Price Details */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                        {featuredProduct.name}
                      </h2>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        Relaxed drop-shoulder construction
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-bold text-white">
                        ₹{featuredProduct.price.toLocaleString("en-IN")}
                      </div>
                      {featuredProduct.originalPrice && (
                        <div className="text-[11px] text-white/40 line-through">
                          ₹{featuredProduct.originalPrice.toLocaleString("en-IN")}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
