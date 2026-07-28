"use client";

import { useState } from "react";
import { Search, Plus, Download, Upload, Bell, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useProductsStore } from "@/lib/products-store";
import { ProductEditorModal } from "./ProductEditorModal";
import { ImportExportModal } from "./ImportExportModal";

export function AdminHeader({ title }: { title: string }) {
  const { searchQuery, setSearchQuery, products } = useProductsStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportExportOpen, setIsImportExportOpen] = useState(false);

  return (
    <>
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        {/* Title and Search */}
        <div className="flex items-center gap-6 flex-1 max-w-2xl">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight whitespace-nowrap">{title}</h1>

          <div className="relative w-full max-w-md hidden md:block">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by title, category, slug..."
              className="w-full pl-10 pr-4 py-1.5 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-sm text-slate-900 placeholder-slate-400 rounded-lg border border-transparent focus:border-primary focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-200 px-1.5 py-0.5 rounded"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsImportExportOpen(true)}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Import / Export</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>

          <div className="h-6 w-px bg-slate-200 mx-1" />

          <Link
            href="/products"
            target="_blank"
            className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            title="Preview Public Storefront"
          >
            <ArrowLeft className="w-4 h-4 rotate-135" />
          </Link>
        </div>
      </header>

      {/* Product Editor Modal for Add */}
      {isAddModalOpen && (
        <ProductEditorModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
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
