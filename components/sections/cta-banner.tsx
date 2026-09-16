import { ArrowRight, PhoneCall } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="py-24 bg-brand text-white relative overflow-hidden" id="contact">
      {/* Subtle background decoration */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-black/10 pointer-events-none" />

      <div className="max-w-[1140px] mx-auto px-6 relative z-10 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 max-w-[700px] mx-auto">
          Ready to Divert Your Business Digitally?
        </h2>
        <p className="text-white/85 text-base sm:text-lg max-w-[500px] mx-auto mb-10 leading-relaxed">
          Let&apos;s discuss your next project. Book a free strategy call and discover how we can accelerate your growth.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            data-open-consultation="true"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-semibold px-7 py-3.5 rounded-[10px] bg-white text-brand-dark hover:bg-white/90 hover:-translate-y-0.5 transition-all shadow-lg shadow-black/10 cursor-pointer"
            id="cta-quote"
          >
            Get a Free Consultation
            <ArrowRight size={16} />
          </button>
          <button
            type="button"
            data-open-consultation="true"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-semibold px-7 py-3.5 rounded-[10px] bg-gold hover:bg-gold-dark text-black hover:-translate-y-0.5 transition-all shadow-lg shadow-black/10 cursor-pointer"
            id="cta-call"
          >
            Book a Strategy Call
            <PhoneCall size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
