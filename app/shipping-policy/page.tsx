import { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal-page-layout";

export const metadata: Metadata = {
  title: "Digital Delivery Policy",
  description:
    "Official digital delivery timeline and fulfillment terms for web development, design assets, and marketing campaigns from Astria & Co.",
  alternates: {
    canonical: "https://www.astria.co.in/shipping-policy",
  },
};

export default function ShippingPolicyPage() {
  return (
    <LegalPageLayout title="Shipping &amp; Delivery Policy" badge="Fulfillment Policy">
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          1. 100% Digital Service Delivery
        </h2>
        <p>
          Astria &amp; Co. operates as a specialized digital creative and engineering agency. <strong>All services, deliverables, creative assets, websites, and campaigns are digital products delivered exclusively via electronic transmission.</strong> No physical parcels, goods, or paper shipments are dispatched by mail or courier.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          2. Delivery Methods &amp; Platforms
        </h2>
        <p>Deliverables are securely transmitted through industry-standard cloud platforms, including:</p>
        <ul className="list-disc pl-6 space-y-2 text-white/70">
          <li><strong>Code &amp; Web Applications:</strong> Delivered via private GitHub/GitLab repositories, container registries, or direct deployment to hosting networks (Vercel, AWS, Cloudflare, or Client servers).</li>
          <li><strong>Design &amp; Branding Assets:</strong> Provided as vector SVG/EPS files, high-resolution PNG/JPG exports, interactive Figma design workspaces, and Google Drive download links.</li>
          <li><strong>Video &amp; Motion Graphics:</strong> Delivered in 4K/1080p ProRes or H.264 MP4 formats via Frame.io, Dropbox, or Google Drive transfer.</li>
          <li><strong>Marketing &amp; Automation Pipelines:</strong> Configured directly inside the Client&apos;s Meta Business Suite, CRM platforms, and email marketing software.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          3. Estimated Delivery Timelines (Turnaround Times)
        </h2>
        <p>
          Delivery timelines are formally specified in the project Statement of Work (SOW). Standard delivery windows for typical engagements include:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
              Social Creatives &amp; Graphics
            </span>
            <span className="text-lg font-bold text-white block mb-1">2 to 4 Business Days</span>
            <span className="text-xs text-white/60">From receiving creative brief and content inputs.</span>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
              Brand Identity Systems
            </span>
            <span className="text-lg font-bold text-white block mb-1">7 to 14 Business Days</span>
            <span className="text-xs text-white/60">Including logo concept rounds and brand guidelines.</span>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
              High-Converting Funnels
            </span>
            <span className="text-lg font-bold text-white block mb-1">7 to 10 Business Days</span>
            <span className="text-xs text-white/60">Copywriting, visual design, and conversion setup.</span>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
              Full-Stack Web Applications
            </span>
            <span className="text-lg font-bold text-white block mb-1">3 to 6 Weeks</span>
            <span className="text-xs text-white/60">Multi-milestone agile sprints with staging previews.</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          4. Delivery Confirmation &amp; Inspection
        </h2>
        <p>
          Delivery is deemed complete upon transmission of the digital assets or deployment confirmation email sent to the Client&apos;s registered email address.
        </p>
        <p>
          Clients have a standard <strong>seven (7) business days inspection window</strong> from the delivery timestamp to review the work and request adjustments within the agreed project scope.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          5. Shipping Charges &amp; Customs
        </h2>
        <p>
          Because all deliveries occur digitally over the internet, <strong>no shipping fees, courier handling charges, or physical customs duties apply</strong> to any order with Astria &amp; Co.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight border-b border-white/10 pb-2">
          6. Fulfillment Support
        </h2>
        <p>
          For any delivery status queries, access permission updates, or file redelivery requests, reach our fulfillment team at:
        </p>
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1 text-sm font-mono text-white/80">
          <div>Email: astriacreative.co@gmail.com</div>
          <div>Helpline: +91 82784 55700</div>
          <div>Operating Address: Narnaul, Haryana, India (Works remotely worldwide)</div>
        </div>
      </section>
    </LegalPageLayout>
  );
}
