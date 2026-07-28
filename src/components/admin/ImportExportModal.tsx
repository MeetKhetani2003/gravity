"use client";

import { useState } from "react";
import { X, Download, Upload, Copy, Check, RotateCcw, AlertTriangle } from "lucide-react";
import { useProductsStore } from "@/lib/products-store";
import { toast } from "sonner";

export function ImportExportModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { products, exportProductsJSON, importProducts, resetToDefaults } = useProductsStore();
  const [activeTab, setActiveTab] = useState<"export" | "import" | "reset">("export");
  const [jsonText, setJsonText] = useState("");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportProductsJSON());
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `gravity-products-catalog-${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success("JSON backup downloaded successfully!");
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(exportProductsJSON());
    setCopied(true);
    toast.success("Copied product catalog JSON to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImportSubmit = () => {
    try {
      if (!jsonText.trim()) {
        toast.error("Please paste valid JSON data to import.");
        return;
      }
      const parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed)) {
        toast.error("Invalid JSON format. Expected an array of products.");
        return;
      }
      importProducts(parsed);
      toast.success(`Successfully imported ${parsed.length} products!`);
      onClose();
    } catch (err) {
      toast.error("Failed to parse JSON. Please check syntax.");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        setJsonText(content);
        toast.success(`Loaded file "${file.name}" into preview`);
      } catch (err) {
        toast.error("Error reading file");
      }
    };
    reader.readAsText(file);
  };

  const handleResetCatalog = () => {
    if (confirm("Reset catalog to factory default products? All custom changes will be erased.")) {
      resetToDefaults();
      toast.success("Catalog reset to factory default products!");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Import & Export Product Data</h2>
            <p className="text-xs text-slate-500">Backup, transfer, or restore your full product catalog.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-100/50 px-5 pt-3">
          <button
            onClick={() => setActiveTab("export")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
              activeTab === "export"
                ? "border-primary text-primary bg-white rounded-t-lg shadow-xs"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Catalog ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("import")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
              activeTab === "import"
                ? "border-primary text-primary bg-white rounded-t-lg shadow-xs"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import JSON</span>
          </button>

          <button
            onClick={() => setActiveTab("reset")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
              activeTab === "reset"
                ? "border-amber-600 text-amber-600 bg-white rounded-t-lg shadow-xs"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {activeTab === "export" && (
            <div className="space-y-5">
              <p className="text-sm text-slate-600">
                You have <strong className="text-slate-900">{products.length} products</strong> in your current database. You can download the JSON file for offsite backups or copy it directly.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleDownloadJSON}
                  className="flex-1 py-3 px-4 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Catalog .JSON</span>
                </button>

                <button
                  onClick={handleCopyJSON}
                  className="py-3 px-4 bg-slate-100 text-slate-800 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-all flex items-center justify-center gap-2 border border-slate-200"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
                  <span>{copied ? "Copied!" : "Copy JSON"}</span>
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  JSON Data Preview
                </label>
                <textarea
                  readOnly
                  value={exportProductsJSON()}
                  rows={8}
                  className="w-full p-3 font-mono text-xs bg-slate-900 text-slate-200 rounded-xl border border-slate-800 focus:outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === "import" && (
            <div className="space-y-5">
              <p className="text-sm text-slate-600">
                Upload a valid JSON catalog file or paste product array JSON to replace or update your product catalog.
              </p>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Select JSON File
                </label>
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileUpload}
                  className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Or Paste JSON Array
                </label>
                <textarea
                  value={jsonText}
                  onChange={(e) => setJsonText(e.target.value)}
                  placeholder="[ { 'slug': 'upvc-ball-valve', 'name': '...' } ]"
                  rows={8}
                  className="w-full p-3 font-mono text-xs bg-slate-50 text-slate-900 rounded-xl border border-slate-200 focus:border-primary focus:outline-none"
                />
              </div>

              <button
                onClick={handleImportSubmit}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Upload className="w-4 h-4" />
                <span>Process and Replace Catalog</span>
              </button>
            </div>
          )}

          {activeTab === "reset" && (
            <div className="space-y-5 text-center py-4">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Reset to Factory Default Catalog</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                  This action will discard all custom products, pricing edits, and categories, restoring the original products from Gravity Industries' July 2024 price lists.
                </p>
              </div>

              <button
                onClick={handleResetCatalog}
                className="py-3 px-6 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm mx-auto"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Confirm Reset to Factory Data</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
