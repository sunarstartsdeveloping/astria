import type { Metadata } from "next";
import { DropstopAdminPanel } from "@/components/dropstop/dropstop-admin-panel";

export const metadata: Metadata = {
  title: "Dropstop Admin — Astria & Co.",
  description: "Private management console for Dropstop store.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <DropstopAdminPanel />;
}
