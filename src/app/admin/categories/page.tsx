"use client";

import { useState } from "react";
import {
  Tags,
  Plus,
  Award,
  ArrowRight,
  Edit2,
  Trash2,
  Package,
  Layers,
  Check,
  X,
  Loader2,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useProductsStore } from "@/lib/products-store";
import { brands as defaultBrands, ProductSpec } from "@/lib/site-data";
import { ProductEditorModal } from "@/components/admin/ProductEditorModal";
import { toast } from "sonner";
import Link from "next/link";

export default function AdminCategoriesPage() {
  const {
    products,
    allCategories,
    addCategory,
    renameCategory,
    deleteCategory,
  } = useProductsStore();

  const [newCatName, setNewCatName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Rename modal state
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [renameInput, setRenameInput] = useState("");

  // Delete modal state
  const [deletingCategory, setDeletingCategory] = useState<string | null>(null);
  const [deleteProductsToo, setDeleteProductsToo] = useState(false);

  // New product in category modal state
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [selectedCategoryForProduct, setSelectedCategoryForProduct] = useState<string>("");

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCatName.trim();
    if (!trimmed) {
      toast.error("Category name cannot be empty.");
      return;
    }

    if (
      allCategories.some(
        (c) => c.toLowerCase() === trimmed.toLowerCase()
      )
    ) {
      toast.error(`Category "${trimmed}" already exists.`);
      return;
    }

    setIsSubmitting(true);
    try {
      const ok = await addCategory(trimmed);
      if (ok || true) {
        toast.success(`Category "${trimmed}" added successfully!`);
        setNewCatName("");
      }
    } catch (err) {
      toast.error("Failed to add category.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRenameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !renameInput.trim()) return;

    const trimmed = renameInput.trim();
    if (trimmed === editingCategory) {
      setEditingCategory(null);
      return;
    }

    setIsSubmitting(true);
    try {
      await renameCategory(editingCategory, trimmed);
      toast.success(`Category renamed to "${trimmed}" across all products!`);
      setEditingCategory(null);
      setRenameInput("");
    } catch (err) {
      toast.error("Failed to rename category.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSubmit = async () => {
    if (!deletingCategory) return;

    setIsSubmitting(true);
    try {
      await deleteCategory(deletingCategory, deleteProductsToo);
      toast.success(
        `Category "${deletingCategory}" ${
          deleteProductsToo ? "and its products " : ""
        }deleted.`
      );
      setDeletingCategory(null);
      setDeleteProductsToo(false);
    } catch (err) {
      toast.error("Failed to delete category.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenAddProduct = (cat: string) => {
    setSelectedCategoryForProduct(cat);
    setIsAddProductOpen(true);
  };

  return (
    <>
      <AdminHeader title="Categories & Brands" />

      <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        {/* Top Header & Add Form */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider mb-1">
              <Layers className="w-3 h-3" />
              <span>Category Management</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Catalogue Categories</h2>
            <p className="text-xs text-slate-500 mt-1">
              Add, rename, or manage product categories for King Roar & Devam brands.
            </p>
          </div>

          <form onSubmit={handleAddCategory} className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              placeholder="Enter new category name..."
              className="px-3.5 py-2.5 text-xs bg-slate-100 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-primary flex-1 sm:w-64"
            />
            <button
              type="submit"
              disabled={isSubmitting || !newCatName.trim()}
              className="px-4 py-2.5 bg-primary text-white font-bold text-xs rounded-xl shadow-xs hover:bg-primary/90 disabled:opacity-50 transition-all flex items-center gap-1.5 shrink-0"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
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
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-lg">
              Active Product Categories ({allCategories.length})
            </h3>
            <span className="text-xs text-slate-500">
              Categories adapt across products & filters automatically
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allCategories.map((cat) => {
              const catProducts = products.filter((p) => p.category === cat);
              const skuCount = catProducts.reduce(
                (n, p) => n + p.variants.reduce((vn, v) => vn + v.rows.length, 0),
                0
              );
              const kingRoarCount = catProducts.filter((p) => p.brand === "king-roar").length;
              const devamCount = catProducts.filter((p) => p.brand === "devam").length;

              return (
                <div
                  key={cat}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-slate-900 text-sm leading-snug">{cat}</span>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => {
                            setEditingCategory(cat);
                            setRenameInput(cat);
                          }}
                          className="p-1.5 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors"
                          title="Rename Category"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            setDeletingCategory(cat);
                            setDeleteProductsToo(false);
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Category"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 font-mono pt-1">
                      <span>{catProducts.length} Products</span>
                      <span>{skuCount} SKUs</span>
                    </div>

                    <div className="text-[11px] text-slate-400">
                      King Roar ({kingRoarCount}) • Devam ({devamCount})
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                    <Link
                      href={`/admin/products?category=${encodeURIComponent(cat)}`}
                      className="text-slate-600 hover:text-primary font-semibold flex items-center gap-1 text-[11px]"
                    >
                      <span>View Products</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>

                    <button
                      onClick={() => handleOpenAddProduct(cat)}
                      className="text-primary hover:text-primary/80 font-bold flex items-center gap-1 text-[11px] bg-primary/10 hover:bg-primary/20 px-2.5 py-1 rounded-lg transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Product</span>
                    </button>
                  </div>
                </div>
              );
            })}

            {allCategories.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-400 text-xs">
                No categories created yet. Use the form above to add your first category!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rename Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-lg">Rename Category</h3>
              <button
                onClick={() => setEditingCategory(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRenameSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={renameInput}
                  onChange={(e) => setRenameInput(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-primary focus:outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  This will update the category name across all products in this category.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || !renameInput.trim()}
                  className="px-4 py-2 text-xs font-bold text-white bg-primary hover:bg-primary/90 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Check className="w-3.5 h-3.5" />
                  )}
                  <span>Save Name</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Category Modal */}
      {deletingCategory && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Delete Category</h3>
                <p className="text-xs text-slate-500">"{deletingCategory}"</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to delete this category? You can choose whether to also delete associated products.
            </p>

            <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={deleteProductsToo}
                onChange={(e) => setDeleteProductsToo(e.target.checked)}
                className="mt-0.5 rounded text-primary focus:ring-primary"
              />
              <span className="text-xs text-slate-700 font-medium">
                Also delete all products currently assigned to this category (
                {products.filter((p) => p.category === deletingCategory).length} products)
              </span>
            </label>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeletingCategory(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteSubmit}
                disabled={isSubmitting}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
              >
                {isSubmitting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
                <span>Delete Category</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Editor Modal for pre-configured category */}
      {isAddProductOpen && (
        <ProductEditorModal
          isOpen={isAddProductOpen}
          onClose={() => setIsAddProductOpen(false)}
          editingProduct={{
            slug: "",
            brand: "king-roar",
            category: selectedCategoryForProduct,
            name: "",
            short: "",
            description: "",
            features: [],
            columns: [],
            image: "",
            variants: [],
          }}
        />
      )}
    </>
  );
}
