import type { Metadata } from "next";
import { DropstopAdminPanel } from "@/components/dropstop/dropstop-admin-panel";

export const metadata: Metadata = {
  title: "Admin Portal — Astria & Co.",
  description: "Private management console.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GeneralAdminPage() {
  return <DropstopAdminPanel />;
}
