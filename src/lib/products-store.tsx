"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ProductSpec, products as defaultProducts, brands as defaultBrands } from "@/lib/site-data";

const STORAGE_KEY = "gravity_admin_products_v1";

interface ProductsContextType {
  products: ProductSpec[];
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  brandFilter: string;
  setBrandFilter: (brand: string) => void;
  categoryFilter: string;
  setCategoryFilter: (cat: string) => void;
  addProduct: (product: ProductSpec) => void;
  updateProduct: (slug: string, updated: ProductSpec) => void;
  deleteProduct: (slug: string) => void;
  bulkDeleteProducts: (slugs: string[]) => void;
  resetToDefaults: () => void;
  importProducts: (newProducts: ProductSpec[]) => void;
  exportProductsJSON: () => string;
  allCategories: string[];
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<ProductSpec[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [brandFilter, setBrandFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Load from localStorage or API on initial render
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
          setIsLoading(false);
          return;
        }
      }
    } catch (e) {
      console.error("Failed to load products from local storage", e);
    }
    // Fallback to default products
    setProducts(defaultProducts);
    setIsLoading(false);
  }, []);

  // Save to localStorage whenever products state changes
  const saveProducts = (newProducts: ProductSpec[]) => {
    setProducts(newProducts);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
    } catch (e) {
      console.error("Failed to save products to local storage", e);
    }
  };

  const addProduct = (product: ProductSpec) => {
    const exists = products.some((p) => p.slug === product.slug);
    if (exists) {
      // If slug exists, append random suffix
      product.slug = `${product.slug}-${Math.floor(Math.random() * 1000)}`;
    }
    const updated = [product, ...products];
    saveProducts(updated);
  };

  const updateProduct = (slug: string, updatedProduct: ProductSpec) => {
    const updated = products.map((p) => (p.slug === slug ? updatedProduct : p));
    saveProducts(updated);
  };

  const deleteProduct = (slug: string) => {
    const updated = products.filter((p) => p.slug !== slug);
    saveProducts(updated);
  };

  const bulkDeleteProducts = (slugs: string[]) => {
    const updated = products.filter((p) => !slugs.includes(p.slug));
    saveProducts(updated);
  };

  const resetToDefaults = () => {
    saveProducts(defaultProducts);
  };

  const importProducts = (newProducts: ProductSpec[]) => {
    if (Array.isArray(newProducts) && newProducts.length > 0) {
      saveProducts(newProducts);
    }
  };

  const exportProductsJSON = () => {
    return JSON.stringify(products, null, 2);
  };

  const allCategories = Array.from(new Set(products.map((p) => p.category))).sort();

  return (
    <ProductsContext.Provider
      value={{
        products,
        isLoading,
        searchQuery,
        setSearchQuery,
        brandFilter,
        setBrandFilter,
        categoryFilter,
        setCategoryFilter,
        addProduct,
        updateProduct,
        deleteProduct,
        bulkDeleteProducts,
        resetToDefaults,
        importProducts,
        exportProductsJSON,
        allCategories,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProductsStore() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProductsStore must be used within a ProductsProvider");
  }
  return context;
}
