"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { DropstopProduct } from "@/data/dropstop-products";

export interface CartItem {
  product: DropstopProduct;
  quantity: number;
  variant: string;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  notes?: string;
  paymentMethod: "cod" | "upi" | "online";
}

interface DropstopContextType {
  cart: CartItem[];
  addToCart: (product: DropstopProduct, variant?: string, quantity?: number) => void;
  updateQuantity: (productId: string, variant: string, delta: number) => void;
  removeFromCart: (productId: string, variant: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedProduct: DropstopProduct | null;
  setSelectedProduct: (product: DropstopProduct | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  cartCount: number;
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  finalTotal: number;
  freeShippingThreshold: number;
  appliedPromo: { code: string; discountPercent: number } | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  toast: string | null;
  showToast: (msg: string) => void;
  // External Checkout Integration Hooks:
  triggerWhatsAppOrder: (details?: CustomerDetails) => void;
  triggerRazorpayCheckout: (details?: CustomerDetails) => Promise<void>;
  triggerShopifyCheckout: () => void;
}

const DropstopContext = createContext<DropstopContextType | undefined>(undefined);

const STORAGE_KEY = "dropstop_cart_v1";
const FREE_SHIPPING_THRESHOLD = 999;
const STANDARD_SHIPPING_FEE = 99;
const OFFICIAL_WHATSAPP_PHONE = "918278455700";

export function DropstopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<DropstopProduct | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discountPercent: number;
  } | null>(null);

  // Load cart from local storage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage errors
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  const addToCart = (
    product: DropstopProduct,
    variant?: string,
    quantity: number = 1
  ) => {
    const chosenVariant = variant || (product.variants && product.variants[0]) || "Standard";

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.variant === chosenVariant
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, variant: chosenVariant }];
      }
    });

    showToast(`Added "${product.name}" to cart`);
  };

  const updateQuantity = (productId: string, variant: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.variant === variant) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (productId: string, variant: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.variant === variant)
      )
    );
    showToast("Item removed from cart");
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyPromo = (rawCode: string) => {
    const code = rawCode.trim().toUpperCase();
    if (code === "ASTRIA10" || code === "DROP10") {
      setAppliedPromo({ code, discountPercent: 10 });
      return { success: true, message: "10% discount applied" };
    }
    if (code === "SAVE20") {
      setAppliedPromo({ code, discountPercent: 20 });
      return { success: true, message: "20% discount applied" };
    }
    return { success: false, message: "Invalid promo code" };
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  // Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const shippingFee = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const discountAmount = appliedPromo
    ? Math.round((subtotal * appliedPromo.discountPercent) / 100)
    : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  /**
   * =========================================================================
   * CHECKOUT HOOK 1: WhatsApp Direct Order
   * Formats the order summary and sends directly to Astria's WhatsApp
   * =========================================================================
   */
  const triggerWhatsAppOrder = (details?: CustomerDetails) => {
    if (cart.length === 0) return;

    let itemsList = cart
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.product.name}* (${item.variant}) x ${item.quantity} = ₹${(
            item.product.price * item.quantity
          ).toLocaleString("en-IN")}`
      )
      .join("\n");

    let message = `*DROPSTOP ORDER REQUEST* (via astria.co.in/dropstop)\n\n`;
    message += `*Items Ordered:*\n${itemsList}\n\n`;
    message += `*Subtotal:* ₹${subtotal.toLocaleString("en-IN")}\n`;
    if (discountAmount > 0) {
      message += `*Discount (${appliedPromo?.code}):* -₹${discountAmount.toLocaleString("en-IN")}\n`;
    }
    message += `*Shipping:* ${shippingFee === 0 ? "FREE" : `₹${shippingFee}`}\n`;
    message += `*Estimated Total:* *₹${finalTotal.toLocaleString("en-IN")}*\n\n`;

    if (details) {
      message += `*Customer Info:*\n`;
      message += `Name: ${details.name}\n`;
      message += `Phone: ${details.phone}\n`;
      message += `Email: ${details.email || "N/A"}\n`;
      message += `Address: ${details.address}, ${details.city} - ${details.pincode}\n`;
      message += `Payment Preference: ${details.paymentMethod.toUpperCase()}\n`;
      if (details.notes) {
        message += `Notes: ${details.notes}\n`;
      }
    } else {
      message += `_Please confirm availability and share payment link / COD confirmation._`;
    }

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${OFFICIAL_WHATSAPP_PHONE}?text=${encoded}`, "_blank");
  };

  /**
   * =========================================================================
   * CHECKOUT HOOK 2: Razorpay Payment Gateway Integration Hook
   * Drop your Razorpay Key ID in `.env.local` or load Razorpay script:
   * `https://checkout.razorpay.com/v1/checkout.js`
   * =========================================================================
   */
  const triggerRazorpayCheckout = async (details?: CustomerDetails) => {
    // Check if Razorpay script is present
    const hasRazorpay = typeof window !== "undefined" && (window as unknown as { Razorpay: unknown }).Razorpay;

    if (!hasRazorpay) {
      // Graceful fallback to WhatsApp checkout with order details
      showToast("Routing to Express WhatsApp Checkout...");
      triggerWhatsAppOrder(details);
      return;
    }

    /**
     * When ready to link Razorpay:
     * 1. Call your Next.js API route to create an order: `const order = await fetch('/api/razorpay/order', ...)`
     * 2. Open options:
     *    const options = {
     *      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
     *      amount: finalTotal * 100, // paise
     *      currency: "INR",
     *      name: "Dropstop by Astria & Co.",
     *      description: `Order with ${cartCount} items`,
     *      handler: function(response: any) {
     *        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
     *        clearCart();
     *      },
     *      prefill: {
     *        name: details?.name,
     *        email: details?.email,
     *        contact: details?.phone,
     *      },
     *      theme: { color: "#FF462D" },
     *    };
     *    const rzp = new (window as any).Razorpay(options);
     *    rzp.open();
     */
  };

  /**
   * =========================================================================
   * CHECKOUT HOOK 3: Shopify Buy Button / Storefront Cart Hook
   * If connecting Shopify, insert `client.checkout.create(...)` here.
   * =========================================================================
   */
  const triggerShopifyCheckout = () => {
    showToast("Shopify checkout hook ready to link.");
    // Example: window.location.href = `https://your-shop.myshopify.com/cart/${lineItems}`;
  };

  return (
    <DropstopContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        selectedProduct,
        setSelectedProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        cartCount,
        subtotal,
        shippingFee,
        discountAmount,
        finalTotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        appliedPromo,
        applyPromo,
        removePromo,
        toast,
        showToast,
        triggerWhatsAppOrder,
        triggerRazorpayCheckout,
        triggerShopifyCheckout,
      }}
    >
      {children}
    </DropstopContext.Provider>
  );
}

export function useDropstop() {
  const context = useContext(DropstopContext);
  if (!context) {
    throw new Error("useDropstop must be used within a DropstopProvider");
  }
  return context;
}
