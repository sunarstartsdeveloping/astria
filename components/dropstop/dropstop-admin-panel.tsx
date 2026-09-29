"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Lock,
  Unlock,
  Package,
  ShoppingCart,
  TrendingUp,
  Tag,
  Settings,
  Search,
  ExternalLink,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  Truck,
  AlertCircle,
  Download,
  KeyRound,
  LogOut,
  X,
  Phone,
  ArrowRight,
  Eye,
  Database,
  Copy,
  Check,
  RefreshCw,
  FileSpreadsheet,
  Globe,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { DropstopProduct, DROPSTOP_PRODUCTS } from "@/data/dropstop-products";
import {
  StoredOrder,
  PromoCode,
  getStoredOrders,
  updateOrderStatus,
  getStoredProducts,
  saveProductsToStore,
  getStoredPromos,
  savePromosToStore,
  getAdminPin,
  setAdminPin,
  DEFAULT_ADMIN_PIN,
} from "./dropstop-admin-store";
import {
  getGoogleSheetsWebhookUrl,
  setGoogleSheetsWebhookUrl,
  syncAllOrdersToGoogleSheet,
  testGoogleSheetConnection,
  validateGoogleSheetsUrl,
  getDirectBrowserTestUrl,
  GOOGLE_APPS_SCRIPT_CODE,
} from "./dropstop-google-sheets";
import { DropstopCjPanel } from "./dropstop-cj-panel";

export function DropstopAdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "products" | "promos" | "sheets" | "cjdropshipping" | "settings">("overview");

  // Data states
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [products, setProducts] = useState<DropstopProduct[]>([]);
  const [promos, setPromos] = useState<PromoCode[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<StoredOrder | null>(null);

  // Google Sheets integration state
  const [gsheetUrl, setGsheetUrl] = useState("");
  const [gsheetSaveMessage, setGsheetSaveMessage] = useState("");
  const [isTestingGsheet, setIsTestingGsheet] = useState(false);
  const [testGsheetResult, setTestGsheetResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isSyncingGsheet, setIsSyncingGsheet] = useState(false);
  const [syncGsheetResult, setSyncGsheetResult] = useState("");
  const [copiedScript, setCopiedScript] = useState(false);

  // New product modal state
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<DropstopProduct>>({
    name: "",
    category: "Apparel",
    price: 999,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=85",
    description: "",
    features: ["100% Quality inspected", "Fast Pan-India dispatch"],
    variants: ["Small", "Medium", "Large"],
    inStock: true,
    rating: 4.8,
    reviewsCount: 1,
  });

  // New promo state
  const [newPromoCode, setNewPromoCode] = useState("");
  const [newPromoDiscount, setNewPromoDiscount] = useState(15);

  // New PIN state
  const [newPinInput, setNewPinInput] = useState("");
  const [pinUpdateMessage, setPinUpdateMessage] = useState("");

  // Check session storage on mount
  useEffect(() => {
    try {
      const auth = sessionStorage.getItem("dropstop_admin_auth");
      if (auth === "true") {
        setIsAuthenticated(true);
      }
    } catch {
      // Ignore
    }
    loadData();
  }, []);

  const loadData = () => {
    setOrders(getStoredOrders());
    setProducts(getStoredProducts());
    setPromos(getStoredPromos());
    setGsheetUrl(getGoogleSheetsWebhookUrl());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = getAdminPin();
    if (pinInput.trim() === correctPin || pinInput.trim() === DEFAULT_ADMIN_PIN) {
      setIsAuthenticated(true);
      setPinError("");
      try {
        sessionStorage.setItem("dropstop_admin_auth", "true");
      } catch {
        // Ignore
      }
    } else {
      setPinError("Invalid passcode. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPinInput("");
    try {
      sessionStorage.removeItem("dropstop_admin_auth");
    } catch {
      // Ignore
    }
  };

  // Metrics calculations
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const pendingOrders = orders.filter((ord) => ord.status === "pending").length;
  const inStockCount = products.filter((p) => p.inStock).length;
  const avgOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;

  // Order status update
  const handleStatusChange = (orderId: string, newStatus: StoredOrder["status"]) => {
    updateOrderStatus(orderId, newStatus);
    setOrders(getStoredOrders());
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  // Product toggle in stock
  const handleToggleStock = (productId: string) => {
    const updated = products.map((p) =>
      p.id === productId ? { ...p, inStock: !p.inStock } : p
    );
    setProducts(updated);
    saveProductsToStore(updated);
  };

  // Delete product
  const handleDeleteProduct = (productId: string) => {
    if (confirm("Are you sure you want to remove this product?")) {
      const updated = products.filter((p) => p.id !== productId);
      setProducts(updated);
      saveProductsToStore(updated);
    }
  };

  // Create product
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const created: DropstopProduct = {
      id: `prod-${Date.now()}`,
      name: newProduct.name,
      category: (newProduct.category as DropstopProduct["category"]) || "Apparel",
      price: Number(newProduct.price),
      originalPrice: newProduct.originalPrice ? Number(newProduct.originalPrice) : undefined,
      rating: 4.9,
      reviewsCount: 1,
      image: newProduct.image || "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=85",
      gallery: [newProduct.image || "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=85"],
      description: newProduct.description || "Official quality product by Astria & Co.",
      features: newProduct.features || ["100% Quality guaranteed"],
      variants: newProduct.variants || ["Standard"],
      inStock: true,
    };

    const updated = [created, ...products];
    setProducts(updated);
    saveProductsToStore(updated);
    setIsAddProductOpen(false);
    setNewProduct({
      name: "",
      category: "Apparel",
      price: 999,
      originalPrice: 1299,
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=85",
      description: "",
      features: ["100% Quality inspected", "Fast dispatch"],
      variants: ["Standard"],
      inStock: true,
    });
  };

  // Add promo
  const handleAddPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromoCode) return;
    const code = newPromoCode.trim().toUpperCase();
    const updated = [
      { code, discountPercent: Number(newPromoDiscount), active: true, usageCount: 0 },
      ...promos,
    ];
    setPromos(updated);
    savePromosToStore(updated);
    setNewPromoCode("");
  };

  // Toggle promo
  const handleTogglePromo = (code: string) => {
    const updated = promos.map((p) =>
      p.code === code ? { ...p, active: !p.active } : p
    );
    setPromos(updated);
    savePromosToStore(updated);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = "Order ID,Date,Customer Name,Phone,Email,City,PIN,Payment Method,Status,Total (INR)\n";
    const rows = orders
      .map(
        (o) =>
          `"${o.id}","${o.date.split("T")[0]}","${o.customer.name}","${o.customer.phone}","${o.customer.email || ""}","${o.customer.city}","${o.customer.pincode}","${o.customer.paymentMethod}","${o.status}",${o.total}`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dropstop_orders_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  // Update PIN
  const handleUpdatePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPinInput.length < 4) {
      setPinUpdateMessage("Passcode must be at least 4 characters.");
      return;
    }
    setAdminPin(newPinInput);
    setNewPinInput("");
    setPinUpdateMessage("Passcode updated successfully!");
    setTimeout(() => setPinUpdateMessage(""), 3000);
  };

  // Google Sheets Handlers
  const handleSaveGsheetUrl = (e: React.FormEvent) => {
    e.preventDefault();
    setGoogleSheetsWebhookUrl(gsheetUrl);
    setGsheetSaveMessage("Webhook URL saved successfully!");
    setTimeout(() => setGsheetSaveMessage(""), 3000);
  };

  const handleTestGsheetConnection = async () => {
    if (!gsheetUrl) {
      setTestGsheetResult({ success: false, message: "Please enter and save a Webhook URL first." });
      return;
    }
    setIsTestingGsheet(true);
    setTestGsheetResult(null);
    const res = await testGoogleSheetConnection(gsheetUrl);
    setTestGsheetResult(res);
    setIsTestingGsheet(false);
  };

  const handleSyncAllToGsheet = async () => {
    if (!gsheetUrl) {
      setSyncGsheetResult("Please configure a Google Sheets Webhook URL first.");
      return;
    }
    setIsSyncingGsheet(true);
    setSyncGsheetResult("");
    const res = await syncAllOrdersToGoogleSheet(orders);
    if (res.success) {
      setSyncGsheetResult(`Successfully synced ${res.count} orders to your Google Sheet!`);
    } else {
      setSyncGsheetResult(res.error || "Failed to sync orders. Check Webhook URL.");
    }
    setIsSyncingGsheet(false);
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  // WhatsApp Customer notification
  const handleWhatsAppCustomer = (order: StoredOrder) => {
    const cleanPhone = order.customer.phone.replace(/[^0-9]/g, "");
    const formattedPhone = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;
    const message = `Hi ${order.customer.name}, this is Astria & Co. confirming your Dropstop order ${order.id}. Total amount: ₹${order.total.toLocaleString("en-IN")} (${order.customer.paymentMethod.toUpperCase()}). We are preparing your shipment for dispatch. Let us know if you have any questions!`;
    window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  // --------------------------------------------------------------------------
  // RENDER: Passcode Gate Screen if unauthenticated
  // --------------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F4F4F5] flex items-center justify-center p-4 text-neutral-900 font-sans">
        <div className="w-full max-w-sm bg-white border border-neutral-200 rounded-lg p-6 sm:p-8 shadow-sm text-center">
          <div className="w-12 h-12 rounded-full bg-[#567D4A]/10 text-[#567D4A] flex items-center justify-center mx-auto mb-4">
            <Lock size={22} />
          </div>

          <h1 className="text-xl font-medium text-neutral-900 mb-1">
            Dropstop Admin
          </h1>
          <p className="text-xs text-neutral-500 mb-6">
            Private management console for Astria &amp; Co.
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Enter Admin Passcode
              </label>
              <input
                type="password"
                required
                autoFocus
                placeholder="Passcode"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError("");
                }}
                className="w-full border border-neutral-300 focus:border-[#567D4A] rounded-md px-3 py-2 text-sm outline-none"
              />
              {pinError && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle size={12} />
                  <span>{pinError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-md bg-[#567D4A] hover:bg-[#456839] text-white text-xs font-medium transition-colors cursor-pointer text-center"
            >
              Unlock Dashboard
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
            <span>Astria &amp; Co.</span>
            <button
              type="button"
              onClick={() => setPinInput(DEFAULT_ADMIN_PIN)}
              className="text-[#567D4A] hover:underline cursor-pointer"
            >
              Use default PIN
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // RENDER: Full Admin Dashboard
  // --------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#F4F4F5] text-neutral-900 font-sans flex flex-col">
      {/* Top Admin Navbar */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-30">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-base font-semibold text-neutral-900 flex items-center gap-1.5">
              <span>Dropstop Admin</span>
              <span className="text-xs font-normal text-neutral-400">• Astria &amp; Co.</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Store
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/dropstop"
              target="_blank"
              className="inline-flex items-center gap-1 text-xs text-neutral-600 hover:text-neutral-900 px-3 py-1.5 rounded-md hover:bg-neutral-100 transition-colors"
            >
              <span>View Storefront</span>
              <ExternalLink size={13} />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-red-600 px-3 py-1.5 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
              title="Lock Admin"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Lock</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto text-xs font-medium border-t border-neutral-100">
          {[
            { id: "overview", label: "Dashboard", icon: TrendingUp },
            { id: "orders", label: `Orders (${orders.length})`, icon: ShoppingCart },
            { id: "products", label: `Inventory (${products.length})`, icon: Package },
            { id: "promos", label: `Promos (${promos.length})`, icon: Tag },
            { id: "cjdropshipping", label: "CJ Dropshipping", icon: Globe },
            { id: "sheets", label: "Google Sheets", icon: FileSpreadsheet },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`py-3 px-3 sm:px-4 border-b-2 font-medium flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? "border-[#567D4A] text-[#567D4A]"
                    : "border-transparent text-neutral-500 hover:text-neutral-900"
                }`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Body Content */}
      <main className="flex-1 max-w-[1240px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* ---------------- TAB 1: OVERVIEW ---------------- */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 sm:p-5 rounded-lg border border-neutral-200">
                <span className="text-xs text-neutral-500 block mb-1">Total Revenue</span>
                <span className="text-xl sm:text-2xl font-semibold text-neutral-900">
                  ₹{totalRevenue.toLocaleString("en-IN")}
                </span>
                <span className="text-[11px] text-emerald-600 block mt-1">
                  Across {orders.length} orders
                </span>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-lg border border-neutral-200">
                <span className="text-xs text-neutral-500 block mb-1">Pending Orders</span>
                <span className="text-xl sm:text-2xl font-semibold text-neutral-900">
                  {pendingOrders}
                </span>
                <span className="text-[11px] text-amber-600 block mt-1">
                  Needs fulfillment
                </span>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-lg border border-neutral-200">
                <span className="text-xs text-neutral-500 block mb-1">Average Order</span>
                <span className="text-xl sm:text-2xl font-semibold text-neutral-900">
                  ₹{avgOrderValue.toLocaleString("en-IN")}
                </span>
                <span className="text-[11px] text-neutral-400 block mt-1">
                  Pan-India AOV
                </span>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-lg border border-neutral-200">
                <span className="text-xs text-neutral-500 block mb-1">Active Products</span>
                <span className="text-xl sm:text-2xl font-semibold text-neutral-900">
                  {inStockCount} / {products.length}
                </span>
                <span className="text-[11px] text-neutral-400 block mt-1">
                  In stock &amp; listed
                </span>
              </div>
            </div>

            {/* Recent Orders table preview */}
            <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
              <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-neutral-900">Recent Customer Orders</h3>
                  <p className="text-xs text-neutral-500">Orders placed on Dropstop</p>
                </div>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="text-xs text-[#567D4A] hover:underline font-medium cursor-pointer"
                >
                  View All Orders &rarr;
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-neutral-600">
                  <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-medium">
                    <tr>
                      <th className="py-2.5 px-4">Order ID</th>
                      <th className="py-2.5 px-4">Customer</th>
                      <th className="py-2.5 px-4">Items</th>
                      <th className="py-2.5 px-4">Total</th>
                      <th className="py-2.5 px-4">Payment</th>
                      <th className="py-2.5 px-4">Status</th>
                      <th className="py-2.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-neutral-50/70 transition-colors">
                        <td className="py-3 px-4 font-mono font-medium text-neutral-900">
                          {order.id}
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-medium text-neutral-900 block">
                            {order.customer.name}
                          </span>
                          <span className="text-[11px] text-neutral-400">
                            {order.customer.city}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {order.items.map((it) => it.product.name).join(", ")}
                        </td>
                        <td className="py-3 px-4 font-medium text-neutral-900">
                          ₹{order.total.toLocaleString("en-IN")}
                        </td>
                        <td className="py-3 px-4">
                          <span className="uppercase text-[10px] font-semibold px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                            {order.customer.paymentMethod}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium ${
                              order.status === "pending"
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : order.status === "processing"
                                ? "bg-sky-50 text-sky-700 border border-sky-200"
                                : order.status === "shipped"
                                ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                                : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="text-neutral-500 hover:text-neutral-900 cursor-pointer p-1"
                            title="View Details"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            onClick={() => handleWhatsAppCustomer(order)}
                            className="text-[#25D366] hover:text-[#1da851] cursor-pointer p-1"
                            title="WhatsApp Customer"
                          >
                            <WhatsAppIcon className="w-3.5 h-3.5 inline" fill="currentColor" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- TAB 2: ORDERS ---------------- */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search order ID, customer, city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-neutral-200 rounded-md outline-none focus:border-[#567D4A]"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-white hover:bg-neutral-50 border border-neutral-200 rounded-md text-neutral-700 cursor-pointer"
                >
                  <Download size={14} />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-neutral-600">
                  <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-medium">
                    <tr>
                      <th className="py-3 px-4">Order ID &amp; Date</th>
                      <th className="py-3 px-4">Customer Details</th>
                      <th className="py-3 px-4">Delivery Address</th>
                      <th className="py-3 px-4">Items Ordered</th>
                      <th className="py-3 px-4">Total Amount</th>
                      <th className="py-3 px-4">Payment</th>
                      <th className="py-3 px-4">Change Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {orders
                      .filter((o) => {
                        const q = searchQuery.toLowerCase();
                        return (
                          o.id.toLowerCase().includes(q) ||
                          o.customer.name.toLowerCase().includes(q) ||
                          o.customer.city.toLowerCase().includes(q) ||
                          o.customer.phone.includes(q)
                        );
                      })
                      .map((order) => (
                        <tr key={order.id} className="hover:bg-neutral-50/60 transition-colors">
                          <td className="py-3 px-4">
                            <span className="font-mono font-medium text-neutral-900 block">
                              {order.id}
                            </span>
                            <span className="text-[11px] text-neutral-400">
                              {new Date(order.date).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                              })}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-medium text-neutral-900 block">
                              {order.customer.name}
                            </span>
                            <span className="text-[11px] text-neutral-500 font-mono">
                              {order.customer.phone}
                            </span>
                          </td>
                          <td className="py-3 px-4 max-w-[180px]">
                            <span className="truncate block text-neutral-700">
                              {order.customer.address}
                            </span>
                            <span className="text-[11px] text-neutral-400">
                              {order.customer.city} ({order.customer.pincode})
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {order.items.map((it, idx) => (
                              <div key={idx} className="text-neutral-700">
                                {it.quantity}x {it.product.name} ({it.variant})
                              </div>
                            ))}
                          </td>
                          <td className="py-3 px-4 font-medium text-neutral-900 whitespace-nowrap">
                            ₹{order.total.toLocaleString("en-IN")}
                          </td>
                          <td className="py-3 px-4">
                            <span className="uppercase text-[10px] font-semibold px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                              {order.customer.paymentMethod}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={order.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  order.id,
                                  e.target.value as StoredOrder["status"]
                                )
                              }
                              className="text-xs bg-white border border-neutral-300 rounded px-2 py-1 outline-none font-medium cursor-pointer"
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 rounded text-neutral-700 transition-colors cursor-pointer"
                              title="View Full Order"
                            >
                              Details
                            </button>
                            <button
                              onClick={() => handleWhatsAppCustomer(order)}
                              className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded transition-colors cursor-pointer inline-flex items-center gap-1"
                              title="Notify customer via WhatsApp"
                            >
                              <WhatsAppIcon className="w-3 h-3" fill="currentColor" />
                              <span>WhatsApp</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- TAB 3: PRODUCTS ---------------- */}
        {activeTab === "products" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-neutral-900">Inventory Catalog</h3>
                <p className="text-xs text-neutral-500">
                  Toggle stock status or add new products. Changes update the live storefront.
                </p>
              </div>

              <button
                onClick={() => setIsAddProductOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#567D4A] hover:bg-[#456839] text-white text-xs font-medium rounded-md transition-colors cursor-pointer"
              >
                <Plus size={15} />
                <span>Add Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-neutral-200 rounded-lg overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative aspect-square w-full bg-neutral-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="250px"
                      className="object-cover"
                    />
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center">
                        <span className="px-2 py-1 rounded bg-red-600 text-white text-xs font-medium">
                          OUT OF STOCK
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-0.5">
                        {product.category}
                      </span>
                      <h4 className="text-xs font-medium text-neutral-900 line-clamp-1">
                        {product.name}
                      </h4>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-xs font-semibold text-neutral-900">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[11px] text-neutral-400 line-through">
                            ₹{product.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleToggleStock(product.id)}
                        className={`text-xs px-2.5 py-1 rounded border font-medium cursor-pointer transition-colors ${
                          product.inStock
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                            : "bg-neutral-100 text-neutral-600 border-neutral-200 hover:bg-neutral-200"
                        }`}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </button>

                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-neutral-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                        title="Delete product"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- TAB 4: PROMO CODES ---------------- */}
        {activeTab === "promos" && (
          <div className="space-y-6 max-w-2xl">
            {/* Create Promo Code */}
            <div className="bg-white p-5 rounded-lg border border-neutral-200">
              <h3 className="text-sm font-medium text-neutral-900 mb-1">Create Discount Code</h3>
              <p className="text-xs text-neutral-500 mb-4">
                Customers can apply these promo codes during cart checkout.
              </p>

              <form onSubmit={handleAddPromo} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  required
                  placeholder="Coupon code (e.g. VIP25)"
                  value={newPromoCode}
                  onChange={(e) => setNewPromoCode(e.target.value.toUpperCase())}
                  className="flex-1 bg-white border border-neutral-300 rounded-md px-3 py-2 text-xs uppercase font-mono outline-none focus:border-[#567D4A]"
                />

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="90"
                    required
                    value={newPromoDiscount}
                    onChange={(e) => setNewPromoDiscount(Number(e.target.value))}
                    className="w-20 bg-white border border-neutral-300 rounded-md px-3 py-2 text-xs outline-none focus:border-[#567D4A]"
                  />
                  <span className="text-xs text-neutral-500">% OFF</span>
                </div>

                <button
                  type="submit"
                  className="py-2 px-4 rounded-md bg-[#567D4A] hover:bg-[#456839] text-white text-xs font-medium cursor-pointer transition-colors"
                >
                  Create Code
                </button>
              </form>
            </div>

            {/* List Active Promos */}
            <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
              <div className="p-4 border-b border-neutral-200">
                <h4 className="text-xs font-medium text-neutral-900 uppercase tracking-wider">
                  Active Coupons
                </h4>
              </div>

              <div className="divide-y divide-neutral-100 text-xs">
                {promos.map((promo) => (
                  <div
                    key={promo.code}
                    className="p-4 flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-neutral-900">
                          {promo.code}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-medium">
                          {promo.discountPercent}% OFF
                        </span>
                      </div>
                      <span className="text-[11px] text-neutral-400 block mt-0.5">
                        Used {promo.usageCount} times
                      </span>
                    </div>

                    <button
                      onClick={() => handleTogglePromo(promo.code)}
                      className={`px-3 py-1 rounded text-xs font-medium border cursor-pointer transition-colors ${
                        promo.active
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-neutral-100 text-neutral-500 border-neutral-200"
                      }`}
                    >
                      {promo.active ? "Active" : "Disabled"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------------- TAB: GOOGLE SHEETS SYNC ---------------- */}
        {activeTab === "sheets" && (
          <div className="space-y-6 max-w-3xl">
            {/* Status & Intro Card */}
            <div className="bg-white p-5 rounded-lg border border-neutral-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#567D4A]/10 text-[#567D4A] flex items-center justify-center">
                    <FileSpreadsheet size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900">
                      Google Sheets Database Sync
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Real-time live order export directly to your Google Spreadsheet
                    </p>
                  </div>
                </div>

                <div>
                  {gsheetUrl ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Connected to Sheets
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600 border border-neutral-200">
                      <span className="w-2 h-2 rounded-full bg-neutral-400" />
                      Not Connected Yet
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed">
                When connected, every customer order placed on Dropstop is instantly posted to your Google Sheet in the background. You can also sync past orders or trigger test rows anytime.
              </p>
            </div>

            {/* Webhook Configuration Form */}
            <div className="bg-white p-5 rounded-lg border border-neutral-200 space-y-4">
              <h4 className="text-xs font-medium text-neutral-900 uppercase tracking-wider">
                1. Webhook URL Configuration
              </h4>

              <form onSubmit={handleSaveGsheetUrl} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Google Apps Script Web App URL
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                    value={gsheetUrl}
                    onChange={(e) => setGsheetUrl(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-md px-3 py-2 text-xs font-mono outline-none focus:border-[#567D4A]"
                  />

                  {/* Live URL validation alert */}
                  {gsheetUrl && !validateGoogleSheetsUrl(gsheetUrl).valid && (
                    <div className="mt-2 p-2.5 rounded bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-medium leading-relaxed">
                      {validateGoogleSheetsUrl(gsheetUrl).warning}
                    </div>
                  )}

                  <p className="text-[11px] text-neutral-400 mt-1">
                    Must start with <code>https://script.google.com/macros/s/</code> and end with <code>/exec</code>.
                  </p>
                </div>

                {gsheetSaveMessage && (
                  <p className="text-xs text-emerald-600 font-medium">
                    {gsheetSaveMessage}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="submit"
                    className="py-2 px-4 rounded-md bg-[#567D4A] hover:bg-[#456839] text-white text-xs font-medium cursor-pointer transition-colors"
                  >
                    Save Webhook URL
                  </button>

                  <button
                    type="button"
                    disabled={isTestingGsheet || !gsheetUrl}
                    onClick={handleTestGsheetConnection}
                    className="py-2 px-3 rounded-md bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs font-medium cursor-pointer transition-colors disabled:opacity-50 inline-flex items-center gap-1.5"
                  >
                    {isTestingGsheet && <RefreshCw size={13} className="animate-spin" />}
                    <span>Test via Background API</span>
                  </button>

                  {gsheetUrl && (
                    <a
                      href={getDirectBrowserTestUrl(gsheetUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-md bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-medium cursor-pointer transition-colors inline-flex items-center gap-1.5"
                      title="Open test in browser tab to verify Google response directly"
                    >
                      <ExternalLink size={13} />
                      <span>Direct Browser Test (Guaranteed) ↗</span>
                    </a>
                  )}

                  <button
                    type="button"
                    disabled={isSyncingGsheet || !gsheetUrl || orders.length === 0}
                    onClick={handleSyncAllToGsheet}
                    className="py-2 px-3 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-medium cursor-pointer transition-colors disabled:opacity-50 inline-flex items-center gap-1.5"
                  >
                    {isSyncingGsheet && <RefreshCw size={13} className="animate-spin" />}
                    <span>Sync All {orders.length} Past Orders</span>
                  </button>
                </div>
              </form>

              {/* Feedback banners */}
              {testGsheetResult && (
                <div
                  className={`p-3 rounded-md text-xs border ${
                    testGsheetResult.success
                      ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                      : "bg-red-50 border-red-200 text-red-800"
                  }`}
                >
                  {testGsheetResult.message}
                </div>
              )}

              {syncGsheetResult && (
                <div className="p-3 rounded-md text-xs bg-emerald-50 border border-emerald-200 text-emerald-800">
                  {syncGsheetResult}
                </div>
              )}

              {/* Troubleshooting Checklist */}
              <div className="bg-amber-50/70 border border-amber-200/90 rounded-md p-3.5 text-xs text-amber-950 space-y-2 mt-3">
                <h5 className="font-semibold flex items-center gap-1.5 text-amber-900 text-xs">
                  <AlertCircle size={14} className="text-amber-700" />
                  <span>Troubleshooting: If rows are not appearing in your Sheet</span>
                </h5>
                <ul className="space-y-1.5 list-disc list-inside text-[11px] text-amber-900 leading-relaxed">
                  <li>
                    <strong>Did you set &ldquo;Who has access&rdquo; to &ldquo;Anyone&rdquo;?</strong> This is the #1 reason rows fail to appear. In Apps Script, click <em>Deploy &gt; Manage deployments &gt; Edit</em> and make sure <strong>Who has access</strong> is set to <strong>Anyone</strong> (NOT &ldquo;Only myself&rdquo;).
                  </li>
                  <li>
                    <strong>Did you copy the Web App URL?</strong> The URL must look like <code>https://script.google.com/macros/s/AKfycb.../exec</code> (it must end with <code>/exec</code>, NOT <code>/edit</code> or the Google Sheet link).
                  </li>
                  <li>
                    <strong>Try the &ldquo;Direct Browser Test&rdquo; button above:</strong> Clicking it will open Google&rsquo;s response directly in a new tab. If Google prompts you to grant permissions, accept them once and your row will be added immediately!
                  </li>
                  <li>
                    <strong>Did you open Apps Script from the Sheet?</strong> Make sure you opened Apps Script via <em>Extensions &gt; Apps Script</em> from inside your spreadsheet so it has permission to write to it.
                  </li>
                </ul>
              </div>
            </div>

            {/* Step-by-Step Setup Guide with 1-Click Code Copy */}
            <div className="bg-white p-5 rounded-lg border border-neutral-200 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-medium text-neutral-900 uppercase tracking-wider">
                  2. Setup Instructions (2 Minutes)
                </h4>
                <button
                  onClick={handleCopyScript}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#567D4A] hover:bg-[#456839] text-white text-xs font-medium rounded-md transition-colors cursor-pointer"
                >
                  {copiedScript ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedScript ? "Copied Script!" : "Copy Apps Script Code"}</span>
                </button>
              </div>

              <div className="space-y-2 text-xs text-neutral-600">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-neutral-100 text-neutral-700 font-semibold flex items-center justify-center shrink-0 text-[11px]">
                    1
                  </span>
                  <p>
                    Open your Google Sheet (or create a new blank spreadsheet at{" "}
                    <a
                      href="https://sheets.new"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#567D4A] underline font-medium"
                    >
                      sheets.new
                    </a>
                    ).
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-neutral-100 text-neutral-700 font-semibold flex items-center justify-center shrink-0 text-[11px]">
                    2
                  </span>
                  <p>
                    In the top menu, go to <strong>Extensions &gt; Apps Script</strong>.
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-neutral-100 text-neutral-700 font-semibold flex items-center justify-center shrink-0 text-[11px]">
                    3
                  </span>
                  <p>
                    Delete any existing code in the editor, click{" "}
                    <strong>&ldquo;Copy Apps Script Code&rdquo;</strong> above, paste it in, and click <strong>Save (Cmd+S / Ctrl+S)</strong>.
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-neutral-100 text-neutral-700 font-semibold flex items-center justify-center shrink-0 text-[11px]">
                    4
                  </span>
                  <p>
                    Click the blue <strong>Deploy</strong> button (top right) &gt; <strong>New deployment</strong>.
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-neutral-100 text-neutral-700 font-semibold flex items-center justify-center shrink-0 text-[11px]">
                    5
                  </span>
                  <p>
                    Select type: <strong>Web app</strong>. Set <em>Execute as:</em> <strong>Me</strong> and <em>Who has access:</em> <strong>Anyone</strong> (this allows the store to send order rows).
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-neutral-100 text-neutral-700 font-semibold flex items-center justify-center shrink-0 text-[11px]">
                    6
                  </span>
                  <p>
                    Click <strong>Deploy</strong>, grant Google permissions, copy the generated <strong>Web app URL</strong>, paste it into Step 1 above, and click <strong>Save</strong>!
                  </p>
                </div>
              </div>

              {/* Code preview box */}
              <div className="relative mt-3">
                <pre className="p-3 bg-neutral-900 text-neutral-200 rounded-md text-[11px] font-mono overflow-x-auto max-h-48 border border-neutral-800">
                  {GOOGLE_APPS_SCRIPT_CODE}
                </pre>
              </div>
            </div>

            {/* Sheet Column Headers Preview */}
            <div className="bg-white p-5 rounded-lg border border-neutral-200">
              <h4 className="text-xs font-medium text-neutral-900 uppercase tracking-wider mb-2">
                Google Sheet Automatically Created Columns
              </h4>
              <p className="text-xs text-neutral-500 mb-3">
                The script automatically adds these 15 headers with styled green formatting on the first sync:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Date & Time",
                  "Order ID",
                  "Customer Name",
                  "Phone (WhatsApp)",
                  "Email",
                  "Delivery Address",
                  "City",
                  "PIN Code",
                  "Items Ordered",
                  "Total Items",
                  "Subtotal (₹)",
                  "Shipping (₹)",
                  "Total Payable (₹)",
                  "Payment Mode",
                  "Status",
                ].map((col, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 rounded bg-neutral-100 text-neutral-700 font-mono text-[11px]"
                  >
                    {col}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------------- TAB 5: CJ DROPSHIPPING ---------------- */}
        {activeTab === "cjdropshipping" && (
          <DropstopCjPanel
            orders={orders}
            onOrderUpdated={(updated) => {
              setOrders(updated);
              try {
                localStorage.setItem("dropstop_admin_orders_v1", JSON.stringify(updated));
              } catch {
                // Ignore
              }
            }}
            onProductImported={(newProduct) => {
              const updated = [newProduct, ...products];
              setProducts(updated);
              saveProductsToStore(updated);
            }}
            onSelectOrder={(ord) => setSelectedOrder(ord)}
          />
        )}

        {/* ---------------- TAB 6: SETTINGS ---------------- */}
        {activeTab === "settings" && (
          <div className="space-y-6 max-w-xl">
            {/* Update Passcode */}
            <div className="bg-white p-5 rounded-lg border border-neutral-200">
              <h3 className="text-sm font-medium text-neutral-900 mb-1 flex items-center gap-2">
                <KeyRound size={16} className="text-[#567D4A]" />
                <span>Change Admin Passcode</span>
              </h3>
              <p className="text-xs text-neutral-500 mb-4">
                Update the PIN required to access this secret admin portal.
              </p>

              <form onSubmit={handleUpdatePin} className="space-y-3">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Enter new passcode (min 4 chars)"
                    value={newPinInput}
                    onChange={(e) => setNewPinInput(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-md px-3 py-2 text-xs outline-none focus:border-[#567D4A]"
                  />
                </div>

                {pinUpdateMessage && (
                  <p className="text-xs text-emerald-600 font-medium">
                    {pinUpdateMessage}
                  </p>
                )}

                <button
                  type="submit"
                  className="py-2 px-4 rounded-md bg-[#567D4A] hover:bg-[#456839] text-white text-xs font-medium cursor-pointer transition-colors"
                >
                  Save Passcode
                </button>
              </form>
            </div>

            {/* Quick System Info */}
            <div className="bg-white p-5 rounded-lg border border-neutral-200 text-xs text-neutral-600 space-y-2">
              <h4 className="font-medium text-neutral-900 mb-1">System &amp; Store Information</h4>
              <p>• Connected Domain: <strong>astria.co.in/dropstop</strong></p>
              <p>• Official Support WhatsApp: <strong>+91 82784 55700</strong></p>
              <p>• Fulfillment Dispatch: <strong>Pan-India (2–4 Days Express)</strong></p>
              <p>• Free Shipping Threshold: <strong>₹999</strong></p>
            </div>
          </div>
        )}
      </main>

      {/* ---------------- MODAL 1: ADD PRODUCT ---------------- */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white border border-neutral-200 rounded-lg p-6 shadow-xl max-h-[90vh] overflow-y-auto text-neutral-900">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-4">
              <h3 className="text-base font-medium text-neutral-900">Add New Store Product</h3>
              <button
                onClick={() => setIsAddProductOpen(false)}
                className="text-neutral-400 hover:text-neutral-900"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-neutral-600 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Minimalist Crewneck Sweatshirt"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full border border-neutral-300 rounded px-3 py-2 outline-none focus:border-[#567D4A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-600 mb-1">Category *</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        category: e.target.value as DropstopProduct["category"],
                      })
                    }
                    className="w-full border border-neutral-300 rounded px-3 py-2 outline-none focus:border-[#567D4A] bg-white"
                  >
                    <option value="Apparel">Apparel</option>
                    <option value="Desk & Tech">Desk & Tech</option>
                    <option value="Everyday Carry">Everyday Carry</option>
                    <option value="Lifestyle">Lifestyle</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-600 mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    placeholder="1499"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="w-full border border-neutral-300 rounded px-3 py-2 outline-none focus:border-[#567D4A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-600 mb-1">Original Price / MRP (₹)</label>
                <input
                  type="number"
                  placeholder="1999"
                  value={newProduct.originalPrice || ""}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, originalPrice: Number(e.target.value) })
                  }
                  className="w-full border border-neutral-300 rounded px-3 py-2 outline-none focus:border-[#567D4A]"
                />
              </div>

              <div>
                <label className="block text-neutral-600 mb-1">Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full border border-neutral-300 rounded px-3 py-2 outline-none focus:border-[#567D4A]"
                />
              </div>

              <div>
                <label className="block text-neutral-600 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Short description of the product materials and fit..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full border border-neutral-300 rounded px-3 py-2 outline-none focus:border-[#567D4A]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-3 py-2 rounded border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#567D4A] hover:bg-[#456839] text-white font-medium"
                >
                  Save &amp; Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- MODAL 2: ORDER DETAILS ---------------- */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white border border-neutral-200 rounded-lg p-6 shadow-xl max-h-[90vh] overflow-y-auto text-neutral-900">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-4">
              <div>
                <h3 className="text-base font-semibold text-neutral-900">
                  Order {selectedOrder.id}
                </h3>
                <span className="text-xs text-neutral-500">
                  Placed on {new Date(selectedOrder.date).toLocaleString("en-IN")}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-neutral-400 hover:text-neutral-900"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Customer info */}
              <div className="p-3 bg-neutral-50 rounded border border-neutral-200 space-y-1">
                <span className="font-medium text-neutral-900 block mb-1">Customer Details</span>
                <p><strong>Name:</strong> {selectedOrder.customer.name}</p>
                <p><strong>Phone:</strong> {selectedOrder.customer.phone}</p>
                <p><strong>Email:</strong> {selectedOrder.customer.email || "N/A"}</p>
                <p><strong>Shipping Address:</strong> {selectedOrder.customer.address}, {selectedOrder.customer.city} ({selectedOrder.customer.pincode})</p>
                <p><strong>Payment Mode:</strong> {selectedOrder.customer.paymentMethod.toUpperCase()}</p>
              </div>

              {/* CJ Dropshipping status */}
              <div className="p-3 bg-neutral-50 rounded border border-neutral-200 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-neutral-900 block text-xs flex items-center gap-1.5">
                    <Globe size={13} className="text-[#567D4A]" />
                    <span>CJ Dropshipping Status</span>
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    {selectedOrder.cjOrderId ? `CJ Order: ${selectedOrder.cjOrderId} • Tracking: ${selectedOrder.cjTrackingNumber || "Pending"}` : "Not yet dispatched to CJ"}
                  </span>
                </div>
                {selectedOrder.cjOrderId ? (
                  <button
                    onClick={() => {
                      setSelectedOrder(null);
                      setActiveTab("cjdropshipping");
                    }}
                    className="text-xs text-[#567D4A] hover:underline font-medium cursor-pointer"
                  >
                    Track Package &rarr;
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedOrder(null);
                      setActiveTab("cjdropshipping");
                    }}
                    className="px-2.5 py-1 text-xs bg-[#567D4A] hover:bg-[#456839] text-white rounded font-medium cursor-pointer transition-colors"
                  >
                    Fulfill with CJ &rarr;
                  </button>
                )}
              </div>

              {/* Items */}
              <div>
                <span className="font-medium text-neutral-900 block mb-2">Order Line Items</span>
                <div className="space-y-2">
                  {selectedOrder.items.map((it, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded border border-neutral-100"
                    >
                      <div className="flex items-center gap-2">
                        <div className="relative w-10 h-10 rounded bg-neutral-100 overflow-hidden shrink-0">
                          <Image
                            src={it.product.image}
                            alt={it.product.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <span className="font-medium text-neutral-900 block">
                            {it.product.name}
                          </span>
                          <span className="text-neutral-500 text-[11px]">
                            {it.variant} x {it.quantity}
                          </span>
                        </div>
                      </div>
                      <span className="font-medium text-neutral-900">
                        ₹{(it.product.price * it.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="pt-2 border-t border-neutral-200 space-y-1">
                <div className="flex justify-between text-neutral-500">
                  <span>Subtotal</span>
                  <span>₹{selectedOrder.subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>Shipping</span>
                  <span>{selectedOrder.shipping === 0 ? "FREE" : `₹${selectedOrder.shipping}`}</span>
                </div>
                <div className="flex justify-between font-semibold text-neutral-900 text-sm pt-1">
                  <span>Total Payable</span>
                  <span>₹{selectedOrder.total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-neutral-200 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleWhatsAppCustomer(selectedOrder)}
                  className="flex-1 py-2 px-3 rounded bg-[#25D366] hover:bg-[#20ba5a] text-black font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4" fill="currentColor" />
                  <span>Notify via WhatsApp</span>
                </button>

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="py-2 px-4 rounded border border-neutral-200 hover:bg-neutral-100 text-neutral-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
