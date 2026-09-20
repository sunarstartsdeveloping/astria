import { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal-page-layout";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Official terms and conditions governing digital marketing, web development, and creative service engagements with Astria & Co.",
  alternates: {
    canonical: "https://www.astria.co.in/terms",
  },
};

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms & Conditions" badge="Service Agreement">
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          1. Overview &amp; Acceptance of Terms
        </h2>
        <p>
          Welcome to Astria &amp; Co. (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). These Terms and Conditions govern all contracts, proposals, scope of works, and digital services provided by Astria &amp; Co. to the client (&quot;Client,&quot; &quot;you,&quot; or &quot;your&quot;). By commissioning a project, signing a service agreement, or submitting payment through our authorized payment gateways, you expressly agree to be bound by these terms.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          2. Scope of Services
        </h2>
        <p>
          Astria &amp; Co. is a full-service digital agency providing high-performance creative and technology solutions, including but not limited to:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-white/70">
          <li>Custom Web &amp; Web App Development (Next.js, React, Node.js, headless CMS architecture).</li>
          <li>Graphic Design, Brand Identity Systems, Packaging, and Visual Direction.</li>
          <li>Conversion-Optimized Sales Funnels &amp; Landing Page Architecture.</li>
          <li>Meta Ads &amp; Digital Campaign Management, Creative Strategy, and Media Buying.</li>
          <li>Commercial Video Editing, Motion Graphics, and Short-Form Content Production.</li>
          <li>Marketing Automation, CRM Pipeline Integration, and Workflow Engineering.</li>
        </ul>
        <p>
          Each project scope is formally defined in an individual Project Statement of Work (SOW), Proposal, or Invoice issued to the Client prior to commencement.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          3. Payment Terms &amp; Payment Gateway Processing
        </h2>
        <p>
          Fees for services are structured either as fixed-price project milestones, monthly retainers, or performance-based agreements as detailed in your project proposal:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-white/70">
          <li><strong>Initial Deposit:</strong> Unless otherwise specified in writing, an upfront commencement deposit (typically 50%) is required before project discovery or development begins.</li>
          <li><strong>Milestone Payments:</strong> Interim and balance disbursements are due upon milestone completion or final delivery sign-off.</li>
          <li><strong>Payment Gateway Integration:</strong> Online transactions are processed securely via PCI-DSS certified payment aggregators (such as Stripe, Razorpay, or authorized direct bank wire). Currency conversion and bank handling fees, if any, are the responsibility of the remitting party.</li>
          <li><strong>Late Payments:</strong> Invoices outstanding past 14 calendar days from the due date may incur a late payment service charge of 2% per month or result in temporary suspension of active services or server hosting.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          4. Cancellations, Refunds &amp; Mandatory 10% Deduction Policy
        </h2>
        <p>
          Clients may request project cancellations under the terms established in their Statement of Work and our official policies. In any and all approved refund scenarios, a <strong>mandatory 10% deduction</strong> is applied to the refundable balance, with 90% disbursed to the Client.
        </p>
        <p>
          This 10% deduction is non-negotiable and covers irreversible out-of-pocket costs incurred immediately upon client onboarding, specifically:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-white/70">
          <li><strong>Domain Registrations:</strong> Custom domain names and DNS infrastructure purchased on behalf of the client, which are non-refundable by domain registrars.</li>
          <li><strong>Payment Gateway Platform Fees:</strong> Irreversible transaction processing fees and platform commissions charged by payment gateways (Stripe, Razorpay, etc.) on both initial capture and return transactions.</li>
        </ul>
        <p className="text-sm text-emerald-400">
          For full details on milestone proration, non-refundable deliverables, and refund timelines, please review our complete{" "}
          <a href="/refund-policy" className="underline hover:text-emerald-300 font-semibold">
            Refund &amp; Cancellation Policy &rarr;
          </a>
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          5. Client Responsibilities &amp; Feedback Windows
        </h2>
        <p>
          Timely project delivery requires collaboration. The Client agrees to provide necessary brand assets, copywriting inputs, credentials, and access within agreed timeframes.
        </p>
        <p>
          Following milestone deliverable submission, the Client has a standard <strong>seven (7) business days review period</strong> to request revisions within scope. If no feedback is received within this window, the deliverable will be considered accepted and approved.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          6. Intellectual Property &amp; Ownership Transfer
        </h2>
        <p>
          <strong>Full Ownership to Client:</strong> Upon complete settlement of all agreed project invoices, all custom graphics, final design files, website source code, and deliverables created exclusively for the Client transfer to the Client for unlimited commercial use.
        </p>
        <p>
          <strong>Portfolio &amp; Promotional Rights:</strong> Astria &amp; Co. reserves the perpetual, non-exclusive right to display the completed work, project summaries, and case studies in our portfolio, website, and marketing materials, unless a written Non-Disclosure Agreement (NDA) specifically restricts such publication.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          7. Limitation of Liability &amp; Disclaimers
        </h2>
        <p>
          While we implement industry-leading engineering, marketing, and design standards, Astria &amp; Co. makes no guarantees regarding specific third-party platform algorithm changes, Meta advertising cost-per-click fluctuations, or external market reception.
        </p>
        <p>
          In no event shall Astria &amp; Co.&apos;s aggregate liability arising out of or related to any project exceed the total fees paid by the Client to Astria &amp; Co. under the applicable statement of work.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          8. Governing Law &amp; Jurisdiction
        </h2>
        <p>
          These Terms and any contractual agreements entered into with Astria &amp; Co. shall be governed by and construed in accordance with the laws of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in Narnaul, Haryana, India.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          9. Contact Information
        </h2>
        <p>
          For contractual questions, invoices, or legal inquiries regarding these Terms, contact us at:
        </p>
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1 text-sm font-mono text-white/80">
          <div>Entity: Astria &amp; Co.</div>
          <div>Email: astriacreative.co@gmail.com</div>
          <div>Phone: +91 82784 55700</div>
          <div>Location: Narnaul, Haryana, India (Works remotely worldwide)</div>
        </div>
      </section>
    </LegalPageLayout>
  );
}
