import { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal-page-layout";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description:
    "Official refund and cancellation policy for Astria & Co. digital services, milestone deliverables, project cancellations, and gateway terms.",
  alternates: {
    canonical: "https://www.astria.co.in/refund-policy",
  },
};

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout title="Refund & Cancellation Policy" badge="Payment Terms">
      {/* High-priority 10% deduction callout banner */}
      <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
        <div className="flex items-center gap-2.5 text-amber-300 font-bold text-base">
          <AlertCircle size={20} className="shrink-0 text-amber-400" />
          <span>Notice on Refund Deductions (Fixed 10% Fee)</span>
        </div>
        <p className="text-amber-200/90 text-sm leading-relaxed">
          In the event of an approved refund or project cancellation, the Client will receive the refundable balance with a <strong>mandatory 10% deduction</strong> (90% disbursed to Client). This 10% deduction covers non-refundable third-party costs incurred immediately upon onboarding, specifically <strong>domain purchases/registrations</strong> and <strong>platform/merchant processing fees charged by payment gateways</strong>.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          1. Policy Overview
        </h2>
        <p>
          At Astria &amp; Co., we are dedicated to delivering world-class digital solutions. Because our work involves custom creative design, bespoke software engineering, domain procurement, and digital marketing strategy tailored uniquely to each client, this Refund &amp; Cancellation Policy defines the transparent guidelines governing project cancellations and refund requests.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          2. Mandatory 10% Deduction &amp; Operational Justification
        </h2>
        <p>
          Whenever a refund is approved and processed, a <strong>fixed 10% deduction</strong> is applied to the gross refundable amount. The remaining <strong>90% is disbursed directly</strong> to the client.
        </p>
        <p>
          This 10% deduction is non-negotiable and exists strictly to offset immediate, irreversible out-of-pocket costs incurred by Astria &amp; Co. at the moment of client onboarding:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-5 rounded-2xl bg-[#0E130F] border border-white/10 space-y-2">
            <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider block">
              Reason 1 • Domain Purchase &amp; Registration
            </span>
            <p className="text-sm text-white/80 leading-relaxed">
              Upon project confirmation, custom domain names, DNS records, and web assets are purchased and registered immediately on behalf of the client. Domain registrars (e.g., Cloudflare, Namecheap, GoDaddy) do not permit cancellations or refunds once a domain is secured.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0E130F] border border-white/10 space-y-2">
            <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider block">
              Reason 2 • Payment Gateway &amp; Platform Fees
            </span>
            <p className="text-sm text-white/80 leading-relaxed">
              Payment aggregators (Stripe, Razorpay, or banking partners) charge merchant processing fees, platform service commissions, and banking interchange surcharges on the initial charge as well as during reverse transfers. These gateway processing fees are strictly non-refundable to merchants.
            </p>
          </div>
        </div>

        {/* Calculation Example Box */}
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3 mt-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70">
            Example Calculation (10% Deduction Breakdown)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/10 text-white/50 text-xs">
                <tr>
                  <th className="pb-2">Invoice Amount</th>
                  <th className="pb-2">10% Deduction (Domain &amp; Gateway Fees)</th>
                  <th className="pb-2 text-emerald-400 font-bold">Net Refund Received by Client</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/90">
                <tr>
                  <td className="py-2.5 font-mono">₹10,000 / $500</td>
                  <td className="py-2.5 font-mono text-amber-300">₹1,000 / $50 (10%)</td>
                  <td className="py-2.5 font-mono font-bold text-emerald-300">₹9,000 / $450 (90%)</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-mono">₹50,000 / $2,000</td>
                  <td className="py-2.5 font-mono text-amber-300">₹5,000 / $200 (10%)</td>
                  <td className="py-2.5 font-mono font-bold text-emerald-300">₹45,000 / $1,800 (90%)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          3. Project Cancellation Guidelines
        </h2>
        <p>
          Clients may request to cancel a project or ongoing service agreement under the following conditions:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-white/70">
          <li><strong>Prior to Project Kickoff:</strong> If a cancellation notice is submitted in writing within 48 hours of initial payment and prior to any design, wireframing, or engineering execution, the Client will receive a <strong>90% refund</strong> (the total amount paid less the mandatory 10% deduction for domain registration and payment gateway platform fees).</li>
          <li><strong>During Active Project Phases:</strong> If a project is cancelled while in progress, fees will be prorated based on the completed deliverables and milestones achieved up to the cancellation date, with the mandatory 10% platform/gateway deduction applied to any remaining refundable balance.</li>
          <li><strong>Monthly Retainer Contracts:</strong> Retainer services (e.g., Meta Ads management, continuous video editing) require a written notice of cancellation 14 business days prior to the start of the next billing cycle. Fees for the current active billing cycle already underway are non-refundable.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          4. Refund Eligibility &amp; Non-Refundable Items
        </h2>
        <p>Due to the irreversible nature of custom digital services, the following limitations apply:</p>
        <ul className="list-disc pl-6 space-y-2 text-white/70">
          <li><strong>Delivered &amp; Approved Assets:</strong> Once final website source code, Figma designs, high-resolution vector assets, or production videos are delivered, reviewed, and approved, payments associated with those milestones are strictly non-refundable.</li>
          <li><strong>Third-Party Costs &amp; Ad Spend:</strong> Direct advertising spend remitted to platforms (such as Meta Ads, Google Ads, or TikTok Ads) is managed on the Client&apos;s ad accounts and is entirely non-refundable by Astria &amp; Co. Similarly, specialized third-party software subscriptions, font licenses, or domain purchases acquired on behalf of the client are non-refundable.</li>
          <li><strong>Client Delays:</strong> If a project is stalled or delayed due to a Client&apos;s failure to provide mandatory inputs, content, or approvals for more than 30 consecutive calendar days, the deposit and completed milestones remain non-refundable.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          5. Refund Processing Timeline &amp; Method
        </h2>
        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-300 text-sm">
          <strong>Payment Gateway Turnaround:</strong> Approved refunds (after the mandatory 10% deduction) are initiated within <strong>24 to 48 hours</strong> of verification and typically reflect in your original account within <strong>5 to 7 business days</strong>.
        </div>
        <p>
          All refunds are credited strictly via the <strong>original payment method</strong> used during checkout (e.g., original credit card, debit card, UPI ID, or net banking account) through our authorized payment processors (Stripe, Razorpay, or banking partner). In compliance with anti-money laundering (AML) and banking standards, we cannot issue refunds to alternate third-party bank accounts.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          6. How to Initiate a Request
        </h2>
        <p>
          To request a cancellation or refund, send an official email with your invoice number, project title, and reason for request to:
        </p>
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1 text-sm font-mono text-white/80">
          <div>Subject Line: Refund Request - [Invoice Number] - [Client Name]</div>
          <div>Official Support: astriacreative.co@gmail.com</div>
          <div>Helpline: +91 82784 55700</div>
          <div>Operating Address: Narnaul, Haryana, India (Works remotely worldwide)</div>
        </div>
      </section>
    </LegalPageLayout>
  );
}

