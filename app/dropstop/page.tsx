import type { Metadata } from "next";
import { DropstopProvider } from "@/components/dropstop/dropstop-context";
import { DropstopHeader } from "@/components/dropstop/dropstop-header";
import { DropstopHero } from "@/components/dropstop/dropstop-hero";
import { DropstopTrustBar } from "@/components/dropstop/dropstop-trust-bar";
import { DropstopProductGrid } from "@/components/dropstop/dropstop-product-grid";
import { DropstopProductModal } from "@/components/dropstop/dropstop-product-modal";
import { DropstopCartDrawer } from "@/components/dropstop/dropstop-cart-drawer";
import { DropstopCheckoutModal } from "@/components/dropstop/dropstop-checkout-modal";
import { DropstopToast } from "@/components/dropstop/dropstop-toast";
import { DropstopFooter } from "@/components/dropstop/dropstop-footer";

export const metadata: Metadata = {
  title: "Dropstop — Shop by Astria & Co.",
  description:
    "Official merchandise, apparel, and desk essentials store by Astria & Co. Pan-India shipping and Cash on Delivery available.",
  alternates: {
    canonical: "https://www.astria.co.in/dropstop",
  },
};

export default function DropstopPage() {
  return (
    <DropstopProvider>
      <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-neutral-900 font-sans selection:bg-[#567D4A] selection:text-white">
        <DropstopHeader />
        <main className="flex-1">
          <DropstopHero />
          <DropstopProductGrid />
          <DropstopTrustBar />
        </main>
        <DropstopFooter />

        {/* Global Modals & Drawers */}
        <DropstopProductModal />
        <DropstopCartDrawer />
        <DropstopCheckoutModal />
        <DropstopToast />
      </div>
    </DropstopProvider>
  );
}
