import { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal-page-layout";

export const metadata: Metadata = {
  title: "Copyright & Intellectual Property — Astria & Co.",
  description: "Official Copyright and Intellectual Property Notice for Astria & Co. website, client deliverables, and creative assets.",
};

export default function CopyrightPage() {
  return (
    <LegalPageLayout title="Copyright &amp; Intellectual Property" badge="IP &amp; Ownership">
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          1. Website Copyright Notice
        </h2>
        <p>
          &copy; 2026 Astria &amp; Co. All rights reserved. All proprietary content featured on this website — including website layouts, visual UI designs, custom code, copy, animations, shader effects, branding marks, and graphics — is the exclusive intellectual property of Astria &amp; Co., protected under Indian and international copyright and trademark laws.
        </p>
        <p>
          No portion of this website may be duplicated, reproduced, mirrored, or redistributed without prior written permission from Astria &amp; Co.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          2. Client Deliverables &amp; Commercial Rights Transfer
        </h2>
        <p>
          We pride ourselves on creating bespoke, custom-tailored assets for our clients. The intellectual property transfer rules are defined as follows:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-white/70">
          <li><strong>Full Commercial Ownership:</strong> Upon full and final settlement of all invoiced fees associated with a project, all custom logos, graphic deliverables, website codebases, and video edits crafted specifically for the Client become the Client&apos;s sole commercial property.</li>
          <li><strong>Open-Source &amp; Third-Party Frameworks:</strong> Software code developed using open-source libraries (e.g., React, Next.js, Tailwind CSS, Lucide icons) remains subject to their respective open-source licensing terms (MIT, Apache, etc.).</li>
          <li><strong>Drafts &amp; Unselected Concepts:</strong> Preliminary concepts, alternative logo drafts, rejected wireframes, and exploratory assets that were not chosen for the final deliverable remain the exclusive intellectual property of Astria &amp; Co.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          3. Portfolio &amp; Case Study Showcase Rights
        </h2>
        <p>
          Astria &amp; Co. retains the perpetual, worldwide, non-exclusive right to display approved client work, creative outputs, and measurable case study results across our portfolio, social media channels, and presentation decks for self-promotional and educational purposes, unless an executed Non-Disclosure Agreement (NDA) explicitly provides otherwise.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          4. DMCA / Copyright Infringement Notice Procedure
        </h2>
        <p>
          Astria &amp; Co. respects the intellectual property rights of others. If you believe in good faith that any material or content appearing on our website infringes upon your copyright, please provide a written notification containing:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-white/70">
          <li>Identification of the copyrighted work claimed to have been infringed.</li>
          <li>Identification of the material that is claimed to be infringing and its location (URL) on our site.</li>
          <li>Your contact information, including full name, mailing address, telephone number, and email address.</li>
          <li>A statement that you have a good faith belief that use of the material is not authorized by the copyright owner.</li>
          <li>A physical or electronic signature of the authorized copyright owner or agent.</li>
        </ul>
        <p>Send copyright notices directly to our legal contact address below.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          5. Legal Contact for IP Matters
        </h2>
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1 text-sm font-mono text-white/80">
          <div>Astria &amp; Co. — Legal &amp; Copyright Inquiries</div>
          <div>Email: astriacreative.co@gmail.com</div>
          <div>Phone: +91 82784 55700</div>
          <div>Location: Narnaul, Haryana, India (Works remotely worldwide)</div>
        </div>
      </section>
    </LegalPageLayout>
  );
}
