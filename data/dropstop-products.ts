export interface DropstopProduct {
  id: string;
  name: string;
  category: "Apparel" | "Desk & Tech" | "Everyday Carry" | "Lifestyle";
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  variants?: string[];
  inStock: boolean;
  shopifyVariantId?: string;
  razorpayPaymentLinkId?: string;
  cjProductId?: string;
  cjSku?: string;
  cjCostPriceUsd?: number;
  isCjSourced?: boolean;
}

export const DROPSTOP_PRODUCTS: DropstopProduct[] = [
  {
    id: "heavyweight-hoodie",
    name: "Architectural Heavyweight Hoodie",
    category: "Apparel",
    price: 2499,
    originalPrice: 2999,
    rating: 4.8,
    reviewsCount: 38,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=85",
    ],
    description:
      "Heavyweight 450 GSM combed cotton fleece hoodie. Features relaxed drop-shoulder construction, double-lined hood without drawstrings, and subtle tonal embroidery on the rear.",
    features: [
      "450 GSM 100% combed cotton fleece",
      "Double-layered structured hood",
      "Pre-shrunk fabric to prevent post-wash shrinkage",
      "Ribbed cuffs and waistband",
      "Standard relaxed fit",
    ],
    variants: ["Small", "Medium", "Large", "X-Large"],
    inStock: true,
  },
  {
    id: "studio-desk-mat",
    name: "Hex Studio Desk Mat (900 x 400mm)",
    category: "Desk & Tech",
    price: 1299,
    originalPrice: 1599,
    rating: 4.9,
    reviewsCount: 64,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=1000&q=85",
    ],
    description:
      "Wide-format desk mat made with high-density micro-woven tracking fabric and a textured non-slip rubber base. Features reinforced anti-fray stitched perimeter.",
    features: [
      "900mm x 400mm x 4mm surface area",
      "Water-resistant micro-texture coating",
      "Anti-slip natural rubber base",
      "Reinforced edge stitching",
      "Easy to clean with damp cloth",
    ],
    variants: ["Forest Green", "Matte Black", "Neutral Grey"],
    inStock: true,
  },
  {
    id: "vacuum-thermal-tumbler",
    name: "Insulated Thermal Tumbler (500ml)",
    category: "Lifestyle",
    price: 999,
    originalPrice: 1299,
    rating: 4.8,
    reviewsCount: 42,
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=85",
    ],
    description:
      "Double-walled vacuum insulated tumbler crafted from 18/8 food-grade stainless steel. Keeps drinks cold up to 24 hours and hot up to 12 hours with a leak-proof twist lid.",
    features: [
      "500ml capacity",
      "18/8 food-grade stainless steel",
      "BPA-free leak-proof lid",
      "Sweat-free matte powder coat finish",
      "Fits standard cup holders",
    ],
    variants: ["Matte Black", "Forest Green"],
    inStock: true,
  },
  {
    id: "mechanical-keycaps",
    name: "Forest PBT Keycap Set (142 Keys)",
    category: "Desk & Tech",
    price: 1899,
    originalPrice: 2299,
    rating: 4.9,
    reviewsCount: 29,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1000&q=85",
    ],
    description:
      "Dye-sublimated 1.5mm thick PBT keycaps in ergonomic Cherry profile. Resistant to oils and shine over years of daily typing. Fits standard MX layout mechanical keyboards.",
    features: [
      "142-key set (ANSI and ISO layout support)",
      "1.5mm thick PBT walls",
      "Durable dye-sub legends that never fade",
      "Cherry profile ergonomics",
      "Includes keycap puller",
    ],
    variants: ["Standard ANSI"],
    inStock: true,
  },
  {
    id: "weatherproof-sling-bag",
    name: "Everyday Tech Crossbody Sling (4L)",
    category: "Everyday Carry",
    price: 1999,
    originalPrice: 2499,
    rating: 4.8,
    reviewsCount: 51,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=85",
    ],
    description:
      "Compact 4-liter crossbody sling bag crafted with weather-resistant nylon and YKK zippers. Features a padded tablet sleeve, quick-release strap buckle, and internal organization.",
    features: [
      "4-liter carrying capacity",
      "Weather-resistant 500D nylon outer",
      "YKK water-repellent zippers",
      "Quick-release magnetic strap buckle",
      "Fits iPad mini or 8-inch tablet",
    ],
    variants: ["Black", "Olive"],
    inStock: true,
  },
  {
    id: "heavy-cotton-tee",
    name: "Classic Heavyweight Cotton T-Shirt",
    category: "Apparel",
    price: 1199,
    originalPrice: 1499,
    rating: 4.7,
    reviewsCount: 33,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=85",
    ],
    description:
      "240 GSM heavy combed cotton t-shirt with a relaxed cut and 1-inch ribbed collar. Clean silhouette designed to hold its shape after repeated washing.",
    features: [
      "240 GSM combed organic cotton",
      "Reinforced 1-inch neck ribbing",
      "Relaxed regular fit",
      "Pre-shrunk reactive dyed fabric",
      "Clean tagless neck label",
    ],
    variants: ["Small", "Medium", "Large", "X-Large"],
    inStock: true,
  },
  {
    id: "titanium-bolt-pen",
    name: "Titanium Bolt-Action Pen",
    category: "Everyday Carry",
    price: 1499,
    originalPrice: 1899,
    rating: 4.9,
    reviewsCount: 17,
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1569683795645-b62e50fbf103?auto=format&fit=crop&w=1000&q=85",
    ],
    description:
      "Machined titanium body with smooth bolt-action deployment. Compatible with standard Parker-style G2 ink refills. Built with a solid milled pocket clip.",
    features: [
      "Grade 5 machined titanium body",
      "Smooth tactile bolt-action mechanism",
      "Includes Schmidt EasyFlow 9000M black refill",
      "Removable titanium deep-carry pocket clip",
      "Total weight: 34 grams",
    ],
    variants: ["Stonewashed Grey", "Matte Black"],
    inStock: true,
  },
  {
    id: "concrete-desktop-planter",
    name: "Concrete Desktop Planter with Saucer",
    category: "Lifestyle",
    price: 849,
    originalPrice: 1099,
    rating: 4.7,
    reviewsCount: 22,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=1000&q=85",
    ],
    description:
      "Hand-cast architectural concrete planter with drainage hole and matching saucer tray. Includes cork underpads to protect desk surfaces from scratches.",
    features: [
      "Hand-cast high-density concrete",
      "Includes matching drainage saucer",
      "Cork bottom pads to protect desks",
      "Sealed interior to resist moisture stains",
      "Dimensions: 9cm height x 10cm diameter",
    ],
    variants: ["Charcoal Grey", "Natural Cement"],
    inStock: true,
  },
];
