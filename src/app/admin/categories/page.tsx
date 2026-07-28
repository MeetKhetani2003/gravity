"use client";

import { useState } from "react";
import { Tags, Plus, Package, Award, ArrowRight, ShieldCheck, Check } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useProductsStore } from "@/lib/products-store";
import { brands as defaultBrands } from "@/lib/site-data";
import { toast } from "sonner";
import Link from "next/link";

export default function AdminCategoriesPage() {
  const { products, allCategories, addProduct } = useProductsStore();
  const [newCatName, setNewCatName] = useState("");

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    if (allCategories.includes(newCatName.trim())) {
      toast.error(`Category "${newCatName.trim()}" already exists.`);
      return;
    }

    // Create a sample draft product in this category to register it
    const catSlug = newCatName.toLowerCase().replace(/[^a-z0-9]/g, "-");
    addProduct({
      slug: `${catSlug}-starter-${Date.now().toString().slice(-4)}`,
      brand: "king-roar",
      category: newCatName.trim(),
      name: `${newCatName.trim()} Item 1`,
      short: `High grade product in ${newCatName.trim()} category`,
      description: `Starter catalog item for ${newCatName.trim()} category`,
      features: ["Manufactured from high grade compound"],
      columns: [
        { key: "size", label: "Size (inch)" },
        { key: "price", label: "Price (₹)" },
      ],
      image: "/images/products/upvc-ball-valve.jpg",
      variants: [
        {
          title: "Standard",
          rows: [{ size: '1/2"', price: "100.00" }],
        },
      ],
    });

    toast.success(`Category "${newCatName.trim()}" created with starter product!`);
    setNewCatName("");
  };

  return (
    <>
      <AdminHeader title="Categories & Brands" />

      <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Categories & Brand Portfolios</h2>
            <p className="text-xs text-slate-500 mt-1">
              Organize your product catalogue into categories and brands (King Roar & Devam).
            </p>
          </div>

          <form onSubmit={handleAddCategory} className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              placeholder="New category name..."
              className="px-3.5 py-2 text-xs bg-slate-100 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white font-bold text-xs rounded-xl shadow-xs hover:bg-primary/90 transition-all flex items-center gap-1 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Category</span>
            </button>
          </form>
        </div>

        {/* Brands Overview Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900 to-slate-900 text-white shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                Core Brand
              </span>
              <Award className="w-6 h-6 text-blue-400" />
            </div>

            <div>
              <h3 className="text-2xl font-black tracking-tight">{defaultBrands["king-roar"].name}</h3>
              <p className="text-xs text-blue-200 mt-1">{defaultBrands["king-roar"].tagline}</p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{defaultBrands["king-roar"].description}</p>

            <div className="pt-4 border-t border-blue-800/80 flex items-center justify-between text-xs">
              <span className="font-bold text-blue-200">
                {products.filter((p) => p.brand === "king-roar").length} Active Products
              </span>
              <Link
                href="/admin/products?brand=king-roar"
                className="text-white hover:text-blue-300 font-bold flex items-center gap-1"
              >
                <span>Manage Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-900 to-slate-900 text-white shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30">
                Core Brand
              </span>
              <Tags className="w-6 h-6 text-amber-400" />
            </div>

            <div>
              <h3 className="text-2xl font-black tracking-tight">{defaultBrands["devam"].name}</h3>
              <p className="text-xs text-amber-200 mt-1">{defaultBrands["devam"].tagline}</p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{defaultBrands["devam"].description}</p>

            <div className="pt-4 border-t border-amber-800/80 flex items-center justify-between text-xs">
              <span className="font-bold text-amber-200">
                {products.filter((p) => p.brand === "devam").length} Active Products
              </span>
              <Link
                href="/admin/products?brand=devam"
                className="text-white hover:text-amber-300 font-bold flex items-center gap-1"
              >
                <span>Manage Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-lg">Active Product Categories ({allCategories.length})</h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allCategories.map((cat) => {
              const catProducts = products.filter((p) => p.category === cat);
              const skuCount = catProducts.reduce(
                (n, p) => n + p.variants.reduce((vn, v) => vn + v.rows.length, 0),
                0
              );

              return (
                <div
                  key={cat}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{cat}</span>
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                      {catProducts.length} Products
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 font-mono">
                    Total SKUs: {skuCount}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400">
                      King Roar ({catProducts.filter((p) => p.brand === "king-roar").length}) • Devam ({catProducts.filter((p) => p.brand === "devam").length})
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
