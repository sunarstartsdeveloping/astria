"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

export interface HarmonicItem {
  id: number;
  title: string;
  category: string;
  image: string;
  initial: {
    x: string; // in vw
    y: string; // in vh
    rotate: number; // degrees
  };
  target: {
    x: string; // in vw
    y: string; // in vh
    rotate: number; // degrees
    scale: number;
  };
}

const DEFAULT_ITEMS: HarmonicItem[] = [
  // Top Row (Initial State 1) -> Dispersed Peripheral Positions (State 2)
  // 1. Redis Cakes (Top-Left -> Far Top-Left)
  {
    id: 1,
    title: "Redis Custom Cakes & Cafe",
    category: "Bakery & Cafe Branding",
    image: "/projects/redis-bakery.jpg",
    initial: { x: "-26vw", y: "-11vh", rotate: -5 },
    target: { x: "-38vw", y: "-36vh", rotate: -7, scale: 0.95 },
  },
  // 2. SMC Cafee (Top-Center -> Top-Center)
  {
    id: 2,
    title: "SMC Cafee & Pizza",
    category: "Fast Casual Dining",
    image: "/projects/smc-cafee.jpg",
    initial: { x: "0vw", y: "-13vh", rotate: 2 },
    target: { x: "0vw", y: "-40vh", rotate: 1, scale: 1.02 },
  },
  // 3. Gulab Ganj Restaurant (Top-Right -> Far Top-Right)
  {
    id: 3,
    title: "The Gulab Ganj Restaurant",
    category: "Heritage Hospitality",
    image: "/projects/gulab-ganj.jpg",
    initial: { x: "26vw", y: "-11vh", rotate: 4 },
    target: { x: "38vw", y: "-36vh", rotate: 6, scale: 0.95 },
  },
  // Bottom Row (Initial State 1) -> Dispersed Peripheral Positions (State 2)
  // 4. Sagar Mobile (Bottom-Left -> Bottom-Left)
  {
    id: 4,
    title: "Sagar Mobile & Marshall",
    category: "Tech Retail Campaign",
    image: "/projects/sagar-mobile.jpg",
    initial: { x: "-26vw", y: "12vh", rotate: 4 },
    target: { x: "-38vw", y: "36vh", rotate: -5, scale: 0.95 },
  },
  // 5. Happy Communication (Bottom-Center -> Bottom-Center)
  {
    id: 5,
    title: "Happy Communication Rebrand",
    category: "Brand Identity",
    image: "/projects/happy-communication.jpg",
    initial: { x: "0vw", y: "14vh", rotate: -2 },
    target: { x: "0vw", y: "41vh", rotate: -2, scale: 1.02 },
  },
  // 6. 4U Fashion Store (Bottom-Right -> Bottom-Right)
  {
    id: 6,
    title: "4U Fashion Family Store",
    category: "Apparel & Retail Marketing",
    image: "/projects/4u-fashion.jpg",
    initial: { x: "26vw", y: "12vh", rotate: -4 },
    target: { x: "38vw", y: "36vh", rotate: 5, scale: 0.95 },
  },
];

interface HarmonicWaveProps {
  items?: HarmonicItem[];
  title?: string;
  highlightWord?: string;
  subtitle?: string;
  className?: string;
}

function HarmonicCard({
  item,
  scrollYProgress,
}: {
  item: HarmonicItem;
  scrollYProgress: MotionValue<number>;
}) {
  const x = useTransform(
    scrollYProgress,
    [0, 0.75],
    [item.initial.x, item.target.x]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.75],
    [item.initial.y, item.target.y]
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.75],
    [item.initial.rotate, item.target.rotate]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.75],
    [1, item.target.scale]
  );

  return (
    <motion.div
      style={{ x, y, rotate, scale }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer pointer-events-auto group"
    >
      <div className="relative w-[170px] xs:w-[210px] sm:w-[270px] md:w-[330px] aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden border border-white/20 bg-[#121512] shadow-[0_12px_36px_rgba(0,0,0,0.6)] transition-all duration-300 group-hover:scale-105 group-hover:border-emerald-400/70 group-hover:shadow-[0_16px_50px_rgba(86,125,74,0.35)]">
        <Image
          src={item.image}
          alt={`${item.title} — ${item.category} project by Astria & Co.`}
          fill
          sizes="(max-width: 640px) 190px, (max-width: 768px) 270px, 330px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Title overlay (always visible on mobile touch, hover on desktop) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5 sm:p-3.5">
          <span className="text-[9px] sm:text-[10px] font-semibold text-emerald-300 uppercase tracking-wider">
            {item.category}
          </span>
          <span className="text-[11px] sm:text-xs font-bold text-white truncate">
            {item.title}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function HarmonicWave({
  items = DEFAULT_ITEMS,
  title = "Selected",
  highlightWord = "Design",
  subtitle = "High-converting brand identities, social media creatives, and marketing campaigns crafted by Astria & Co.",
  className,
}: HarmonicWaveProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Center text transformation
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.6], [0, 1]);
  const textScale = useTransform(scrollYProgress, [0.15, 0.6], [0.88, 1]);
  const textY = useTransform(scrollYProgress, [0.15, 0.6], [20, 0]);

  // Bottom scroll indicator fades out immediately upon scrolling
  const scrollIndicatorOpacity = useTransform(scrollYProgress, (val) => Math.max(0, 1 - val * 25));
  const scrollIndicatorY = useTransform(scrollYProgress, (val) => -val * 100);

  return (
    <div
      ref={containerRef}
      className={cn("relative h-[250vh] w-full bg-[#080908] text-white", className)}
      id="work"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Ambient subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vh] bg-emerald-600/5 rounded-full blur-[150px] pointer-events-none" />

        {/* Center Text (Reveals as cards disperse outward) */}
        <motion.div
          style={{ opacity: textOpacity, scale: textScale, y: textY }}
          className="relative z-10 text-center max-w-4xl px-6 pointer-events-none select-none flex flex-col items-center justify-center"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-3 sm:mb-4 text-white leading-tight whitespace-normal sm:whitespace-nowrap">
            {title}{" "}
            <span className="text-[#567D4A] drop-shadow-[0_0_28px_rgba(86,125,74,0.5)]">
              {highlightWord}
            </span>{" "}
            Works.
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-xl mx-auto leading-relaxed font-normal">
            {subtitle}
          </p>
        </motion.div>

        {/* The 8 Animated Cards */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
          {items.map((item) => (
            <HarmonicCard
              key={item.id}
              item={item}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Bottom "SCROLL TO HARMONIZE" indicator */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity, y: scrollIndicatorY }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none select-none"
        >
          <span className="text-[10px] font-semibold tracking-[0.28em] text-white/50 uppercase">
            Scroll to Harmonize
          </span>
          <div className="w-[1px] h-7 bg-gradient-to-b from-white/60 via-emerald-400/80 to-transparent animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
}

export default HarmonicWave;
