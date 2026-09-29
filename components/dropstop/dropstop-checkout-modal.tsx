"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, Lock } from "lucide-react";
import { useDropstop, CustomerDetails } from "./dropstop-context";
import { saveOrderToStore, StoredOrder } from "./dropstop-admin-store";
import { sendOrderToGoogleSheet } from "./dropstop-google-sheets";

export function DropstopCheckoutModal() {
  const {
    cart,
    subtotal,
    clearCart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartCount,
    shippingFee,
    finalTotal,
    triggerWhatsAppOrder,
    triggerRazorpayCheckout,
  } = useDropstop();

  const [formData, setFormData] = useState<CustomerDetails>({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    notes: "",
    paymentMethod: "cod",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSubmitting) setIsCheckoutOpen(false);
    };
    if (isCheckoutOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCheckoutOpen, isSubmitting, setIsCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedOrderId(orderId);

    const newOrder: StoredOrder = {
      id: orderId,
      date: new Date().toISOString(),
      customer: formData,
      items: [...cart],
      subtotal,
      shipping: shippingFee,
      total: finalTotal,
      status: "pending",
      paymentStatus: formData.paymentMethod === "cod" ? "cod_pending" : "paid",
    };
    saveOrderToStore(newOrder);
    // Background sync to Google Sheets if connected
    sendOrderToGoogleSheet(newOrder).catch((err) => {
      console.warn("Google Sheets background sync skipped or failed:", err);
    });

    setTimeout(async () => {
      setIsSubmitting(false);
      setOrderConfirmed(true);

      if (formData.paymentMethod === "online") {
        await triggerRazorpayCheckout(formData);
      }
    }, 500);
  };

  const handleFinishAndReset = () => {
    clearCart();
    setOrderConfirmed(false);
    setIsCheckoutOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto"
      onClick={() => {
        if (!isSubmitting) setIsCheckoutOpen(false);
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-white border border-neutral-200 rounded-lg shadow-xl overflow-hidden my-auto max-h-[90vh] flex flex-col text-neutral-900"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2">
            <Lock size={16} className="text-neutral-600" />
            <h2 id="checkout-modal-title" className="text-base font-medium text-neutral-900">
              {orderConfirmed ? "Order Confirmation" : "Checkout"}
            </h2>
          </div>

          <button
            onClick={() => {
              if (orderConfirmed) handleFinishAndReset();
              else setIsCheckoutOpen(false);
            }}
            className="w-8 h-8 rounded-md hover:bg-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {orderConfirmed ? (
            /* Order Success State */
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#567D4A] flex items-center justify-center mx-auto">
                <CheckCircle2 size={28} />
              </div>

              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-1">
                  Thank you for your order!
                </h3>
                <p className="text-xs text-neutral-500">
                  Your order reference is <strong className="text-neutral-800">{confirmedOrderId}</strong>. We will process your shipment shortly.
                </p>
              </div>

              <div className="p-3.5 rounded-md bg-neutral-50 border border-neutral-200 max-w-sm mx-auto text-left space-y-1.5 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Ship to:</span>
                  <span className="text-neutral-900 font-medium">
                    {formData.name}, {formData.city}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Payment:</span>
                  <span className="text-neutral-900 uppercase">
                    {formData.paymentMethod === "cod" ? "Cash on Delivery" : "Online / UPI"}
                  </span>
                </div>
                <div className="flex justify-between pt-1 border-t border-neutral-200 font-medium text-neutral-900">
                  <span>Total:</span>
                  <span>₹{finalTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="pt-2 max-w-sm mx-auto space-y-2">
                <button
                  onClick={() => triggerWhatsAppOrder(formData)}
                  className="w-full py-2 px-3 rounded-md bg-[#25D366] hover:bg-[#20ba5a] text-black text-xs font-medium transition-colors cursor-pointer"
                >
                  Send Order Details to WhatsApp
                </button>

                <button
                  onClick={handleFinishAndReset}
                  className="w-full py-2 px-3 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-medium transition-colors cursor-pointer"
                >
                  Back to Shop
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2.5">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-neutral-600 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border border-neutral-300 rounded-md px-3 py-2 text-xs text-neutral-900 outline-none focus:border-[#567D4A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-600 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 Mobile number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border border-neutral-300 rounded-md px-3 py-2 text-xs text-neutral-900 outline-none focus:border-[#567D4A]"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block text-xs text-neutral-600 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-neutral-300 rounded-md px-3 py-2 text-xs text-neutral-900 outline-none focus:border-[#567D4A]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2.5">
                  Shipping Address
                </h3>
                <div>
                  <label className="block text-xs text-neutral-600 mb-1">
                    Street Address / Flat *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder="House/Plot no., Street name, Area"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full border border-neutral-300 rounded-md px-3 py-2 text-xs text-neutral-900 outline-none focus:border-[#567D4A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="block text-xs text-neutral-600 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="City / Town"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full border border-neutral-300 rounded-md px-3 py-2 text-xs text-neutral-900 outline-none focus:border-[#567D4A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-600 mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      maxLength={6}
                      placeholder="6-digit PIN"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full border border-neutral-300 rounded-md px-3 py-2 text-xs text-neutral-900 outline-none focus:border-[#567D4A]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2.5">
                  Payment Method
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex items-center gap-2 p-3 rounded-md border text-xs cursor-pointer ${
                      formData.paymentMethod === "cod"
                        ? "border-[#567D4A] bg-[#567D4A]/5 font-medium text-neutral-900"
                        : "border-neutral-200 text-neutral-600"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleInputChange}
                      className="accent-[#567D4A]"
                    />
                    <span>Cash on Delivery (COD)</span>
                  </label>

                  <label
                    className={`flex items-center gap-2 p-3 rounded-md border text-xs cursor-pointer ${
                      formData.paymentMethod === "online"
                        ? "border-[#567D4A] bg-[#567D4A]/5 font-medium text-neutral-900"
                        : "border-neutral-200 text-neutral-600"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={formData.paymentMethod === "online"}
                      onChange={handleInputChange}
                      className="accent-[#567D4A]"
                    />
                    <span>UPI / Online Payment</span>
                  </label>
                </div>
              </div>

              {/* Bill summary row */}
              <div className="pt-2 border-t border-neutral-200 flex justify-between items-center text-sm">
                <span className="text-neutral-600">Total Amount:</span>
                <span className="font-medium text-neutral-900 text-base">
                  ₹{finalTotal.toLocaleString("en-IN")}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 rounded-md bg-[#567D4A] hover:bg-[#456839] text-white font-medium text-sm transition-colors cursor-pointer text-center disabled:opacity-50"
              >
                {isSubmitting ? "Placing Order..." : `Place Order (₹${finalTotal.toLocaleString("en-IN")})`}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
