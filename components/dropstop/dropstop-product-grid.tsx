"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { DROPSTOP_PRODUCTS, DropstopProduct } from "@/data/dropstop-products";
import { useDropstop } from "./dropstop-context";
import { getStoredProducts } from "./dropstop-admin-store";

type CategoryFilter = "All" | "Apparel" | "Desk & Tech" | "Everyday Carry" | "Lifestyle";

export function DropstopProductGrid() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const { setSelectedProduct, addToCart } = useDropstop();

  const [products, setProducts] = useState<DropstopProduct[]>(DROPSTOP_PRODUCTS);

  useEffect(() => {
    setProducts(getStoredProducts());
  }, []);

  const categories: CategoryFilter[] = [
    "All",
    "Apparel",
    "Desk & Tech",
    "Everyday Carry",
    "Lifestyle",
  ];

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="max-w-[1140px] mx-auto px-4 sm:px-6 pb-12">
      {/* Category Filter Tabs */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-3 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto text-sm text-neutral-600">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <span className="text-xs text-neutral-400 hidden sm:inline">
          Showing {filteredProducts.length} products
        </span>
      </div>

      {/* WooCommerce-Style Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredProducts.map((product) => {
          return (
            <div
              key={product.id}
              className="bg-white border border-neutral-200 rounded-lg overflow-hidden flex flex-col justify-between hover:border-neutral-300 transition-colors group"
            >
              {/* Image Area - Click opens product detail modal */}
              <div
                onClick={() => setSelectedProduct(product)}
                className="relative aspect-square w-full bg-neutral-100 overflow-hidden cursor-pointer"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-102 transition-transform duration-300"
                />
                {product.isCjSourced && (
                  <span className="absolute top-2 left-2 z-10 text-[10px] uppercase tracking-wider font-semibold bg-white/90 backdrop-blur-xs text-neutral-800 px-2 py-0.5 rounded shadow-xs border border-neutral-200">
                    CJ Direct
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] text-neutral-400 font-normal uppercase tracking-wider block mb-1">
                    {product.category}
                  </span>
                  <h3
                    onClick={() => setSelectedProduct(product)}
                    className="text-sm font-medium text-neutral-900 hover:text-[#567D4A] cursor-pointer line-clamp-1 transition-colors"
                  >
                    {product.name}
                  </h3>

                  <div className="flex items-baseline gap-2 mt-1.5">
                    <span className="text-sm font-medium text-neutral-900">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-neutral-400 line-through">
                        ₹{product.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                </div>

                {/* Add to cart or Out of Stock button */}
                <button
                  disabled={!product.inStock}
                  onClick={() => addToCart(product)}
                  className={`mt-4 w-full py-2 px-3 rounded-md text-xs font-medium transition-colors text-center ${
                    product.inStock
                      ? "bg-[#567D4A] hover:bg-[#456839] text-white cursor-pointer"
                      : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                  }`}
                >
                  {product.inStock ? "Add to cart" : "Out of stock"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
