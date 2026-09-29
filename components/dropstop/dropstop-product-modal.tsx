"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Check } from "lucide-react";
import { useDropstop } from "./dropstop-context";

export function DropstopProductModal() {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    setIsCheckoutOpen,
  } = useDropstop();

  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (selectedProduct) {
      setSelectedVariant(
        (selectedProduct.variants && selectedProduct.variants[0]) || "Standard"
      );
      setSelectedImage(selectedProduct.image);
      setQuantity(1);
    }
  }, [selectedProduct]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProduct(null);
    };
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProduct, setSelectedProduct]);

  if (!selectedProduct) return null;

  const handleAdd = () => {
    addToCart(selectedProduct, selectedVariant, quantity);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, selectedVariant, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto"
      onClick={() => setSelectedProduct(null)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-white border border-neutral-200 rounded-lg shadow-xl overflow-hidden my-auto max-h-[90vh] flex flex-col md:flex-row text-neutral-900"
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
          aria-label="Close product view"
        >
          <X size={16} />
        </button>

        {/* Product Image & Gallery */}
        <div className="md:w-1/2 p-6 bg-neutral-50 flex flex-col justify-between shrink-0 border-b md:border-b-0 md:border-r border-neutral-200">
          <div className="relative aspect-square w-full rounded-md overflow-hidden bg-white border border-neutral-200">
            <Image
              src={selectedImage || selectedProduct.image}
              alt={selectedProduct.name}
              fill
              sizes="(max-width: 768px) 100vw, 360px"
              className="object-cover"
              priority
            />
          </div>

          {selectedProduct.gallery && selectedProduct.gallery.length > 1 && (
            <div className="flex items-center gap-2 mt-3">
              {selectedProduct.gallery.map((imgUrl, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`relative w-14 h-14 rounded border overflow-hidden cursor-pointer ${
                    selectedImage === imgUrl
                      ? "border-neutral-900"
                      : "border-neutral-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={imgUrl}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details & Options */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            <span className="text-xs uppercase text-neutral-400 font-normal tracking-wider block mb-1">
              {selectedProduct.category}
            </span>
            <h2
              id="modal-product-title"
              className="text-lg sm:text-xl font-medium text-neutral-900"
            >
              {selectedProduct.name}
            </h2>

            <div className="flex items-baseline gap-2 mt-2 mb-4">
              <span className="text-lg font-medium text-neutral-900">
                ₹{selectedProduct.price.toLocaleString("en-IN")}
              </span>
              {selectedProduct.originalPrice && (
                <span className="text-xs text-neutral-400 line-through">
                  ₹{selectedProduct.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
              {selectedProduct.description}
            </p>

            {/* Variant / Option selector */}
            {selectedProduct.variants && selectedProduct.variants.length > 0 && (
              <div className="mb-4">
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                  Option:
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.variants.map((variant) => {
                    const isSelected = selectedVariant === variant;
                    return (
                      <button
                        key={variant}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-3 py-1 text-xs rounded border transition-colors cursor-pointer ${
                          isSelected
                            ? "border-neutral-900 bg-neutral-900 text-white font-medium"
                            : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"
                        }`}
                      >
                        {variant}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Bullet points */}
            <div className="mb-4 space-y-1">
              {selectedProduct.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-xs text-neutral-600">
                  <span className="text-neutral-400">•</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-neutral-200 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-neutral-300 rounded-md overflow-hidden h-9">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-full flex items-center justify-center text-neutral-600 hover:bg-neutral-100 cursor-pointer text-sm"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-medium text-neutral-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-full flex items-center justify-center text-neutral-600 hover:bg-neutral-100 cursor-pointer text-sm"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAdd}
                className="flex-1 h-9 rounded-md bg-[#567D4A] hover:bg-[#456839] text-white text-xs font-medium transition-colors cursor-pointer text-center"
              >
                Add to cart
              </button>

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                className="flex-1 h-9 rounded-md bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium transition-colors cursor-pointer text-center"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
