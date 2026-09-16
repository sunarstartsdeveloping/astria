"use client";

import Image from "next/image";
import { Fingerprint, Shield, Users, ArrowDown } from "lucide-react";

export function WhyUs() {
  return (
    <section className="py-24 bg-[#080B08] text-white relative overflow-hidden border-t border-white/10" id="about">
      {/* Ambient subtle background glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-[#C9A84C]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-[640px] mx-auto mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.16em] text-emerald-400 mb-3">
            Why Astria
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Built Different. Built to Deliver.
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed font-normal">
            We&apos;re not just another agency. We&apos;re your growth partner — combining strategy, design, and technology to deliver real results.
          </p>
        </div>

        {/* Features 8 Bento Grid */}
        <div className="space-y-5 lg:space-y-6">
          {/* Row 1: 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            
            {/* Card 1: 100% Customizable */}
            <div className="rounded-[28px] border border-white/10 bg-[#0E130F]/90 backdrop-blur-md p-7 sm:p-8 flex flex-col justify-between items-center text-center hover:border-white/20 hover:shadow-[0_16px_50px_rgba(0,0,0,0.5)] transition-all duration-300 group">
              <div className="relative w-full h-44 flex items-center justify-center">
                {/* Ambient back glow */}
                <div className="absolute w-36 h-20 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                {/* 3D-angled ellipse badge */}
                <div className="relative px-9 py-3.5 rounded-[50px] border border-white/20 bg-white/[0.04] backdrop-blur-md shadow-[0_0_35px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.2)] flex items-center justify-center group-hover:border-emerald-400/50 group-hover:scale-105 transition-all duration-300">
                  <span className="text-4xl sm:text-5xl font-black tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                    100%
                  </span>
                </div>
              </div>
              <div className="max-w-xs mx-auto">
                <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
                  Customizable
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Tailored architectures engineered specifically for your brand identity, conversion metrics, and business model.
                </p>
              </div>
            </div>

            {/* Card 2: Secure by default */}
            <div className="rounded-[28px] border border-white/10 bg-[#0E130F]/90 backdrop-blur-md p-7 sm:p-8 flex flex-col justify-between items-center text-center hover:border-white/20 hover:shadow-[0_16px_50px_rgba(0,0,0,0.5)] transition-all duration-300 group">
              <div className="relative w-full h-44 flex items-center justify-center">
                {/* Outer thin ring */}
                <div className="absolute w-32 h-32 rounded-full border border-white/10" />
                {/* Concentric radar circle */}
                <div className="relative w-24 h-24 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-sm flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] group-hover:border-emerald-400/40 group-hover:scale-105 transition-all duration-300 overflow-hidden">
                  {/* Sweep scan light line */}
                  <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-[pulse_2.5s_ease-in-out_infinite] blur-[0.5px]" />
                  <Fingerprint size={46} className="text-white/90 group-hover:text-emerald-300 transition-colors duration-300" strokeWidth={1.4} />
                </div>
              </div>
              <div className="max-w-xs mx-auto">
                <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                  Secure by default
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Enterprise security standards, encrypted communications, and automated safeguards protecting your critical data.
                </p>
              </div>
            </div>

            {/* Card 3: Faster than light */}
            <div className="rounded-[28px] border border-white/10 bg-[#0E130F]/90 backdrop-blur-md p-7 sm:p-8 flex flex-col justify-between items-center text-center hover:border-white/20 hover:shadow-[0_16px_50px_rgba(0,0,0,0.5)] transition-all duration-300 group">
              <div className="relative w-full h-44 flex flex-col justify-between pt-1">
                {/* Header readout */}
                <div className="flex items-center justify-between px-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 text-white/60 font-medium">
                    <ArrowDown size={13} className="text-emerald-400" />
                    Download
                  </span>
                  <span className="font-mono text-white/90 font-semibold tracking-wider">
                    14,34 mbps
                  </span>
                </div>
                {/* Undulating spline waveform */}
                <div className="relative w-full h-24 overflow-hidden flex items-end">
                  <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                        <stop offset="50%" stopColor="#4ADE80" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
                      </linearGradient>
                      <linearGradient id="waveFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#4ADE80" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 65 Q 25 65, 45 60 T 90 40 T 135 25 T 180 50 T 225 30 T 270 55 T 315 18 T 360 48 T 400 65 L 400 100 L 0 100 Z"
                      fill="url(#waveFill)"
                    />
                    <path
                      d="M 0 65 Q 25 65, 45 60 T 90 40 T 135 25 T 180 50 T 225 30 T 270 55 T 315 18 T 360 48 T 400 65"
                      fill="none"
                      stroke="url(#waveGrad)"
                      strokeWidth="2.2"
                      className="group-hover:stroke-emerald-300 transition-colors"
                    />
                  </svg>
                </div>
              </div>
              <div className="max-w-xs mx-auto">
                <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                  Faster than light
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Sub-second page speeds, edge caching, and optimized digital assets delivering frictionless user experiences.
                </p>
              </div>
            </div>

          </div>

          {/* Row 2: 2 Columns (Wider Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
            
            {/* Card 4: High-Velocity Execution with Performance Chart (Col 5) */}
            <div className="md:col-span-6 lg:col-span-5 rounded-[28px] border border-white/10 bg-[#0E130F]/90 backdrop-blur-md p-7 sm:p-8 flex flex-col justify-between hover:border-white/20 hover:shadow-[0_16px_50px_rgba(0,0,0,0.5)] transition-all duration-300 group">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center h-full">
                <div className="sm:col-span-6 flex flex-col justify-between h-full">
                  <div className="w-10 h-10 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center mb-6 text-emerald-400">
                    <Shield size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                      High-Velocity Execution
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed">
                      Agile delivery sprints, rapid prototyping, and transparent milestones without bureaucratic delays.
                    </p>
                  </div>
                </div>
                <div className="sm:col-span-6">
                  {/* Mini window with live analytics spike chart */}
                  <div className="rounded-2xl border border-white/10 bg-[#080B08] p-4 shadow-inner group-hover:border-white/20 transition-all">
                    {/* Window dots */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                    </div>
                    {/* Jagged high-frequency polyline chart */}
                    <div className="relative h-28 w-full flex items-end">
                      <svg viewBox="0 0 240 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 0 82 L 12 78 L 22 84 L 32 62 L 42 72 L 52 52 L 62 67 L 72 47 L 82 57 L 92 37 L 102 52 L 112 30 L 122 44 L 132 22 L 142 37 L 152 20 L 162 32 L 172 14 L 182 26 L 192 10 L 202 20 L 212 7 L 222 17 L 240 4 L 240 100 L 0 100 Z"
                          fill="url(#chartFill)"
                        />
                        <path
                          d="M 0 82 L 12 78 L 22 84 L 32 62 L 42 72 L 52 52 L 62 67 L 72 47 L 82 57 L 92 37 L 102 52 L 112 30 L 122 44 L 132 22 L 142 37 L 152 20 L 162 32 L 172 14 L 182 26 L 192 10 L 202 20 L 212 7 L 222 17 L 240 4"
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="1.8"
                          className="group-hover:stroke-emerald-400 transition-colors"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 5: Keep your loved ones safe with Floating Avatar Chips (Col 7) */}
            <div className="md:col-span-6 lg:col-span-7 rounded-[28px] border border-white/10 bg-[#0E130F]/90 backdrop-blur-md p-7 sm:p-8 flex flex-col justify-between hover:border-white/20 hover:shadow-[0_16px_50px_rgba(0,0,0,0.5)] transition-all duration-300 group">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center h-full">
                <div className="sm:col-span-6 flex flex-col justify-between h-full">
                  <div className="w-10 h-10 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center mb-6 text-amber-400">
                    <Users size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                      Dedicated Expert Team
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed">
                      Direct collaborative access to senior engineers, designers, and growth architects on every sprint.
                    </p>
                  </div>
                </div>
                <div className="sm:col-span-6 flex flex-col items-center justify-center py-4">
                  {/* Floating Avatar Chips Stack */}
                  <div className="relative w-full max-w-[260px] h-36 flex flex-col justify-between">
                    
                    {/* Chip 1 (Top-Right): Likeur */}
                    <div className="self-end inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-[#121612]/95 backdrop-blur-md text-xs font-medium text-white shadow-[0_8px_24px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-200 cursor-pointer">
                      <span className="text-white/85 text-[11px]">Likeur</span>
                      <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/20">
                        <Image
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                          alt="Likeur"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Chip 2 (Center-Right): M. Irung */}
                    <div className="self-center translate-x-4 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-[#121612]/95 backdrop-blur-md text-xs font-medium text-white shadow-[0_8px_24px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-200 cursor-pointer">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/20">
                        <Image
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                          alt="M. Irung"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-white/85 text-[11px]">M. Irung</span>
                    </div>

                    {/* Chip 3 (Bottom-Left): B. Ng */}
                    <div className="self-start inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-[#121612]/95 backdrop-blur-md text-xs font-medium text-white shadow-[0_8px_24px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-200 cursor-pointer">
                      <span className="text-white/85 text-[11px]">B. Ng</span>
                      <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/20">
                        <Image
                          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
                          alt="B. Ng"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default WhyUs;
