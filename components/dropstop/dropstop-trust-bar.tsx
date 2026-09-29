import React from "react";

export function DropstopTrustBar() {
  return (
    <div className="border-t border-neutral-200 mt-16 py-6 bg-white text-xs text-neutral-500">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-y-2 gap-x-6">
        <span>✓ Free Pan-India shipping over ₹999</span>
        <span>✓ Cash on Delivery (COD) available</span>
        <span>✓ 7-day exchange guarantee</span>
        <span>✓ Secure checkout</span>
      </div>
    </div>
  );
}
