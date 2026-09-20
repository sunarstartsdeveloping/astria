import { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal-page-layout";
import { Lock, ShieldCheck, Key, Server } from "lucide-react";

export const metadata: Metadata = {
  title: "Security & Data Standards",
  description:
    "Learn about Astria & Co.'s data security standards, PCI-DSS Level 1 compliant payments, SSL encryption, and credential protection.",
  alternates: {
    canonical: "https://www.astria.co.in/security",
  },
};

export default function SecurityPage() {
  return (
    <LegalPageLayout title="Security &amp; Data Protection" badge="Infrastructure Security">
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          1. Security Commitment
        </h2>
        <p>
          At Astria &amp; Co., safeguarding client data, engineering assets, and commercial transactions is embedded into our core architecture. We enforce robust technical, operational, and organizational protocols to prevent unauthorized access, data breaches, and service interruptions.
        </p>
      </section>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <div className="p-5 rounded-xl bg-[#0E130F] border border-white/10 space-y-2">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Lock size={18} />
          </div>
          <h3 className="font-semibold text-white text-base">256-Bit SSL/TLS Encryption</h3>
          <p className="text-xs text-white/60 leading-relaxed">
            All data in transit across astriaandco.com and client platforms is encrypted via TLS 1.3 with modern cryptographic cipher suites.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#0E130F] border border-white/10 space-y-2">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck size={18} />
          </div>
          <h3 className="font-semibold text-white text-base">PCI-DSS Gateway Compliance</h3>
          <p className="text-xs text-white/60 leading-relaxed">
            Online checkout sessions are processed exclusively via Level 1 PCI-DSS certified payment processors with tokenized card data.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#0E130F] border border-white/10 space-y-2">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Key size={18} />
          </div>
          <h3 className="font-semibold text-white text-base">Strict Credential Isolation</h3>
          <p className="text-xs text-white/60 leading-relaxed">
            Client ad accounts, APIs, and hosting keys are managed via password managers with mandatory two-factor authentication (2FA).
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#0E130F] border border-white/10 space-y-2">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Server size={18} />
          </div>
          <h3 className="font-semibold text-white text-base">Secure Cloud Deployments</h3>
          <p className="text-xs text-white/60 leading-relaxed">
            Applications are hosted on enterprise edge networks (Vercel, AWS, Cloudflare) with automated DDoS mitigation and firewall rules.
          </p>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          2. Payment Gateway &amp; Financial Security Architecture
        </h2>
        <p>
          To ensure total compliance with payment aggregators and credit card associations (Visa, MasterCard, RuPay, American Express):
        </p>
        <ul className="list-disc pl-6 space-y-2 text-white/70">
          <li><strong>Zero Card Data Retention:</strong> Astria &amp; Co. never receives, logs, or stores full card numbers, CVVs, or cardholder banking passwords on any internal database or server.</li>
          <li><strong>Tokenization:</strong> Payment transactions are executed using secure cryptographic tokens issued directly by our payment gateway providers (Stripe / Razorpay).</li>
          <li><strong>Fraud Prevention:</strong> Real-time risk detection algorithms and 3D-Secure 2.0 (3DS2) authentication are enabled to prevent unauthorized transactions.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          3. Source Code &amp; Client Data Integrity
        </h2>
        <p>
          We adhere to DevSecOps best practices throughout our development lifecycles:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-white/70">
          <li>Code repositories are strictly private and protected by multi-factor authentication (MFA) and branch protection rules.</li>
          <li>Secrets, API credentials, and environment variables are never committed into client code repositories; they are injected via secure secret management vaults.</li>
          <li>Regular dependency vulnerability audits (`npm audit`) are conducted on all production codebases.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          4. Responsible Vulnerability Disclosure
        </h2>
        <p>
          If you discover a potential security vulnerability within any of our web properties or client deliverables, we welcome your responsible disclosure. Please notify our security team directly with reproduction steps at:
        </p>
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1 text-sm font-mono text-white/80">
          <div>Security Team: astriacreative.co@gmail.com</div>
          <div>Emergency Helpline: +91 82784 55700</div>
          <div>Astria &amp; Co. — Narnaul, Haryana, India</div>
        </div>
      </section>
    </LegalPageLayout>
  );
}
