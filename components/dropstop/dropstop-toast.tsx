"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useDropstop } from "./dropstop-context";

export function DropstopToast() {
  const { toast } = useDropstop();

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-900 text-white text-xs font-normal shadow-md"
    >
      <CheckCircle2 size={14} className="text-[#6E9A60]" />
      <span>{toast}</span>
    </div>
  );
}
