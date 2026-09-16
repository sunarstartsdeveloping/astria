import { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal-page-layout";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us — Astria & Co.",
  description: "Official contact details, merchant support, and project inquiry channels for Astria & Co.",
};

export default function ContactPage() {
  return (
    <LegalPageLayout title="Contact Us" badge="Merchant &amp; Client Support">
      <section className="space-y-4">
        <p className="text-base text-white/80 leading-relaxed">
          Whether you have a question about our digital agency services, need payment verification, or want to discuss a new project, our team is ready to help you divert your world digitally.
        </p>
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">Looking to start a new project?</h3>
            <p className="text-xs sm:text-sm text-white/70 mt-0.5">
              Fill our quick project brief form to get a tailored plan sent to our team at astriacreative.co@gmail.com.
            </p>
          </div>
          <button
            type="button"
            data-open-consultation="true"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-all shadow-md shadow-emerald-950 cursor-pointer"
          >
            Start Project Consultation &rarr;
          </button>
        </div>
      </section>

      {/* Official Merchant Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <div className="p-6 rounded-2xl bg-[#0E130F] border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Mail size={18} />
          </div>
          <div>
            <span className="text-xs uppercase font-semibold text-white/50 tracking-wider block mb-1">
              Email Support
            </span>
            <a
              href="mailto:astriacreative.co@gmail.com"
              className="text-base font-bold text-white hover:text-emerald-400 transition-colors break-all"
            >
              astriacreative.co@gmail.com
            </a>
            <span className="text-xs text-white/50 block mt-1">Average response time: &lt; 4 hours</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#0E130F] border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Phone size={18} />
          </div>
          <div>
            <span className="text-xs uppercase font-semibold text-white/50 tracking-wider block mb-1">
              Direct Phone / WhatsApp
            </span>
            <a
              href="tel:+918278455700"
              className="text-base font-bold text-white hover:text-emerald-400 transition-colors"
            >
              +91 82784 55700
            </a>
            <span className="text-xs text-white/50 block mt-1">Mon–Sat, 9:00 AM – 7:00 PM IST</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#0E130F] border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <MapPin size={18} />
          </div>
          <div>
            <span className="text-xs uppercase font-semibold text-white/50 tracking-wider block mb-1">
              Registered Operating Address
            </span>
            <span className="text-base font-bold text-white block">Narnaul, Haryana, India</span>
            <span className="text-xs text-white/50 block mt-1">PIN: 123001 (Works remotely worldwide)</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#0E130F] border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-pink-400">
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </div>
          <div>
            <span className="text-xs uppercase font-semibold text-white/50 tracking-wider block mb-1">
              Official Instagram
            </span>
            <a
              href="https://instagram.com/astriacreative.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-bold text-white hover:text-pink-400 transition-colors block"
            >
              @astriacreative.co
            </a>
            <span className="text-xs text-white/50 block mt-1">Daily project drops &amp; creative case studies</span>
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          Business &amp; Support Hours
        </h2>
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
          <Clock size={20} className="text-emerald-400 shrink-0" />
          <div className="text-sm text-white/80">
            <strong className="text-white">Operating Schedule:</strong> Monday through Saturday: 09:00 AM – 07:00 PM IST. Direct client urgent support is available 24/7 via designated Slack / WhatsApp VIP channels.
          </div>
        </div>
      </section>

      <section className="space-y-4 pt-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          Payment &amp; Billing Inquiries
        </h2>
        <p>
          If you have queries regarding a transaction processed through our payment gateway (Stripe / Razorpay), please reference your Order or Invoice ID in your email for rapid resolution within 24 business hours.
        </p>
      </section>
    </LegalPageLayout>
  );
}
