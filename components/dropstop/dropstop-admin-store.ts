import { DropstopProduct, DROPSTOP_PRODUCTS } from "@/data/dropstop-products";
import { CustomerDetails, CartItem } from "./dropstop-context";

export interface StoredOrder {
  id: string;
  date: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "paid" | "cod_pending" | "failed";
  cjOrderId?: string;
  cjTrackingNumber?: string;
  cjFulfillmentStatus?: "unfulfilled" | "pending" | "created" | "shipped";
  cjFulfilledAt?: string;
}

export interface PromoCode {
  code: string;
  discountPercent: number;
  active: boolean;
  usageCount: number;
}

const ORDERS_KEY = "dropstop_admin_orders_v1";
const PRODUCTS_KEY = "dropstop_admin_products_v1";
const PROMOS_KEY = "dropstop_admin_promos_v1";
const PIN_KEY = "dropstop_admin_pin_v1";

export const DEFAULT_ADMIN_PIN = "astria2026";

// Initial seed orders for demonstration
export const INITIAL_ORDERS: StoredOrder[] = [
  {
    id: "ORD-948212",
    date: new Date(Date.now() - 3600000 * 2).toISOString(),
    customer: {
      name: "Rohan Verma",
      phone: "+91 98112 45890",
      email: "rohan.verma@example.com",
      address: "B-402, Cyber Heights, Sector 54",
      city: "Gurugram",
      pincode: "122002",
      paymentMethod: "cod",
    },
    items: [
      {
        product: DROPSTOP_PRODUCTS[0],
        variant: "Large",
        quantity: 1,
      },
    ],
    subtotal: 2499,
    shipping: 0,
    total: 2499,
    status: "pending",
    paymentStatus: "cod_pending",
  },
  {
    id: "ORD-839104",
    date: new Date(Date.now() - 3600000 * 18).toISOString(),
    customer: {
      name: "Ananya Deshmukh",
      phone: "+91 98201 77312",
      email: "ananya.d@example.com",
      address: "14/A Seagull Apts, Bandra West",
      city: "Mumbai",
      pincode: "400050",
      paymentMethod: "online",
    },
    items: [
      {
        product: DROPSTOP_PRODUCTS[1],
        variant: "Forest Green",
        quantity: 1,
      },
      {
        product: DROPSTOP_PRODUCTS[2],
        variant: "Matte Black",
        quantity: 1,
      },
    ],
    subtotal: 2298,
    shipping: 0,
    total: 2298,
    status: "processing",
    paymentStatus: "paid",
  },
  {
    id: "ORD-719302",
    date: new Date(Date.now() - 3600000 * 48).toISOString(),
    customer: {
      name: "Siddharth Rao",
      phone: "+91 99014 38291",
      email: "sid.rao@example.com",
      address: "88 4th Cross, Indiranagar",
      city: "Bengaluru",
      pincode: "560038",
      paymentMethod: "online",
    },
    items: [
      {
        product: DROPSTOP_PRODUCTS[3],
        variant: "Standard ANSI",
        quantity: 1,
      },
    ],
    subtotal: 1899,
    shipping: 0,
    total: 1899,
    status: "shipped",
    paymentStatus: "paid",
  },
  {
    id: "ORD-628190",
    date: new Date(Date.now() - 3600000 * 96).toISOString(),
    customer: {
      name: "Pooja Sharma",
      phone: "+91 98721 55670",
      email: "pooja.sharma@example.com",
      address: "Plot 12, Civil Lines",
      city: "Narnaul",
      pincode: "123001",
      paymentMethod: "cod",
    },
    items: [
      {
        product: DROPSTOP_PRODUCTS[5],
        variant: "Medium",
        quantity: 2,
      },
    ],
    subtotal: 2398,
    shipping: 0,
    total: 2398,
    status: "delivered",
    paymentStatus: "paid",
  },
];

export const INITIAL_PROMOS: PromoCode[] = [
  { code: "DROP10", discountPercent: 10, active: true, usageCount: 14 },
  { code: "SAVE20", discountPercent: 20, active: true, usageCount: 6 },
  { code: "ASTRIAVIP", discountPercent: 15, active: true, usageCount: 3 },
];

export function getStoredOrders(): StoredOrder[] {
  if (typeof window === "undefined") return INITIAL_ORDERS;
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ORDERS;
  }
}

export function saveOrderToStore(order: StoredOrder) {
  if (typeof window === "undefined") return;
  try {
    const current = getStoredOrders();
    const updated = [order, ...current];
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage quota errors
  }
}

export function updateOrderStatus(orderId: string, status: StoredOrder["status"]) {
  if (typeof window === "undefined") return;
  try {
    const current = getStoredOrders();
    const updated = current.map((ord) =>
      ord.id === orderId ? { ...ord, status } : ord
    );
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
  } catch {
    // Ignore
  }
}

export function updateOrderCjFulfillment(
  orderId: string,
  cjOrderId: string,
  trackingNumber?: string
) {
  if (typeof window === "undefined") return;
  try {
    const current = getStoredOrders();
    const updated = current.map((ord) =>
      ord.id === orderId
        ? {
            ...ord,
            status: "processing" as const,
            cjOrderId,
            cjTrackingNumber: trackingNumber || ord.cjTrackingNumber,
            cjFulfillmentStatus: "created" as const,
            cjFulfilledAt: new Date().toISOString(),
          }
        : ord
    );
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
  } catch {
    // Ignore
  }
}

export function getStoredProducts(): DropstopProduct[] {
  if (typeof window === "undefined") return DROPSTOP_PRODUCTS;
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (!raw) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(DROPSTOP_PRODUCTS));
      return DROPSTOP_PRODUCTS;
    }
    return JSON.parse(raw);
  } catch {
    return DROPSTOP_PRODUCTS;
  }
}

export function saveProductsToStore(products: DropstopProduct[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  } catch {
    // Ignore
  }
}

export function getStoredPromos(): PromoCode[] {
  if (typeof window === "undefined") return INITIAL_PROMOS;
  try {
    const raw = localStorage.getItem(PROMOS_KEY);
    if (!raw) {
      localStorage.setItem(PROMOS_KEY, JSON.stringify(INITIAL_PROMOS));
      return INITIAL_PROMOS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_PROMOS;
  }
}

export function savePromosToStore(promos: PromoCode[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROMOS_KEY, JSON.stringify(promos));
  } catch {
    // Ignore
  }
}

export function getAdminPin(): string {
  if (typeof window === "undefined") return DEFAULT_ADMIN_PIN;
  return localStorage.getItem(PIN_KEY) || DEFAULT_ADMIN_PIN;
}

export function setAdminPin(newPin: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PIN_KEY, newPin);
}
