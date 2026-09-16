import React from "react";
import Image from "next/image";

interface AstriaLogoMarkProps {
  className?: string;
  size?: number;
}

/**
 * Astria & Co. Architectural 'A' Brand Emblem
 * Features the signature easel/architectural 'A' mark with top cap,
 * dual triangular inner viewports, and grounded stance.
 */
export function AstriaLogoMark({
  className = "w-5 h-5",
  size,
}: AstriaLogoMarkProps) {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <svg
      viewBox="0 0 152 143"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M 42 0 L 38 6 L 41 13 L 43 14 L 62 14 L 63 16 L 25 88 L 23 90 L 5 126 L 3 128 L 0 134 L 1 138 L 4 142 L 11 142 L 14 139 L 35 98 L 41 89 L 110 89 L 114 94 L 137 139 L 140 142 L 147 142 L 151 137 L 151 133 L 144 122 L 144 120 L 142 118 L 128 90 L 126 88 L 126 86 L 124 84 L 88 16 L 89 14 L 108 14 L 110 13 L 113 9 L 112 3 L 109 0 Z M 84 40 L 88 45 L 102 72 L 101 75 L 84 75 L 83 74 L 83 41 Z M 67 40 L 68 41 L 68 74 L 67 75 L 50 75 L 49 72 L 62 47 Z"
      />
    </svg>
  );
}

interface AstriaLogoProps {
  className?: string;
  badgeClassName?: string;
  markClassName?: string;
  showText?: boolean;
  textClassName?: string;
  size?: "sm" | "md" | "lg";
}

export function AstriaLogo({
  className = "",
  badgeClassName,
  markClassName,
  showText = true,
  textClassName = "text-lg font-bold tracking-wide text-white",
  size = "md",
}: AstriaLogoProps) {
  const badgeSizeClasses = {
    sm: "w-7 h-7 rounded-lg",
    md: "w-8 h-8 rounded-lg",
    lg: "w-10 h-10 rounded-xl",
  }[size];

  const markSizeClasses = {
    sm: "w-4 h-4",
    md: "w-4.5 h-4.5",
    lg: "w-5.5 h-5.5",
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <span
        className={`${badgeSizeClasses} bg-[#2D4532] border border-emerald-500/20 shadow-sm flex items-center justify-center text-white transition-all ${
          badgeClassName || ""
        }`}
      >
        <AstriaLogoMark className={`${markSizeClasses} ${markClassName || "text-white"}`} />
      </span>
      {showText && <span className={textClassName}>Astria &amp; Co.</span>}
    </div>
  );
}
