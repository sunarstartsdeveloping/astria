"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useDropstop } from "./dropstop-context";

export function DropstopCartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartCount,
    subtotal,
    shippingFee,
    finalTotal,
    setIsCheckoutOpen,
  } = useDropstop();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCartOpen(false);
    };
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white border-l border-neutral-200 h-full flex flex-col text-neutral-900 shadow-2xl"
      >
        {/* Cart Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-neutral-700" />
            <h2 id="cart-drawer-title" className="text-base font-medium text-neutral-900">
              Shopping Cart ({cartCount})
            </h2>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-md hover:bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 text-neutral-400">
              <ShoppingBag size={36} className="text-neutral-300 mb-3" />
              <p className="text-sm font-medium text-neutral-700 mb-1">Your cart is empty</p>
              <p className="text-xs text-neutral-400 mb-4">
                Explore our catalog and add items to your cart.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-4 py-2 rounded-md bg-[#567D4A] hover:bg-[#456839] text-white text-xs font-medium transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.variant}`}
                className="flex items-center gap-3.5 pb-4 border-b border-neutral-100 last:border-0"
              >
                {/* Thumbnail */}
                <div className="relative w-16 h-16 rounded-md overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-neutral-900 truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-xs text-neutral-500 mb-1">
                    Option: {item.variant}
                  </p>
                  <span className="text-xs font-medium text-neutral-900">
                    ₹{item.product.price.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Quantity Controls & Remove */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    onClick={() => removeFromCart(item.product.id, item.variant)}
                    className="text-neutral-400 hover:text-red-500 p-1 transition-colors cursor-pointer"
                    title="Remove item"
                    aria-label={`Remove ${item.product.name} from cart`}
                  >
                    <Trash2 size={14} />
                  </button>

                  <div className="flex items-center border border-neutral-200 rounded-md">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.variant, -1)}
                      className="w-6 h-6 flex items-center justify-center text-neutral-600 hover:bg-neutral-50 cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={11} />
                    </button>
                    <span className="w-6 text-center text-xs font-medium text-neutral-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.variant, 1)}
                      className="w-6 h-6 flex items-center justify-center text-neutral-600 hover:bg-neutral-50 cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus size={11} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-neutral-200 bg-neutral-50 space-y-3">
            <div className="space-y-1.5 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-neutral-900 font-medium">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-[#567D4A] font-medium">Free</span>
                  ) : (
                    <span className="text-neutral-900">₹{shippingFee}</span>
                  )}
                </span>
              </div>

              <div className="pt-2 border-t border-neutral-200 flex justify-between text-sm font-medium text-neutral-900">
                <span>Total</span>
                <span className="text-neutral-900">
                  ₹{finalTotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full py-2.5 px-4 rounded-md bg-[#567D4A] hover:bg-[#456839] text-white font-medium text-sm transition-colors cursor-pointer text-center"
            >
              Proceed to checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
