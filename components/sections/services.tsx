"use client";

import { GlowCard } from "@/components/ui/spotlight-card";
import { ArrowUpRight } from "lucide-react";

export function Services() {
  return (
    <section
      className="py-24 bg-[#080B08] text-white relative border-t border-white/10 overflow-hidden"
      id="services"
      style={{
        ["--card" as string]: "#0E130F",
        ["--border" as string]: "rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[450px] h-[450px] bg-[#C9A84C]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-[640px] mx-auto mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.16em] text-emerald-400 mb-3">
            Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Services Tailored to Your Growth
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed font-normal">
            End-to-end digital solutions — from design and development to marketing and automation — all crafted to scale your brand.
          </p>
        </div>

        {/* 6 Services Grid with GlowCards & Custom Graphics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. Web App Development (Green Glow) */}
          <GlowCard
            glowColor="green"
            customSize
            className="w-full min-h-[390px] p-7 sm:p-8 rounded-[28px] border border-white/10 bg-[#0E130F]/90 backdrop-blur-md hover:border-white/20 hover:shadow-[0_16px_50px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
          >
            {/* Custom Graphic: Terminal Code Window */}
            <div className="relative w-full h-40 rounded-2xl bg-[#080B08] border border-white/10 p-3.5 mb-5 flex flex-col justify-between overflow-hidden group-hover:border-emerald-500/30 transition-colors">
              {/* Window Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-400/70" />
                  <div className="w-2 h-2 rounded-full bg-amber-400/70" />
                  <div className="w-2 h-2 rounded-full bg-emerald-400/70" />
                </div>
                <span className="text-[10px] font-mono text-white/50">src/engine.ts</span>
                <span className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  ● Next.js 15
                </span>
              </div>
              {/* Syntax Lines */}
              <div className="font-mono text-[11px] leading-relaxed space-y-1 text-white/75 pt-1">
                <div>
                  <span className="text-purple-400">export const</span> <span className="text-emerald-300">config</span> = &#123;
                </div>
                <div className="pl-3">
                  <span className="text-white/60">speed:</span> <span className="text-amber-300">&quot;instant&quot;</span>,
                </div>
                <div className="pl-3">
                  <span className="text-white/60">scale:</span> <span className="text-emerald-300">&quot;infinite&quot;</span>,
                </div>
                <div>&#125;;<span className="inline-block w-1.5 h-3 ml-1 bg-emerald-400 animate-pulse" /></div>
              </div>
            </div>
            {/* Title & Description */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                  Web App Development
                </h3>
                <ArrowUpRight size={18} className="text-white/40 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <p className="text-sm text-white/60 leading-relaxed font-normal">
                Custom-built web applications with modern frameworks, blazing performance, and scalable architecture — from MVPs to enterprise solutions.
              </p>
            </div>
          </GlowCard>

          {/* 2. Graphic Design (Purple Glow) */}
          <GlowCard
            glowColor="purple"
            customSize
            className="w-full min-h-[390px] p-7 sm:p-8 rounded-[28px] border border-white/10 bg-[#0E130F]/90 backdrop-blur-md hover:border-white/20 hover:shadow-[0_16px_50px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
          >
            {/* Custom Graphic: Vector Bezier & Design Tokens */}
            <div className="relative w-full h-40 rounded-2xl bg-[#080B08] border border-white/10 p-3.5 mb-5 flex flex-col justify-between overflow-hidden group-hover:border-purple-500/30 transition-colors">
              <div className="flex items-center justify-between text-[10px] text-white/50 border-b border-white/10 pb-2">
                <span className="font-mono">Vector Studio</span>
                <span className="text-purple-300 font-mono text-[9px] bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                  Aa · Display 800
                </span>
              </div>
              {/* Bezier curve canvas simulation */}
              <div className="relative h-20 w-full flex items-center justify-center">
                <svg viewBox="0 0 260 80" className="w-full h-full overflow-visible">
                  <path
                    d="M 20 60 C 60 10, 100 10, 130 45 C 160 80, 200 80, 240 20"
                    fill="none"
                    stroke="#C084FC"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                    className="opacity-75"
                  />
                  {/* Anchor points */}
                  <circle cx="20" cy="60" r="3.5" fill="#C084FC" />
                  <circle cx="130" cy="45" r="4" fill="#ffffff" stroke="#A855F7" strokeWidth="2" />
                  <circle cx="240" cy="20" r="3.5" fill="#C084FC" />
                  {/* Color Swatch Badges */}
                  <g transform="translate(180, 48)">
                    <rect width="65" height="24" rx="12" fill="#141814" stroke="rgba(255,255,255,0.15)" />
                    <circle cx="12" cy="12" r="5" fill="#567D4A" />
                    <circle cx="24" cy="12" r="5" fill="#C9A84C" />
                    <circle cx="36" cy="12" r="5" fill="#A855F7" />
                  </g>
                </svg>
              </div>
            </div>
            {/* Title & Description */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                  Graphic Design
                </h3>
                <ArrowUpRight size={18} className="text-white/40 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <p className="text-sm text-white/60 leading-relaxed font-normal">
                Stunning brand identities, social media creatives, marketing collateral, and UI design that makes your brand impossible to ignore.
              </p>
            </div>
          </GlowCard>

          {/* 3. Sales Funnel Design (Blue Glow) */}
          <GlowCard
            glowColor="blue"
            customSize
            className="w-full min-h-[390px] p-7 sm:p-8 rounded-[28px] border border-white/10 bg-[#0E130F]/90 backdrop-blur-md hover:border-white/20 hover:shadow-[0_16px_50px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
          >
            {/* Custom Graphic: Conversion Funnel Geometry */}
            <div className="relative w-full h-40 rounded-2xl bg-[#080B08] border border-white/10 p-3.5 mb-5 flex flex-col justify-between overflow-hidden group-hover:border-blue-500/30 transition-colors">
              <div className="flex items-center justify-between text-[10px] text-white/50 border-b border-white/10 pb-2">
                <span className="font-mono">Funnel Architecture</span>
                <span className="text-blue-300 font-mono text-[9px] bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  +312% Conv. Rate
                </span>
              </div>
              {/* Stacked Funnel Tiers */}
              <div className="flex flex-col items-center justify-center gap-1.5 py-1">
                {/* Tier 1: Traffic */}
                <div className="w-[88%] h-5 rounded-md bg-gradient-to-r from-blue-500/30 via-blue-400/40 to-blue-500/30 border border-blue-400/40 flex items-center justify-between px-2.5 text-[10px] text-white/90">
                  <span>Awareness</span>
                  <span className="font-mono text-[9px] text-blue-300">10,000</span>
                </div>
                {/* Tier 2: Engagement */}
                <div className="w-[66%] h-5 rounded-md bg-gradient-to-r from-blue-600/40 via-blue-500/50 to-blue-600/40 border border-blue-400/50 flex items-center justify-between px-2 text-[10px] text-white/90">
                  <span>Qualified</span>
                  <span className="font-mono text-[9px] text-blue-300">3,840</span>
                </div>
                {/* Tier 3: Customers */}
                <div className="w-[44%] h-5 rounded-md bg-gradient-to-r from-blue-700/50 via-blue-600/60 to-blue-700/50 border border-blue-300/60 flex items-center justify-between px-2 text-[10px] text-white font-semibold">
                  <span>Sales</span>
                  <span className="font-mono text-[9px] text-white">1,210</span>
                </div>
              </div>
            </div>
            {/* Title & Description */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
                  Sales Funnel Design
                </h3>
                <ArrowUpRight size={18} className="text-white/40 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <p className="text-sm text-white/60 leading-relaxed font-normal">
                Conversion-optimized landing pages and sales funnels that guide prospects seamlessly from awareness to purchase.
              </p>
            </div>
          </GlowCard>

          {/* 4. Meta Ads Management (Orange Glow) */}
          <GlowCard
            glowColor="orange"
            customSize
            className="w-full min-h-[390px] p-7 sm:p-8 rounded-[28px] border border-white/10 bg-[#0E130F]/90 backdrop-blur-md hover:border-white/20 hover:shadow-[0_16px_50px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
          >
            {/* Custom Graphic: ROAS Target Reticle & Sparkline */}
            <div className="relative w-full h-40 rounded-2xl bg-[#080B08] border border-white/10 p-3.5 mb-5 flex flex-col justify-between overflow-hidden group-hover:border-amber-500/30 transition-colors">
              <div className="flex items-center justify-between text-[10px] text-white/50 border-b border-white/10 pb-2">
                <span className="font-mono">Meta Campaigns</span>
                <span className="text-amber-400 font-mono text-[9px] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  ● 5.4× Target ROAS
                </span>
              </div>
              {/* Crosshair with metrics */}
              <div className="relative h-20 w-full flex items-center justify-between px-2">
                {/* Circular reticle */}
                <div className="relative w-16 h-16 rounded-full border border-amber-400/30 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full border border-amber-400/50 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  </div>
                  <div className="absolute inset-x-0 h-[1px] bg-amber-400/30" />
                  <div className="absolute inset-y-0 w-[1px] bg-amber-400/30" />
                </div>
                {/* Metrics Callout */}
                <div className="text-right">
                  <span className="block text-2xl font-black text-amber-400 tracking-tight font-mono">5.4×</span>
                  <span className="text-[10px] text-white/50 uppercase tracking-wider">Average ROAS</span>
                </div>
              </div>
            </div>
            {/* Title & Description */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                  Meta Ads Management
                </h3>
                <ArrowUpRight size={18} className="text-white/40 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <p className="text-sm text-white/60 leading-relaxed font-normal">
                Strategic Facebook &amp; Instagram ad campaigns with precise targeting, A/B testing, and continuous optimization for maximum ROAS.
              </p>
            </div>
          </GlowCard>

          {/* 5. Video Editing (Red Glow) */}
          <GlowCard
            glowColor="red"
            customSize
            className="w-full min-h-[390px] p-7 sm:p-8 rounded-[28px] border border-white/10 bg-[#0E130F]/90 backdrop-blur-md hover:border-white/20 hover:shadow-[0_16px_50px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
          >
            {/* Custom Graphic: Video Timeline & Audio Waveform */}
            <div className="relative w-full h-40 rounded-2xl bg-[#080B08] border border-white/10 p-3.5 mb-5 flex flex-col justify-between overflow-hidden group-hover:border-red-500/30 transition-colors">
              <div className="flex items-center justify-between text-[10px] text-white/50 border-b border-white/10 pb-2">
                <span className="font-mono text-red-400">00:14:28:02</span>
                <span className="text-red-300 font-mono text-[9px] bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                  4K 60fps ProRes
                </span>
              </div>
              {/* Timeline Track Bars */}
              <div className="relative h-18 w-full flex flex-col justify-center gap-1.5">
                {/* Track 1 (Video) */}
                <div className="w-full h-4 rounded bg-red-950/50 border border-red-500/30 flex items-center overflow-hidden relative">
                  <div className="w-1/3 h-full bg-red-600/40 border-r border-red-400/50" />
                  <div className="w-1/4 h-full bg-red-500/30 border-r border-red-400/50" />
                  <div className="flex-1 h-full bg-red-600/40" />
                </div>
                {/* Track 2 (Audio Waveform) */}
                <div className="w-full h-4 rounded bg-white/[0.04] border border-white/10 flex items-center px-1 gap-0.5 overflow-hidden">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-red-400/60 rounded-full"
                      style={{ height: `${20 + Math.sin(i * 0.7) * 70}%` }}
                    />
                  ))}
                </div>
                {/* Scrubber needle */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-white shadow-[0_0_8px_#ef4444]">
                  <div className="w-2 h-2 -ml-[3px] bg-white rotate-45 rounded-[1px]" />
                </div>
              </div>
            </div>
            {/* Title & Description */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-red-400 transition-colors">
                  Video Editing
                </h3>
                <ArrowUpRight size={18} className="text-white/40 group-hover:text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <p className="text-sm text-white/60 leading-relaxed font-normal">
                Professional video production and editing — reels, promos, testimonials, and brand stories that captivate and convert.
              </p>
            </div>
          </GlowCard>

          {/* 6. Marketing Automation (Green Glow) */}
          <GlowCard
            glowColor="green"
            customSize
            className="w-full min-h-[390px] p-7 sm:p-8 rounded-[28px] border border-white/10 bg-[#0E130F]/90 backdrop-blur-md hover:border-white/20 hover:shadow-[0_16px_50px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
          >
            {/* Custom Graphic: Flow Pipeline Nodes */}
            <div className="relative w-full h-40 rounded-2xl bg-[#080B08] border border-white/10 p-3.5 mb-5 flex flex-col justify-between overflow-hidden group-hover:border-emerald-500/30 transition-colors">
              <div className="flex items-center justify-between text-[10px] text-white/50 border-b border-white/10 pb-2">
                <span className="font-mono">Workflow Pipeline</span>
                <span className="text-emerald-400 font-mono text-[9px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  ● 24/7 Autopilot
                </span>
              </div>
              {/* Connected Pipeline Nodes */}
              <div className="flex items-center justify-between px-1 py-3 relative">
                {/* Dashed connecting line */}
                <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-[1px] border-t border-dashed border-emerald-400/40 z-0" />
                
                {/* Node 1 */}
                <div className="relative z-10 px-2.5 py-1.5 rounded-lg border border-white/15 bg-[#121812] text-[10px] font-mono text-white/80 shadow-md">
                  Lead In
                </div>
                {/* Node 2 */}
                <div className="relative z-10 px-2.5 py-1.5 rounded-lg border border-emerald-500/40 bg-[#121812] text-[10px] font-mono text-emerald-300 shadow-md">
                  AI Filter
                </div>
                {/* Node 3 */}
                <div className="relative z-10 px-2.5 py-1.5 rounded-lg border border-white/15 bg-[#121812] text-[10px] font-mono text-white/80 shadow-md">
                  CRM Deal
                </div>
              </div>
            </div>
            {/* Title & Description */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                  Marketing Automation
                </h3>
                <ArrowUpRight size={18} className="text-white/40 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <p className="text-sm text-white/60 leading-relaxed font-normal">
                Automated email sequences, CRM workflows, and lead nurturing systems that work 24/7 so you can focus on closing deals.
              </p>
            </div>
          </GlowCard>

        </div>
      </div>
    </section>
  );
}

export default Services;

