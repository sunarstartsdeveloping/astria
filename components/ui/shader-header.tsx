"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Sparkles } from "lucide-react";

// Dynamically import MeshGradient from @paper-design/shaders-react to ensure safe client-only execution
const MeshGradient = dynamic(
  () =>
    import("@paper-design/shaders-react").then((mod) => mod.MeshGradient),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#0c120c]" />,
  }
);

interface ShaderHeaderProps {
  badgeText?: string;
  word1?: string;
  word2?: string;
  word3?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export function ShaderHeader({
  badgeText = "Diverting World Digitally",
  word1 = "Transformative",
  word2 = "Digital",
  word3 = "Experiences",
  description = "Create high-impact digital experiences with custom web applications, conversion-engineered sales funnels, high-ROAS Meta ads, and marketing automation that turn traffic into measurable growth.",
  primaryCtaText = "Get Started",
  primaryCtaLink = "#contact",
  secondaryCtaText = "Explore Services",
  secondaryCtaLink = "#services",
}: ShaderHeaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Astria & Co. Palette:
  // #0D130E: Deep Obsidian Forest
  // #567D4A: Primary Brand Green
  // #6E9A60: Luminous Leaf Green
  // #C9A84C: Accent Gold / Honey Amber
  // #34D399: Soft Mint Emerald
  // #B0912F: Deep Antique Gold
  const astriaColors = [
    "#0D130E",
    "#567D4A",
    "#C9A84C",
    "#1E2E1B",
    "#6E9A60",
    "#A3C995",
    "#D4AF37",
  ];

  return (
    <div className="relative w-full max-w-[1340px] mx-auto px-4 sm:px-6 pt-6 pb-8 lg:pt-8 lg:pb-12">
      {/* Outer Card Container */}
      <div className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] rounded-[28px] sm:rounded-[36px] lg:rounded-[42px] overflow-hidden border border-white/15 bg-[#0C120C] shadow-[0_24px_80px_rgba(0,0,0,0.6),0_0_100px_rgba(86,125,74,0.18)] flex flex-col justify-between p-6 sm:p-10 lg:p-12">
        
        {/* WebGL Mesh Gradient Shader Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {mounted && (
            <MeshGradient
              colors={astriaColors}
              speed={0.45}
              distortion={0.8}
              swirl={0.35}
              grainMixer={0.05}
              grainOverlay={0.02}
              fit="cover"
              scale={1.2}
              className="w-full h-full opacity-90 transition-opacity duration-1000"
              style={{ width: "100%", height: "100%" }}
            />
          )}

          {/* Rich organic CSS ambient diffuse glow overlay in Astria palette */}
          <div className="absolute -top-16 -left-16 w-[550px] h-[550px] bg-emerald-500/35 rounded-full blur-[110px] pointer-events-none mix-blend-screen" />
          <div className="absolute top-1/4 -right-16 w-[550px] h-[550px] bg-[#C9A84C]/35 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
          <div className="absolute -bottom-16 left-1/3 w-[480px] h-[480px] bg-[#567D4A]/40 rounded-full blur-[110px] pointer-events-none" />

          {/* Vignette & contrast sheen */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C120C]/70 via-transparent to-[#0C120C]/25 pointer-events-none" />
        </div>

        {/* Top Header Navigation Inside Card */}
        <header className="relative z-10 w-full flex items-center justify-between gap-4">
          {/* Left: Brand Monogram & Pill Badge */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold text-base shadow-sm transition-all duration-200 hover:scale-105"
              aria-label="Astria & Co."
            >
              A
            </a>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/15 bg-white/10 backdrop-blur-md text-white/90 text-[11px] sm:text-xs font-medium tracking-wide shadow-sm">
              <Sparkles size={13} className="text-amber-300 animate-pulse" />
              <span>{badgeText}</span>
            </div>
          </div>

          {/* Center: In-Header Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-white/80">
            <a
              href="#services"
              className="hover:text-white transition-colors duration-200 tracking-wide"
            >
              Services
            </a>
            <a
              href="#work"
              className="hover:text-white transition-colors duration-200 tracking-wide"
            >
              Work
            </a>
            <a
              href="#about"
              className="hover:text-white transition-colors duration-200 tracking-wide"
            >
              About
            </a>
            <a
              href="#process"
              className="hover:text-white transition-colors duration-200 tracking-wide"
            >
              Process
            </a>
          </nav>

          {/* Right: Quick Action Pill Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-open-consultation="true"
              className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-white hover:bg-white/90 text-zinc-950 font-semibold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              Book a Call
            </button>
          </div>
        </header>

        {/* Center-Left Content Area */}
        <div className="relative z-10 max-w-3xl my-auto py-6 sm:py-8">
          {/* Signature 3-Tier Typography */}
          <h1 className="flex flex-col tracking-tight text-white mb-5 select-none">
            {/* Tier 1: Soft Luminous Tint */}
            <span className="text-4xl sm:text-6xl lg:text-[72px] font-normal tracking-[-0.015em] text-[#A7F3D0] drop-shadow-[0_0_35px_rgba(74,222,128,0.4)] leading-[1.05]">
              {word1}
            </span>

            {/* Tier 2: Solid Giant Bold Sans */}
            <span className="text-5xl sm:text-7xl lg:text-[92px] font-extrabold tracking-[-0.035em] text-white leading-[0.98] drop-shadow-md">
              {word2}
            </span>

            {/* Tier 3: Flowing Elegant Italic Serif */}
            <span className="text-5xl sm:text-7xl lg:text-[88px] font-serif italic font-normal tracking-[-0.02em] text-white/95 leading-[1.05] drop-shadow-sm">
              {word3}
            </span>
          </h1>

          {/* Subtitle / Paragraph */}
          <p className="text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed max-w-xl font-normal mb-7 sm:mb-9 drop-shadow-sm">
            {description}
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Frosted Glass Secondary Button */}
            <a
              href={secondaryCtaLink}
              className="inline-flex items-center justify-center px-6 py-3 sm:px-7 sm:py-3.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/15 backdrop-blur-md text-white font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-sm hover:border-white/35"
            >
              {secondaryCtaText}
            </a>

            {/* Vibrant Astria Brand Gradient Primary Button */}
            <button
              type="button"
              data-open-consultation="true"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 rounded-full bg-gradient-to-r from-emerald-500 via-[#567D4A] to-[#C9A84C] hover:from-emerald-400 hover:to-[#D4AF37] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-[0_10px_35px_rgba(86,125,74,0.4)] hover:shadow-[0_15px_45px_rgba(201,168,76,0.45)] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              {primaryCtaText}
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Bottom Right Decorative Rotating Circular Stamp / Seal (Pinned to corner) */}
        <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-10 select-none group cursor-pointer">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
            {/* Rotating Circular Text SVG */}
            <div className="absolute inset-0 animate-[spin_20s_linear_infinite] group-hover:animate-[spin_8s_linear_infinite] transition-all duration-500">
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                <defs>
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  />
                </defs>
                <text className="text-[7.8px] font-semibold tracking-[0.24em] fill-white/70 uppercase">
                  <textPath href="#circlePath" startOffset="0%">
                    • Astria &amp; Co. • Diverting World Digitally • 2026
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Center Multi-Color Glowing Orb */}
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full p-[2px] bg-gradient-to-tr from-emerald-400 via-[#567D4A] to-[#C9A84C] animate-[spin_6s_linear_infinite] shadow-[0_0_24px_rgba(86,125,74,0.6)]">
              <div className="w-full h-full rounded-full bg-[#0C120C] flex items-center justify-center overflow-hidden">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-300 via-[#C9A84C] to-emerald-600 blur-[2px] animate-pulse" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ShaderHeader;
