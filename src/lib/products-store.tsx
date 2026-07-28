"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ProductSpec, products as defaultProducts } from "@/lib/site-data";

const STORAGE_KEY = "gravity_admin_products_v1";
const CATEGORIES_STORAGE_KEY = "gravity_admin_categories_v1";

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
  addCategory: (name: string) => Promise<boolean>;
  renameCategory: (oldName: string, newName: string) => Promise<boolean>;
  deleteCategory: (categoryName: string, deleteProducts?: boolean) => Promise<boolean>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<ProductSpec[]>([]);
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [brandFilter, setBrandFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const fetchCategoriesFromDB = async () => {
    try {
      const res = await fetch("/api/categories", { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.categories)) {
        setCustomCategories(data.categories);
        localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(data.categories));
        return;
      }
    } catch (e) {
      console.error("Failed to fetch custom categories from API", e);
    }

    try {
      const stored = localStorage.getItem(CATEGORIES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCustomCategories(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to read categories from local storage", e);
    }
  };

  const refetchFromDB = async () => {
    setIsLoading(true);
    await fetchCategoriesFromDB();

    try {
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

  const saveCategoriesLocally = (cats: string[]) => {
    setCustomCategories(cats);
    try {
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(cats));
    } catch (e) {
      console.error("Failed to save categories to local storage", e);
    }
  };

  const addCategory = async (name: string): Promise<boolean> => {
    const trimmed = name.trim();
    if (!trimmed) return false;

    if (allCategories.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
      return false;
    }

    const updated = Array.from(new Set([...customCategories, trimmed]));
    saveCategoriesLocally(updated);

    try {
      await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
      });
    } catch (err) {
      console.error("Failed to persist new category to MongoDB", err);
    }

    return true;
  };

  const renameCategory = async (oldName: string, newName: string): Promise<boolean> => {
    const trimmed = newName.trim();
    if (!trimmed || oldName === trimmed) return false;

    // Update custom categories
    const updatedCats = customCategories.map((c) => (c === oldName ? trimmed : c));
    if (!updatedCats.includes(trimmed)) {
      updatedCats.push(trimmed);
    }
    saveCategoriesLocally(updatedCats);

    // Update products that use oldName
    const updatedProducts = products.map((p) =>
      p.category === oldName ? { ...p, category: trimmed } : p
    );
    saveProductsLocally(updatedProducts);

    try {
      await fetch("/api/categories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldName, newName: trimmed }),
      });
    } catch (err) {
      console.error("Failed to rename category in MongoDB", err);
    }

    return true;
  };

  const deleteCategory = async (
    categoryName: string,
    deleteAssociatedProducts = false
  ): Promise<boolean> => {
    const updatedCats = customCategories.filter((c) => c !== categoryName);
    saveCategoriesLocally(updatedCats);

    if (deleteAssociatedProducts) {
      const remainingProducts = products.filter((p) => p.category !== categoryName);
      saveProductsLocally(remainingProducts);

      const productsToDelete = products.filter((p) => p.category === categoryName);
      for (const p of productsToDelete) {
        try {
          await fetch(`/api/products/${p.slug}`, { method: "DELETE" });
        } catch (e) {
          // ignore
        }
      }
    }

    try {
      await fetch(`/api/categories?name=${encodeURIComponent(categoryName)}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Failed to delete category from MongoDB", err);
    }

    return true;
  };

  const addProduct = async (product: ProductSpec) => {
    const exists = products.some((p) => p.slug === product.slug);
    if (exists) {
      product.slug = `${product.slug}-${Math.floor(Math.random() * 1000)}`;
    }
    const updated = [product, ...products];
    saveProductsLocally(updated);

    // Make sure product category is saved to custom categories as well
    if (product.category && !customCategories.includes(product.category)) {
      addCategory(product.category);
    }

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

    if (updatedProduct.category && !customCategories.includes(updatedProduct.category)) {
      addCategory(updatedProduct.category);
    }

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

  const derivedCategories = Array.from(new Set(products.map((p) => p.category)));
  const allCategories = Array.from(
    new Set([...derivedCategories, ...customCategories])
  )
    .filter(Boolean)
    .sort();

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
        addCategory,
        renameCategory,
        deleteCategory,
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
