import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { Process } from "@/components/sections/process";
import { Portfolio } from "@/components/sections/portfolio";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: {
    absolute: "Astria & Co. — Web Dev & Digital Marketing Agency",
  },
  description:
    "Astria & Co. is a digital agency in Narnaul & Delhi NCR offering custom web development, Meta ads, marketing automation, and design.",
  alternates: {
    canonical: "https://www.astria.co.in",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-brand selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <WhyUs />
        <Process />
        <Portfolio />
        <Testimonials />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
