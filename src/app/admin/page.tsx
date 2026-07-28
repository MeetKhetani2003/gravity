"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Package,
  Layers,
  Tags,
  Plus,
  ArrowRight,
  TrendingUp,
  Award,
  Download,
  ExternalLink,
  ShieldCheck,
  Edit,
  CheckCircle2,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useProductsStore } from "@/lib/products-store";
import { brands as defaultBrands, ProductSpec } from "@/lib/site-data";
import { ProductEditorModal } from "@/components/admin/ProductEditorModal";
import { ImportExportModal } from "@/components/admin/ImportExportModal";

export default function AdminDashboardPage() {
  const { products, allCategories } = useProductsStore();
  const [editingProduct, setEditingProduct] = useState<ProductSpec | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isImportExportOpen, setIsImportExportOpen] = useState(false);

  // Compute metrics
  const totalProducts = products.length;
  const totalSKUs = products.reduce(
    (acc, p) => acc + p.variants.reduce((vAcc, v) => vAcc + v.rows.length, 0),
    0
  );
  const kingRoarCount = products.filter((p) => p.brand === "king-roar").length;
  const devamCount = products.filter((p) => p.brand === "devam").length;

  // Category counts
  const categoryStats = allCategories.map((cat) => {
    const catProducts = products.filter((p) => p.category === cat);
    const catSkus = catProducts.reduce(
      (acc, p) => acc + p.variants.reduce((vAcc, v) => vAcc + v.rows.length, 0),
      0
    );
    return {
      category: cat,
      productCount: catProducts.length,
      skuCount: catSkus,
    };
  }).sort((a, b) => b.productCount - a.productCount);

  return (
    <>
      <AdminHeader title="Dashboard Overview" />

      <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        {/* Welcome Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-primary/90 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-xs mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>Gravity Industries Admin Console</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Product Catalog Management</h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
              Manage all King Roar & Devam products, pricing tables, sizes, variants, and specifications in real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsImportExportOpen(true)}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl backdrop-blur-xs border border-white/20 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Backup Catalog</span>
            </button>
            <button
              onClick={() => setIsAddOpen(true)}
              className="px-4 py-2.5 bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-primary" />
              <span>+ Add New Product</span>
            </button>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Products</p>
              <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{totalProducts}</h3>
              <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Active in catalog
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Package className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total SKUs & Prices</p>
              <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{totalSKUs}</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Across all size variants
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">King Roar Products</p>
              <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{kingRoarCount}</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                {Math.round((kingRoarCount / (totalProducts || 1)) * 100)}% of total catalog
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Devam Products</p>
              <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{devamCount}</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                {Math.round((devamCount / (totalProducts || 1)) * 100)}% of total catalog
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Tags className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Categories Distribution and Brand Breakdown */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Categories list */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Category Breakdown</h3>
                <p className="text-xs text-slate-500">Distribution of products and SKUs across categories.</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                {allCategories.length} Categories
              </span>
            </div>

            <div className="space-y-3">
              {categoryStats.map((stat) => (
                <div key={stat.category} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{stat.category}</span>
                    <span className="text-slate-500 font-mono">
                      {stat.productCount} Products • {stat.skuCount} SKUs
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.max(
                          10,
                          Math.round((stat.productCount / (totalProducts || 1)) * 100)
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions & Brand Summary */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Brand Portfolios</h3>
              <p className="text-xs text-slate-500 mb-4">Core brands under Gravity Industries</p>

              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/50">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-900 text-sm">{defaultBrands["king-roar"].name}</span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-200 text-blue-900">
                      {kingRoarCount} Items
                    </span>
                  </div>
                  <p className="text-xs text-blue-700/80 mt-1 line-clamp-2">{defaultBrands["king-roar"].tagline}</p>
                </div>

                <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/50">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-900 text-sm">{defaultBrands["devam"].name}</span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                      {devamCount} Items
                    </span>
                  </div>
                  <p className="text-xs text-amber-700/80 mt-1 line-clamp-2">{defaultBrands["devam"].tagline}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <Link
                href="/admin/products"
                className="w-full py-2.5 px-4 bg-primary text-white font-bold text-xs rounded-xl shadow-xs hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                <span>Go to Products Table</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Products List */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Recently Cataloged Products</h3>
              <p className="text-xs text-slate-500">Quickly preview or edit your latest catalog additions.</p>
            </div>
            <Link
              href="/admin/products"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span>View All ({products.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.slice(0, 6).map((product) => (
              <div
                key={product.slug}
                className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-white transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary px-2 py-0.5 rounded bg-primary/10">
                      {product.category}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase font-mono">
                      {product.brand}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{product.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">{product.short}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">
                    {product.variants.reduce((n, v) => n + v.rows.length, 0)} SKUs
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="p-1.5 text-slate-600 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors"
                      title="Edit Product"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <Link
                      href={`/products/${product.slug}`}
                      target="_blank"
                      className="p-1.5 text-slate-600 hover:text-emerald-600 hover:bg-slate-100 rounded-lg transition-colors"
                      title="View Live Page"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Add / Edit Modal */}
      {isAddOpen && (
        <ProductEditorModal
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
        />
      )}

      {editingProduct && (
        <ProductEditorModal
          isOpen={!!editingProduct}
          editingProduct={editingProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}

      {/* Import/Export Modal */}
      {isImportExportOpen && (
        <ImportExportModal
          isOpen={isImportExportOpen}
          onClose={() => setIsImportExportOpen(false)}
        />
      )}
    </>
  );
}
