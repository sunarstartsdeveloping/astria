"use client";

import { ShaderHeader } from "@/components/ui/shader-header";

export function Hero() {
  return (
    <section id="hero" className="relative w-full bg-background overflow-hidden">
      <ShaderHeader
        badgeText="Diverting World Digitally"
        word1="Transformative"
        word2="Digital"
        word3="Experiences"
        description="Create high-impact digital experiences with custom web applications, conversion-engineered sales funnels, high-ROAS Meta ads, and marketing automation that turn traffic into measurable growth."
        primaryCtaText="Get Started"
        primaryCtaLink="#contact"
        secondaryCtaText="Explore Services"
        secondaryCtaLink="#services"
      />
    </section>
  );
}

export default Hero;
