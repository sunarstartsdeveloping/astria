import Image from "next/image";
import { Star, CheckCircle2 } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  handle: string;
  avatar: string;
  quote: string;
  metric: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Yogesh Verma",
    role: "Chairman",
    company: "Mascot Education Hub",
    handle: "@mascoteducationhub",
    avatar: "/testimonials/yogesh-verma.png",
    quote:
      "It felt very nice working with Astria & Co. Gonna use their service for a long period.",
    metric: "Long-Term Growth Partner",
  },
  {
    name: "Vicky",
    role: "Owner",
    company: "Saawariya Mobiles",
    handle: "@saawariyamobiles",
    avatar: "/testimonials/vicky.png",
    quote:
      "Loved the video editing and graphic design very much.",
    metric: "Video & Graphic Design",
  },
  {
    name: "Rao Jatin",
    role: "Freelancer & Creator",
    company: "Creative Technologist",
    handle: "@raojatin",
    avatar: "/testimonials/rao-jatin.png",
    quote:
      "Loved 3D designs of web pages provided by Astria & Co.",
    metric: "3D Web Engineering",
  },
  {
    name: "Himanshu Soni",
    role: "Jewellery Designer",
    company: "PCVK",
    handle: "@himanshusoni2324",
    avatar: "/testimonials/himanshu-soni.jpg",
    quote:
      "Got my 80% of problems solved just by WhatsApp automation, appreciate 👏",
    metric: "80% Workflows Automated",
  },
];

export function Testimonials() {
  // Triplicate testimonials array for ultra-smooth continuous infinite loop
  const marqueeItems = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-[#0A0D0A] border-t border-white/10 overflow-hidden relative" id="testimonials">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1140px] mx-auto px-6 mb-16 relative z-10">
        <div className="text-center max-w-[640px] mx-auto">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.1em] text-emerald-400 mb-3">
            Verified Client Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-white">
            Trusted by Real Founders &amp; Creators
          </h2>
          <p className="text-white/60 text-base leading-relaxed">
            Real feedback from business owners, directors, and creatives partnering with Astria &amp; Co.
          </p>
        </div>
      </div>

      {/* Infinite Marquee Container with smooth edge fades */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="animate-marquee flex gap-6 py-4">
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.handle}-${index}`}
              className="w-[340px] sm:w-[390px] p-6 sm:p-7 rounded-2xl border border-white/10 bg-[#0E1410] hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-950/40 transition-all duration-300 flex-shrink-0 flex flex-col justify-between group"
            >
              {/* Header: Author & Rating */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20 group-hover:border-emerald-400/80 bg-black/40 flex-shrink-0 transition-colors">
                      <Image
                        src={item.avatar}
                        alt={`${item.name} (${item.role} at ${item.company}) — Astria & Co. Client Testimonial`}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-white/50 font-mono">{item.handle}</p>
                    </div>
                  </div>

                  {/* 5 Stars */}
                  <div className="flex gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" stroke="none" />
                    ))}
                  </div>
                </div>

                {/* Role subtitle */}
                <div className="text-xs font-medium text-emerald-300/80 mb-3">
                  {item.role} • <span className="text-white/60">{item.company}</span>
                </div>

                {/* Review text */}
                <p className="text-sm text-white/80 leading-relaxed font-light">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Verified Result Metric */}
              <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  {item.metric}
                </span>
                <span className="text-[11px] text-white/40 font-medium">Verified Client</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle indicator under marquee */}
      <div className="text-center mt-6 text-xs text-white/40">
        <span className="hidden sm:inline">Hover over any review to pause</span>
        <span className="sm:hidden">Touch any review to pause</span>
      </div>
    </section>
  );
}

