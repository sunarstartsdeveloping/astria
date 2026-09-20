import { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal-page-layout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the official privacy policy of Astria & Co. Learn how we handle client data, cookies, and secure payment processing standards.",
  alternates: {
    canonical: "https://www.astria.co.in/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" badge="Data Protection">
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          1. Introduction
        </h2>
        <p>
          Astria &amp; Co. (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects the privacy of our visitors, clients, and partners. This Privacy Policy details how we collect, use, process, and safeguard your personal and business data when you visit our website, submit inquiries, or engage our digital agency services.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          2. Information We Collect
        </h2>
        <p>We may collect information directly from you through our website and client onboarding forms:</p>
        <ul className="list-disc pl-6 space-y-2 text-white/70">
          <li><strong>Identity &amp; Contact Details:</strong> Name, business name, official email address, phone number, and physical billing address.</li>
          <li><strong>Project Specifications:</strong> Brand guidelines, creative assets, marketing goals, target audience data, and technical specifications provided for project execution.</li>
          <li><strong>Technical &amp; Usage Data:</strong> Internet Protocol (IP) address, browser type, operating system, referring URLs, and interactive navigation patterns on our site.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          3. Payment Processing &amp; Financial Data Security
        </h2>
        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-300 text-sm">
          <strong>Important Gateway Disclosure:</strong> We do NOT store, process, or hold raw payment card numbers, CVVs, or online banking passwords on our servers.
        </div>
        <p>
          All online financial transactions are facilitated through certified third-party payment gateways (e.g., Stripe, Razorpay, or authorized banking partners). These processors adhere to the strict standards set by the Payment Card Industry Data Security Standard (PCI-DSS) as managed by the PCI Security Standards Council.
        </p>
        <p>
          Your payment information is encrypted using secure socket layer technology (SSL 256-bit encryption) and handled directly by the payment gateway.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          4. How We Use Your Information
        </h2>
        <p>We use the collected information solely for legitimate commercial purposes:</p>
        <ul className="list-disc pl-6 space-y-2 text-white/70">
          <li>Delivering, developing, and optimizing our web development, design, and marketing deliverables.</li>
          <li>Processing invoices, milestone billing, and transaction confirmations.</li>
          <li>Communicating project updates, review schedules, and support queries.</li>
          <li>Monitoring system performance, website security, and preventing fraudulent activities.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          5. Cookies &amp; Tracking Technologies
        </h2>
        <p>
          We use essential and performance cookies to maintain site stability, analyze traffic patterns, and provide personalized user experiences. You can adjust your browser settings to refuse cookies or notify you when cookies are sent; however, certain interactive website features may not function optimally without cookies.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          6. Data Retention &amp; Your Legal Rights
        </h2>
        <p>
          We retain your information only as long as necessary to fulfill project contracts and satisfy legal, accounting, or regulatory requirements. Depending on your jurisdiction (including Indian DPDP Act, GDPR, or CCPA standards), you have the right to request access, correction, portability, or deletion of your personal data held by us.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          7. Privacy Queries &amp; Grievance Officer
        </h2>
        <p>
          If you have questions regarding this Privacy Policy or wish to exercise your data protection rights, please contact our designated privacy team at:
        </p>
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1 text-sm font-mono text-white/80">
          <div>Astria &amp; Co. — Privacy Department</div>
          <div>Email: astriacreative.co@gmail.com</div>
          <div>Phone: +91 82784 55700</div>
          <div>Location: Narnaul, Haryana, India (Works remotely worldwide)</div>
        </div>
      </section>
    </LegalPageLayout>
  );
}
