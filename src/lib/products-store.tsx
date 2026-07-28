"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ProductSpec, products as defaultProducts } from "@/lib/site-data";

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
  addProduct: (product: ProductSpec) => Promise<void>;
  updateProduct: (slug: string, updated: ProductSpec) => Promise<void>;
  deleteProduct: (slug: string) => Promise<void>;
  bulkDeleteProducts: (slugs: string[]) => Promise<void>;
  resetToDefaults: () => Promise<void>;
  importProducts: (newProducts: ProductSpec[]) => Promise<void>;
  exportProductsJSON: () => string;
  allCategories: string[];
  refetchFromDB: () => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<ProductSpec[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [brandFilter, setBrandFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const refetchFromDB = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/products", { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.products) && data.products.length > 0) {
        setProducts(data.products);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.products));
        setIsLoading(false);
        return;
      }
    } catch (e) {
      console.error("Failed to fetch products from MongoDB API, checking local storage", e);
    }

    // Local storage fallback
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
      console.error("Failed to read from local storage", e);
    }

    setProducts(defaultProducts);
    setIsLoading(false);
  };

  useEffect(() => {
    refetchFromDB();
  }, []);

  const saveProductsLocally = (newProducts: ProductSpec[]) => {
    setProducts(newProducts);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
    } catch (e) {
      console.error("Failed to save to local storage", e);
    }
  };

  const addProduct = async (product: ProductSpec) => {
    const exists = products.some((p) => p.slug === product.slug);
    if (exists) {
      product.slug = `${product.slug}-${Math.floor(Math.random() * 1000)}`;
    }
    const updated = [product, ...products];
    saveProductsLocally(updated);

    try {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product }),
      });
    } catch (err) {
      console.error("Failed to persist new product to MongoDB", err);
    }
  };

  const updateProduct = async (slug: string, updatedProduct: ProductSpec) => {
    const updated = products.map((p) => (p.slug === slug ? updatedProduct : p));
    saveProductsLocally(updated);

    try {
      await fetch(`/api/products/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
    } catch (err) {
      console.error("Failed to update product in MongoDB", err);
    }
  };

  const deleteProduct = async (slug: string) => {
    const updated = products.filter((p) => p.slug !== slug);
    saveProductsLocally(updated);

    try {
      await fetch(`/api/products/${slug}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Failed to delete product from MongoDB", err);
    }
  };

  const bulkDeleteProducts = async (slugs: string[]) => {
    const updated = products.filter((p) => !slugs.includes(p.slug));
    saveProductsLocally(updated);

    for (const slug of slugs) {
      try {
        await fetch(`/api/products/${slug}`, { method: "DELETE" });
      } catch (e) {
        // Continue loop
      }
    }
  };

  const resetToDefaults = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/products/seed", { method: "POST" });
      const data = await res.json();
      if (data.success && Array.isArray(data.products)) {
        saveProductsLocally(data.products);
        setIsLoading(false);
        return;
      }
    } catch (e) {
      console.error("Failed to re-seed MongoDB", e);
    }
    saveProductsLocally(defaultProducts);
    setIsLoading(false);
  };

  const importProducts = async (newProducts: ProductSpec[]) => {
    if (Array.isArray(newProducts) && newProducts.length > 0) {
      saveProductsLocally(newProducts);
      try {
        await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ products: newProducts }),
        });
      } catch (e) {
        console.error("Failed to import to MongoDB", e);
      }
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
        refetchFromDB,
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
