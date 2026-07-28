"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Package,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit,
  ExternalLink,
  Copy,
  Check,
  ArrowUpDown,
  Download,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useProductsStore } from "@/lib/products-store";
import { ProductSpec, brands as defaultBrands } from "@/lib/site-data";
import { ProductEditorModal } from "@/components/admin/ProductEditorModal";
import { ImportExportModal } from "@/components/admin/ImportExportModal";
import { toast } from "sonner";

export default function AdminProductsPage() {
  const {
    products,
    searchQuery,
    setSearchQuery,
    brandFilter,
    setBrandFilter,
    categoryFilter,
    setCategoryFilter,
    deleteProduct,
    bulkDeleteProducts,
    allCategories,
  } = useProductsStore();

  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [editingProduct, setEditingProduct] = useState<ProductSpec | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportExportOpen, setIsImportExportOpen] = useState(false);

  // Sorting State
  const [sortField, setSortField] = useState<"name" | "brand" | "category" | "skus">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchSlug = p.slug.toLowerCase().includes(q);
          const matchCategory = p.category.toLowerCase().includes(q);
          const matchShort = p.short?.toLowerCase().includes(q);
          if (!matchName && !matchSlug && !matchCategory && !matchShort) {
            return false;
          }
        }
        // Brand filter
        if (brandFilter !== "all" && p.brand !== brandFilter) {
          return false;
        }
        // Category filter
        if (categoryFilter !== "all" && p.category !== categoryFilter) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        let valA: string | number = "";
        let valB: string | number = "";

        if (sortField === "name") {
          valA = a.name.toLowerCase();
          valB = b.name.toLowerCase();
        } else if (sortField === "brand") {
          valA = a.brand.toLowerCase();
          valB = b.brand.toLowerCase();
        } else if (sortField === "category") {
          valA = a.category.toLowerCase();
          valB = b.category.toLowerCase();
        } else if (sortField === "skus") {
          valA = a.variants.reduce((n, v) => n + v.rows.length, 0);
          valB = b.variants.reduce((n, v) => n + v.rows.length, 0);
        }

        if (valA < valB) return sortDirection === "asc" ? -1 : 1;
        if (valA > valB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
  }, [products, searchQuery, brandFilter, categoryFilter, sortField, sortDirection]);

  // Paginated Products
  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  // Handlers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedSlugs(paginatedProducts.map((p) => p.slug));
    } else {
      setSelectedSlugs([]);
    }
  };

  const handleToggleSelect = (slug: string) => {
    if (selectedSlugs.includes(slug)) {
      setSelectedSlugs(selectedSlugs.filter((s) => s !== slug));
    } else {
      setSelectedSlugs([...selectedSlugs, slug]);
    }
  };

  const handleDeleteSingle = (product: ProductSpec) => {
    if (confirm(`Are you sure you want to delete "${product.name}"? This action cannot be undone.`)) {
      deleteProduct(product.slug);
      toast.success(`Product "${product.name}" deleted.`);
    }
  };

  const handleBulkDelete = () => {
    if (selectedSlugs.length === 0) return;
    if (confirm(`Are you sure you want to delete ${selectedSlugs.length} selected products?`)) {
      bulkDeleteProducts(selectedSlugs);
      setSelectedSlugs([]);
      toast.success(`Successfully deleted ${selectedSlugs.length} products.`);
    }
  };

  const toggleSort = (field: "name" | "brand" | "category" | "skus") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <>
      <AdminHeader title="Products Catalog" />

      <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        {/* Filter Toolbar */}
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Brand Filter Pills */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Brand:
              </span>
              <button
                onClick={() => { setBrandFilter("all"); setCurrentPage(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  brandFilter === "all"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All Brands ({products.length})
              </button>
              <button
                onClick={() => { setBrandFilter("king-roar"); setCurrentPage(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  brandFilter === "king-roar"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                King Roar ({products.filter((p) => p.brand === "king-roar").length})
              </button>
              <button
                onClick={() => { setBrandFilter("devam"); setCurrentPage(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  brandFilter === "devam"
                    ? "bg-amber-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Devam ({products.filter((p) => p.brand === "devam").length})
              </button>
            </div>

            {/* Category Dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
                className="px-3.5 py-1.5 text-xs font-semibold bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:border-primary text-slate-800"
              >
                <option value="all">All Categories</option>
                {allCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search and Bulk Operations row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  placeholder="Filter table by title, SKU, or category..."
                  className="w-full pl-9 pr-4 py-1.5 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 rounded-lg border border-slate-200 focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Selected Bulk Actions */}
            <div className="flex items-center gap-3">
              {selectedSlugs.length > 0 && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 px-3 py-1 rounded-lg">
                  <span className="text-xs font-bold text-red-700">
                    {selectedSlugs.length} selected
                  </span>
                  <button
                    onClick={handleBulkDelete}
                    className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] rounded transition-all flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Delete Selected
                  </button>
                </div>
              )}

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Product</span>
              </button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/80 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200 select-none">
                <tr>
                  <th className="px-4 py-3.5 w-10">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        paginatedProducts.length > 0 &&
                        paginatedProducts.every((p) => selectedSlugs.includes(p.slug))
                      }
                      className="rounded border-slate-300 text-primary focus:ring-primary"
                    />
                  </th>
                  <th className="px-4 py-3.5">Product</th>
                  <th
                    className="px-4 py-3.5 cursor-pointer hover:text-slate-900 transition-colors"
                    onClick={() => toggleSort("brand")}
                  >
                    <div className="flex items-center gap-1">
                      <span>Brand</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th
                    className="px-4 py-3.5 cursor-pointer hover:text-slate-900 transition-colors"
                    onClick={() => toggleSort("category")}
                  >
                    <div className="flex items-center gap-1">
                      <span>Category</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th
                    className="px-4 py-3.5 cursor-pointer hover:text-slate-900 transition-colors"
                    onClick={() => toggleSort("skus")}
                  >
                    <div className="flex items-center gap-1">
                      <span>Variants & SKUs</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedProducts.map((product) => {
                  const isSelected = selectedSlugs.includes(product.slug);
                  const totalSkuCount = product.variants.reduce((n, v) => n + v.rows.length, 0);

                  return (
                    <tr
                      key={product.slug}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isSelected ? "bg-primary/5" : ""
                      }`}
                    >
                      <td className="px-4 py-3.5">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(product.slug)}
                          className="rounded border-slate-300 text-primary focus:ring-primary"
                        />
                      </td>

                      {/* Title & Image */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 p-1 flex items-center justify-center shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={product.image || "/images/products/upvc-ball-valve.jpg"}
                              alt={product.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                          <div className="min-w-0">
                            <span className="font-bold text-slate-900 text-sm block truncate hover:text-primary transition-colors">
                              {product.name}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono block truncate">
                              /{product.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Brand Badge */}
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                            product.brand === "king-roar"
                              ? "bg-blue-100 text-blue-800 border border-blue-200"
                              : "bg-amber-100 text-amber-800 border border-amber-200"
                          }`}
                        >
                          {product.brand === "king-roar" ? "King Roar" : "Devam"}
                        </span>
                      </td>

                      {/* Category Badge */}
                      <td className="px-4 py-3.5">
                        <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                          {product.category}
                        </span>
                      </td>

                      {/* SKUs Count */}
                      <td className="px-4 py-3.5">
                        <div className="text-xs">
                          <span className="font-bold text-slate-900 block font-mono">
                            {totalSkuCount} SKUs
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            {product.variants.length} Variant Group{product.variants.length > 1 ? "s" : ""}
                          </span>
                        </div>
                      </td>

                      {/* Row Action Buttons */}
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setEditingProduct(product)}
                            className="p-2 text-slate-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                            title="Edit Product Details & Prices"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          <Link
                            href={`/products/${product.slug}`}
                            target="_blank"
                            className="p-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                            title="View Public Product Page"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => handleDeleteSingle(product)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      No products match your active search or filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
            <div>
              Showing <strong className="text-slate-900">{filteredProducts.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}</strong> to{" "}
              <strong className="text-slate-900">
                {Math.min(currentPage * pageSize, filteredProducts.length)}
              </strong>{" "}
              of <strong className="text-slate-900">{filteredProducts.length}</strong> products
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1.5 border border-slate-300 rounded-lg disabled:opacity-40 hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-semibold px-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-1.5 border border-slate-300 rounded-lg disabled:opacity-40 hover:bg-white transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Add / Edit Modal */}
      {isAddModalOpen && (
        <ProductEditorModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}

      {editingProduct && (
        <ProductEditorModal
          isOpen={!!editingProduct}
          editingProduct={editingProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}

      {/* Import / Export Modal */}
      {isImportExportOpen && (
        <ImportExportModal
          isOpen={isImportExportOpen}
          onClose={() => setIsImportExportOpen(false)}
        />
      )}
    </>
  );
}
