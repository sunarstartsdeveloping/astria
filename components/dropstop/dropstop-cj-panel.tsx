"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Globe,
  Search,
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  TrendingUp,
  Settings,
  RefreshCw,
  ExternalLink,
  Plus,
  Send,
  AlertCircle,
  Copy,
  Check,
  DollarSign,
  Layers,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";
import { DropstopProduct } from "@/data/dropstop-products";
import { StoredOrder } from "./dropstop-admin-store";
import {
  CjConfig,
  CjProductItem,
  CjTrackingInfo,
  CjFreightOption,
  getCjConfig,
  saveCjConfig,
  testCjConnection,
  searchCjCatalog,
  convertCjProductToDropstop,
  fulfillOrderWithCj,
  getCjTracking,
  calculateCjFreightQuotes,
  CJ_SOURCING_CATALOG,
} from "./dropstop-cj";

interface DropstopCjPanelProps {
  orders: StoredOrder[];
  onOrderUpdated: (updatedOrders: StoredOrder[]) => void;
  onProductImported: (newProduct: DropstopProduct) => void;
  onSelectOrder?: (order: StoredOrder) => void;
}

export function DropstopCjPanel({
  orders,
  onOrderUpdated,
  onProductImported,
  onSelectOrder,
}: DropstopCjPanelProps) {
  const [subTab, setSubTab] = useState<"sourcing" | "fulfillment" | "tracking" | "freight" | "settings">("sourcing");

  // CJ Config State
  const [config, setConfig] = useState<CjConfig>(getCjConfig());
  const [emailInput, setEmailInput] = useState(config.email);
  const [apiKeyInput, setApiKeyInput] = useState(config.apiKey);
  const [exchangeRateInput, setExchangeRateInput] = useState(config.inrExchangeRate.toString());
  const [markupInput, setMarkupInput] = useState(config.defaultMarkupPercent.toString());
  const [isTestingAuth, setIsTestingAuth] = useState(false);
  const [authResult, setAuthResult] = useState<{ success: boolean; message: string } | null>(null);

  // Sourcing Catalog State
  const [sourcingQuery, setSourcingQuery] = useState("");
  const [sourcingCategory, setSourcingCategory] = useState("All");
  const [catalogItems, setCatalogItems] = useState<CjProductItem[]>(CJ_SOURCING_CATALOG);
  const [selectedCjProduct, setSelectedCjProduct] = useState<CjProductItem | null>(null);
  const [importCustomMarkup, setImportCustomMarkup] = useState<number>(config.defaultMarkupPercent);
  const [importedProductIds, setImportedProductIds] = useState<Set<string>>(new Set());
  const [importSuccessMessage, setImportSuccessMessage] = useState("");

  // Order Fulfillment State
  const [fulfillingOrderId, setFulfillingOrderId] = useState<string | null>(null);
  const [fulfillmentMessage, setFulfillmentMessage] = useState("");

  // Tracking State
  const [trackingNumberInput, setTrackingNumberInput] = useState("");
  const [isLoadingTracking, setIsLoadingTracking] = useState(false);
  const [trackingData, setTrackingData] = useState<CjTrackingInfo | null>(null);

  // Freight Calculator State
  const [calcWeight, setCalcWeight] = useState(350);
  const [freightQuotes, setFreightQuotes] = useState<CjFreightOption[]>([]);

  useEffect(() => {
    const loaded = getCjConfig();
    setConfig(loaded);
    setEmailInput(loaded.email);
    setApiKeyInput(loaded.apiKey);
    setExchangeRateInput(loaded.inrExchangeRate.toString());
    setMarkupInput(loaded.defaultMarkupPercent.toString());
    setFreightQuotes(calculateCjFreightQuotes(350, loaded.inrExchangeRate));
  }, []);

  // Filter catalog
  useEffect(() => {
    searchCjCatalog(sourcingQuery, sourcingCategory).then(setCatalogItems);
  }, [sourcingQuery, sourcingCategory]);

  // Recalculate freight when weight or rate changes
  const handleRecalcFreight = (weight: number) => {
    setCalcWeight(weight);
    setFreightQuotes(calculateCjFreightQuotes(weight, config.inrExchangeRate));
  };

  // Test Authentication
  const handleTestConnection = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTestingAuth(true);
    setAuthResult(null);

    const saved = saveCjConfig({
      email: emailInput.trim(),
      apiKey: apiKeyInput.trim(),
      inrExchangeRate: Number(exchangeRateInput) || 86.5,
      defaultMarkupPercent: Number(markupInput) || 65,
    });
    setConfig(saved);

    const res = await testCjConnection(emailInput, apiKeyInput, saved.accessToken);
    setAuthResult(res);
    setIsTestingAuth(false);
  };

  // 1-Click Import Product
  const handleImportProduct = (item: CjProductItem) => {
    const multiplier = 1 + importCustomMarkup / 100;
    const dropstopProd = convertCjProductToDropstop(
      item,
      multiplier,
      config.inrExchangeRate
    );

    onProductImported(dropstopProd);
    setImportedProductIds((prev) => new Set(prev).add(item.pid));
    setImportSuccessMessage(`"${item.productName}" imported to Dropstop store!`);
    setTimeout(() => setImportSuccessMessage(""), 4000);
    setSelectedCjProduct(null);
  };

  // 1-Click Fulfill Order
  const handleFulfillOrder = async (order: StoredOrder) => {
    setFulfillingOrderId(order.id);
    setFulfillmentMessage("");

    const res = await fulfillOrderWithCj(order, config);

    if (res.success && res.cjOrderId) {
      const updatedOrders = orders.map((ord) =>
        ord.id === order.id
          ? {
              ...ord,
              status: "processing" as const,
              cjOrderId: res.cjOrderId,
              cjTrackingNumber: res.trackingNumber,
              cjFulfillmentStatus: "created" as const,
              cjFulfilledAt: new Date().toISOString(),
            }
          : ord
      );
      onOrderUpdated(updatedOrders);
      setFulfillmentMessage(
        `✓ Order ${order.id} sent to CJ Dropshipping! CJ Order ID: ${res.cjOrderId}. Tracking: ${res.trackingNumber}`
      );
      setTimeout(() => setFulfillmentMessage(""), 6000);
    } else {
      setFulfillmentMessage(res.error || "Failed to dispatch order to CJ Dropshipping.");
    }

    setFulfillingOrderId(null);
  };

  // Track Package
  const handleSearchTracking = async (tNum?: string) => {
    const num = tNum || trackingNumberInput.trim();
    if (!num) return;
    setIsLoadingTracking(true);
    const data = await getCjTracking(num);
    setTrackingData(data);
    setIsLoadingTracking(false);
  };

  return (
    <div className="space-y-6">
      {/* CJ Header & Status Strip */}
      <div className="bg-white p-5 rounded-lg border border-neutral-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-[#567D4A]/10 text-[#567D4A] flex items-center justify-center shrink-0">
              <Globe size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-neutral-900">
                  CJ Dropshipping Sourcing &amp; Fulfillment
                </h2>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                  {config.apiKey ? "Connected (Live API)" : "Active (Smart Sandbox)"}
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                Automate product sourcing, inventory synchronization, and direct customer fulfillment.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <div className="px-3 py-1.5 rounded bg-neutral-50 border border-neutral-200 text-neutral-600">
              USD/INR: <strong className="text-neutral-900">₹{config.inrExchangeRate}</strong>
            </div>
            <div className="px-3 py-1.5 rounded bg-neutral-50 border border-neutral-200 text-neutral-600">
              Default Margin: <strong className="text-[#567D4A]">+{config.defaultMarkupPercent}%</strong>
            </div>
            <a
              href="https://cjdropshipping.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
            >
              <span>CJ Portal</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto text-xs font-medium border-t border-neutral-100 mt-5 pt-3">
          {[
            { id: "sourcing", label: `CJ Sourcing Catalog (${catalogItems.length})`, icon: Package },
            { id: "fulfillment", label: `Order Fulfillment (${orders.length})`, icon: Send },
            { id: "tracking", label: "Package Tracking", icon: Truck },
            { id: "freight", label: "Shipping Calculator", icon: TrendingUp },
            { id: "settings", label: "API & Configuration", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = subTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSubTab(tab.id as typeof subTab)}
                className={`py-2 px-3 rounded-md font-medium flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? "bg-[#567D4A] text-white"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Global alert banner if order fulfillment was triggered */}
      {fulfillmentMessage && (
        <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span>{fulfillmentMessage}</span>
        </div>
      )}

      {/* Global alert banner if product was imported */}
      {importSuccessMessage && (
        <div className="p-3.5 rounded-lg bg-[#567D4A]/10 border border-[#567D4A]/30 text-xs text-[#567D4A] flex items-center gap-2">
          <Sparkles size={16} className="text-[#567D4A] shrink-0" />
          <span className="font-medium">{importSuccessMessage}</span>
        </div>
      )}

      {/* ---------------- SUB-TAB 1: PRODUCT SOURCING & IMPORT ---------------- */}
      {subTab === "sourcing" && (
        <div className="space-y-4">
          {/* Sourcing Search & Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search CJ catalog by title, SKU, or keyword..."
                value={sourcingQuery}
                onChange={(e) => setSourcingQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-neutral-200 rounded-md outline-none focus:border-[#567D4A]"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto text-xs">
              {["All", "Desk & Tech", "Everyday Carry", "Lifestyle", "Apparel"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSourcingCategory(cat)}
                  className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                    sourcingCategory === cat
                      ? "bg-neutral-900 text-white font-medium"
                      : "bg-white border border-neutral-200 text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Sourcing Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {catalogItems.map((item) => {
              const costInr = Math.round(item.sellPriceUsd * config.inrExchangeRate);
              const suggestedRetail = Math.round((costInr * (1 + config.defaultMarkupPercent / 100)) / 50) * 50 - 1;
              const profitInr = suggestedRetail - costInr;
              const isImported = importedProductIds.has(item.pid);

              return (
                <div
                  key={item.pid}
                  className="bg-white border border-neutral-200 rounded-lg overflow-hidden flex flex-col justify-between hover:border-neutral-300 transition-colors"
                >
                  <div className="relative aspect-square w-full bg-neutral-100">
                    <Image
                      src={item.productImage}
                      alt={item.productName}
                      fill
                      sizes="280px"
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                      CJ SKU: {item.productSku}
                    </div>
                  </div>

                  <div className="p-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-0.5">
                        {item.categoryName} • {item.weightGrams}g
                      </span>
                      <h4 className="text-xs font-medium text-neutral-900 line-clamp-1 mb-2">
                        {item.productName}
                      </h4>

                      {/* Pricing Breakdown */}
                      <div className="p-2 rounded bg-neutral-50 border border-neutral-100 space-y-1 text-[11px] mb-3">
                        <div className="flex justify-between text-neutral-500">
                          <span>CJ Wholesale:</span>
                          <span className="font-mono text-neutral-900 font-medium">
                            ${item.sellPriceUsd.toFixed(2)} (~₹{costInr})
                          </span>
                        </div>
                        <div className="flex justify-between text-neutral-500">
                          <span>Suggested Retail:</span>
                          <span className="font-mono font-medium text-neutral-900">
                            ₹{suggestedRetail.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <div className="flex justify-between text-[#567D4A] font-medium pt-1 border-t border-neutral-200">
                          <span>Net Profit / Margin:</span>
                          <span>+₹{profitInr} ({config.defaultMarkupPercent}%)</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <button
                        onClick={() => setSelectedCjProduct(item)}
                        className="w-full py-1.5 px-3 rounded border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-xs font-medium transition-colors cursor-pointer text-center"
                      >
                        Inspect &amp; Customize
                      </button>

                      <button
                        disabled={isImported}
                        onClick={() => handleImportProduct(item)}
                        className={`w-full py-1.5 px-3 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                          isImported
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default"
                            : "bg-[#567D4A] hover:bg-[#456839] text-white"
                        }`}
                      >
                        {isImported ? (
                          <>
                            <Check size={14} />
                            <span>Imported to Store</span>
                          </>
                        ) : (
                          <>
                            <Plus size={14} />
                            <span>1-Click Import to Store</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ---------------- SUB-TAB 2: ORDER FULFILLMENT ---------------- */}
      {subTab === "fulfillment" && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <h3 className="font-semibold text-neutral-900">CJ Automated Order Dispatch</h3>
              <p className="text-neutral-500">
                Click &ldquo;Fulfill via CJ&rdquo; to send the customer&rsquo;s shipping address and items to CJ Dropshipping warehouses for automated pick, pack, and express air courier delivery.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-700 border border-amber-200 font-medium">
                {orders.filter((o) => !o.cjOrderId).length} Unfulfilled
              </span>
              <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                {orders.filter((o) => o.cjOrderId).length} CJ Synced
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-600">
                <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-medium">
                  <tr>
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Customer &amp; Destination</th>
                    <th className="py-3 px-4">Items Ordered</th>
                    <th className="py-3 px-4">Total Amount</th>
                    <th className="py-3 px-4">CJ Fulfillment Status</th>
                    <th className="py-3 px-4">Tracking Number</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {orders.map((order) => {
                    const isFulfilled = Boolean(order.cjOrderId);
                    return (
                      <tr key={order.id} className="hover:bg-neutral-50/60 transition-colors">
                        <td className="py-3 px-4 font-mono font-medium text-neutral-900">
                          {order.id}
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-medium text-neutral-900 block">
                            {order.customer.name}
                          </span>
                          <span className="text-[11px] text-neutral-400">
                            {order.customer.city} ({order.customer.pincode})
                          </span>
                        </td>
                        <td className="py-3 px-4 max-w-[200px]">
                          {order.items.map((it, i) => (
                            <div key={i} className="text-neutral-700 truncate">
                              {it.quantity}x {it.product.name}
                            </div>
                          ))}
                        </td>
                        <td className="py-3 px-4 font-medium text-neutral-900">
                          ₹{order.total.toLocaleString("en-IN")}
                        </td>
                        <td className="py-3 px-4">
                          {isFulfilled ? (
                            <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                              <CheckCircle2 size={12} />
                              <span>Dispatched ({order.cjOrderId})</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium">
                              <Clock size={12} />
                              <span>Awaiting CJ Dispatch</span>
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px]">
                          {order.cjTrackingNumber ? (
                            <button
                              onClick={() => {
                                setTrackingNumberInput(order.cjTrackingNumber!);
                                setSubTab("tracking");
                                handleSearchTracking(order.cjTrackingNumber!);
                              }}
                              className="text-[#567D4A] hover:underline font-semibold flex items-center gap-1"
                              title="Click to track live package"
                            >
                              <span>{order.cjTrackingNumber}</span>
                              <ExternalLink size={11} />
                            </button>
                          ) : (
                            <span className="text-neutral-400">—</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {isFulfilled ? (
                            <button
                              onClick={() => {
                                setTrackingNumberInput(order.cjTrackingNumber || "");
                                setSubTab("tracking");
                                if (order.cjTrackingNumber) {
                                  handleSearchTracking(order.cjTrackingNumber);
                                }
                              }}
                              className="px-2.5 py-1 text-xs rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors cursor-pointer"
                            >
                              Track CJ
                            </button>
                          ) : (
                            <button
                              disabled={fulfillingOrderId === order.id}
                              onClick={() => handleFulfillOrder(order)}
                              className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded bg-[#567D4A] hover:bg-[#456839] text-white font-medium transition-colors cursor-pointer disabled:opacity-50"
                            >
                              {fulfillingOrderId === order.id ? (
                                <>
                                  <RefreshCw size={12} className="animate-spin" />
                                  <span>Dispatching...</span>
                                </>
                              ) : (
                                <>
                                  <Send size={12} />
                                  <span>Fulfill via CJ</span>
                                </>
                              )}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- SUB-TAB 3: LIVE TRACKING ---------------- */}
      {subTab === "tracking" && (
        <div className="space-y-6 max-w-3xl">
          <div className="bg-white p-5 rounded-lg border border-neutral-200">
            <h3 className="text-sm font-semibold text-neutral-900 mb-1">
              CJ Global Air Logistics Tracking
            </h3>
            <p className="text-xs text-neutral-500 mb-4">
              Enter any CJPacket or CJ Dropshipping international tracking number to view real-time transit milestones.
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. CJPKT89218204IN"
                value={trackingNumberInput}
                onChange={(e) => setTrackingNumberInput(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-white border border-neutral-300 rounded-md outline-none focus:border-[#567D4A] font-mono"
              />
              <button
                disabled={isLoadingTracking}
                onClick={() => handleSearchTracking()}
                className="px-4 py-2 bg-[#567D4A] hover:bg-[#456839] text-white text-xs font-medium rounded-md transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
              >
                {isLoadingTracking ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search size={14} />
                    <span>Track Package</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick demo pills */}
            <div className="mt-3 flex items-center gap-2 text-[11px] text-neutral-500">
              <span>Quick Test:</span>
              <button
                type="button"
                onClick={() => {
                  setTrackingNumberInput("CJPKT89218204IN");
                  handleSearchTracking("CJPKT89218204IN");
                }}
                className="text-[#567D4A] hover:underline font-mono"
              >
                CJPKT89218204IN
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => {
                  setTrackingNumberInput("CJPKT47190822IN");
                  handleSearchTracking("CJPKT47190822IN");
                }}
                className="text-[#567D4A] hover:underline font-mono"
              >
                CJPKT47190822IN
              </button>
            </div>
          </div>

          {/* Tracking Result View */}
          {trackingData && (
            <div className="bg-white p-5 rounded-lg border border-neutral-200 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-100 gap-2">
                <div>
                  <span className="text-[11px] font-mono text-neutral-400">WAYBILL / TRACKING NUMBER</span>
                  <h4 className="text-base font-bold text-neutral-900 font-mono">
                    {trackingData.trackingNumber}
                  </h4>
                  <p className="text-xs text-neutral-500">
                    Carrier: <strong>{trackingData.carrier}</strong>
                  </p>
                </div>

                <div className="sm:text-right">
                  <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 font-medium">
                    <Truck size={13} />
                    <span>{trackingData.status}</span>
                  </span>
                  <span className="text-[11px] text-neutral-400 block mt-1">
                    Updated: {trackingData.lastUpdated}
                  </span>
                </div>
              </div>

              {/* Transit Route */}
              <div className="grid grid-cols-2 gap-4 p-3 rounded bg-neutral-50 border border-neutral-100 text-xs">
                <div>
                  <span className="text-neutral-400 text-[10px] block">ORIGIN WAREHOUSE</span>
                  <span className="font-medium text-neutral-800">{trackingData.origin}</span>
                </div>
                <div>
                  <span className="text-neutral-400 text-[10px] block">DESTINATION COUNTRY</span>
                  <span className="font-medium text-neutral-800">{trackingData.destination}</span>
                </div>
              </div>

              {/* Milestones timeline */}
              <div>
                <h5 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-4">
                  Logistics Checkpoints
                </h5>

                <div className="space-y-4 relative pl-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
                  {trackingData.milestones.map((m, idx) => (
                    <div key={idx} className="relative text-xs">
                      <div
                        className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                          idx === 0
                            ? "border-[#567D4A] ring-3 ring-[#567D4A]/20"
                            : "border-neutral-300"
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            idx === 0 ? "bg-[#567D4A]" : "bg-neutral-300"
                          }`}
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <span className={`font-semibold ${idx === 0 ? "text-neutral-900" : "text-neutral-700"}`}>
                          {m.status}
                        </span>
                        <span className="text-[11px] text-neutral-400 font-mono">{m.date}</span>
                      </div>

                      <p className="text-neutral-500 mt-0.5 text-[11px]">{m.description}</p>
                      <span className="text-[10px] text-neutral-400 flex items-center gap-1 mt-0.5">
                        <MapPin size={10} />
                        <span>{m.location}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ---------------- SUB-TAB 4: FREIGHT CALCULATOR ---------------- */}
      {subTab === "freight" && (
        <div className="space-y-5 max-w-3xl">
          <div className="bg-white p-5 rounded-lg border border-neutral-200">
            <h3 className="text-sm font-semibold text-neutral-900 mb-1">
              CJ Air Freight &amp; Shipping Rates Calculator
            </h3>
            <p className="text-xs text-neutral-500 mb-4">
              Real-time shipping calculations from CJ fulfillment hubs (Yiwu/Shenzhen) to destinations across India.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-neutral-600 mb-1">Package Weight (Grams)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="50"
                    max="2000"
                    step="50"
                    value={calcWeight}
                    onChange={(e) => handleRecalcFreight(Number(e.target.value))}
                    className="flex-1 accent-[#567D4A]"
                  />
                  <span className="w-16 font-mono font-medium text-neutral-900 text-right">
                    {calcWeight}g
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-neutral-600 mb-1">Destination</label>
                <select
                  disabled
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded text-neutral-700 outline-none"
                >
                  <option value="IN">India (Pan-India Air Cargo)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quotes list */}
          <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
            <div className="p-4 border-b border-neutral-100">
              <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                Available Courier Lines ({calcWeight}g)
              </h4>
            </div>

            <div className="divide-y divide-neutral-100 text-xs">
              {freightQuotes.map((quote, idx) => (
                <div
                  key={idx}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded bg-neutral-100 flex items-center justify-center text-neutral-600 shrink-0">
                      <Truck size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-neutral-900">{quote.logisticName}</span>
                        {quote.recommended && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#567D4A]/10 text-[#567D4A] font-semibold">
                            Recommended
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-neutral-400">
                        Estimated Delivery: <strong>{quote.agingDays}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="sm:text-right">
                    <span className="text-base font-bold text-neutral-900">
                      ₹{quote.priceInr.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[11px] text-neutral-400 block font-mono">
                      ${quote.priceUsd.toFixed(2)} USD
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---------------- SUB-TAB 5: API & CONFIGURATION ---------------- */}
      {subTab === "settings" && (
        <div className="space-y-6 max-w-xl">
          <div className="bg-white p-5 rounded-lg border border-neutral-200">
            <h3 className="text-sm font-semibold text-neutral-900 mb-1 flex items-center gap-2">
              <Settings size={16} className="text-[#567D4A]" />
              <span>CJ Dropshipping Developer API Credentials</span>
            </h3>
            <p className="text-xs text-neutral-500 mb-4">
              Enter your CJ Dropshipping merchant credentials from{" "}
              <a
                href="https://cjdropshipping.com/myCJ.html#/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-[#567D4A] underline"
              >
                CJ Open Platform (My CJ &gt; Authorization &gt; API Key)
              </a>
              .
            </p>

            <form onSubmit={handleTestConnection} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-600 mb-1 font-medium">
                  CJ Account Email
                </label>
                <input
                  type="email"
                  placeholder="your-email@cjdropshipping.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded outline-none focus:border-[#567D4A]"
                />
              </div>

              <div>
                <label className="block text-neutral-600 mb-1 font-medium">
                  CJ Developer API Key
                </label>
                <input
                  type="password"
                  placeholder="32-character CJ API Key..."
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded outline-none focus:border-[#567D4A] font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-600 mb-1 font-medium">
                    USD to INR Exchange Rate
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="86.5"
                    value={exchangeRateInput}
                    onChange={(e) => setExchangeRateInput(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded outline-none focus:border-[#567D4A]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-600 mb-1 font-medium">
                    Default Profit Markup (%)
                  </label>
                  <input
                    type="number"
                    step="1"
                    placeholder="65"
                    value={markupInput}
                    onChange={(e) => setMarkupInput(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded outline-none focus:border-[#567D4A]"
                  />
                </div>
              </div>

              {authResult && (
                <div
                  className={`p-3 rounded text-xs flex items-center gap-2 ${
                    authResult.success
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {authResult.success ? (
                    <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle size={15} className="text-red-500 shrink-0" />
                  )}
                  <span>{authResult.message}</span>
                </div>
              )}

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="submit"
                  disabled={isTestingAuth}
                  className="py-2 px-4 rounded bg-[#567D4A] hover:bg-[#456839] text-white font-medium cursor-pointer transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isTestingAuth ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <Check size={14} />
                      <span>Save &amp; Test Connection</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Quick Info Box */}
          <div className="bg-white p-5 rounded-lg border border-neutral-200 text-xs text-neutral-600 space-y-2">
            <h4 className="font-medium text-neutral-900 mb-1">CJ Dropshipping Integration Features</h4>
            <p>• <strong>1-Click Sourcing:</strong> Seamlessly import curated minimalist lifestyle &amp; tech products directly into Astria Dropstop catalog.</p>
            <p>• <strong>Automatic Pricing:</strong> Automatically converts USD wholesale costs to INR with your custom profit markup.</p>
            <p>• <strong>Automated Air Dispatch:</strong> Orders placed on your storefront are automatically pushed to CJ logistics with tracking.</p>
          </div>
        </div>
      )}

      {/* ---------------- MODAL: INSPECT & CUSTOMIZE CJ PRODUCT ---------------- */}
      {selectedCjProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white border border-neutral-200 rounded-lg p-6 shadow-xl max-h-[90vh] overflow-y-auto text-neutral-900">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-4">
              <div>
                <h3 className="text-base font-semibold text-neutral-900">
                  Inspect CJ Sourcing Product
                </h3>
                <span className="text-xs text-neutral-400 font-mono">
                  PID: {selectedCjProduct.pid} • SKU: {selectedCjProduct.productSku}
                </span>
              </div>
              <button
                onClick={() => setSelectedCjProduct(null)}
                className="text-neutral-400 hover:text-neutral-900 text-sm p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex gap-4 items-start">
                <div className="relative w-24 h-24 rounded border border-neutral-200 overflow-hidden shrink-0">
                  <Image
                    src={selectedCjProduct.productImage}
                    alt={selectedCjProduct.productName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 text-sm mb-1">
                    {selectedCjProduct.productName}
                  </h4>
                  <p className="text-neutral-600 leading-relaxed text-[11px]">
                    {selectedCjProduct.description}
                  </p>
                </div>
              </div>

              {/* Profit customizer */}
              <div className="p-3 bg-neutral-50 rounded border border-neutral-200 space-y-2">
                <span className="font-medium text-neutral-900 block">Pricing &amp; Markup Configuration</span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-neutral-500 block mb-0.5">Wholesale Cost</label>
                    <span className="font-mono text-sm font-semibold text-neutral-900">
                      ${selectedCjProduct.sellPriceUsd} (~₹{Math.round(selectedCjProduct.sellPriceUsd * config.inrExchangeRate)})
                    </span>
                  </div>
                  <div>
                    <label className="text-[11px] text-neutral-500 block mb-0.5">Profit Markup (%)</label>
                    <input
                      type="number"
                      value={importCustomMarkup}
                      onChange={(e) => setImportCustomMarkup(Number(e.target.value))}
                      className="w-full px-2 py-1 bg-white border border-neutral-300 rounded text-xs outline-none focus:border-[#567D4A]"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-200 flex justify-between text-neutral-700">
                  <span>Store Selling Price:</span>
                  <span className="font-bold text-neutral-900 text-sm">
                    ₹{(
                      Math.round(
                        (Math.round(selectedCjProduct.sellPriceUsd * config.inrExchangeRate) *
                          (1 + importCustomMarkup / 100)) /
                          50
                      ) *
                        50 -
                      1
                    ).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Variants */}
              <div>
                <span className="font-medium text-neutral-900 block mb-1">Product Options / Variants:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCjProduct.variants.map((v) => (
                    <span
                      key={v.vid}
                      className="px-2 py-1 rounded bg-neutral-100 text-neutral-800 text-[11px] font-mono border border-neutral-200"
                    >
                      {v.variantName} (${v.variantPriceUsd})
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-neutral-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCjProduct(null)}
                  className="px-3 py-2 rounded border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleImportProduct(selectedCjProduct)}
                  className="px-4 py-2 rounded bg-[#567D4A] hover:bg-[#456839] text-white font-medium flex items-center gap-1.5"
                >
                  <Plus size={14} />
                  <span>Confirm &amp; Import to Storefront</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
