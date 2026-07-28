"use client";

import { useState, useEffect } from "react";
import { X, Plus, Trash2, Check, HelpCircle, Layers, Table, Sparkles, Image as ImageIcon } from "lucide-react";
import { ProductSpec, PriceRow } from "@/lib/site-data";
import { useProductsStore } from "@/lib/products-store";
import { toast } from "sonner";

export function ProductEditorModal({
  isOpen,
  onClose,
  editingProduct,
}: {
  isOpen: boolean;
  onClose: () => void;
  editingProduct?: ProductSpec | null;
}) {
  const { addProduct, updateProduct, allCategories } = useProductsStore();
  const [activeTab, setActiveTab] = useState<"general" | "features" | "variants">("general");

  // Form State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [brand, setBrand] = useState<"king-roar" | "devam">("king-roar");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // Features
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeatureText, setNewFeatureText] = useState("");

  // Variants & Table Rows
  const [variants, setVariants] = useState<
    { title: string; rows: PriceRow[] }[]
  >([]);

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name || "");
      setSlug(editingProduct.slug || "");
      setBrand(editingProduct.brand || "king-roar");
      setCategory(editingProduct.category || "");
      setShortDesc(editingProduct.short || "");
      setDescription(editingProduct.description || "");
      setImage(editingProduct.image || "/images/products/upvc-ball-valve.jpg");
      setFeatures(editingProduct.features || []);
      setVariants(editingProduct.variants || []);
    } else {
      // Default new product values
      setName("");
      setSlug("");
      setBrand("king-roar");
      setCategory(allCategories[0] || "Ball Valves");
      setShortDesc("");
      setDescription("");
      setImage("/images/products/upvc-ball-valve.jpg");
      setFeatures([
        "Manufactured from high grade virgin compound",
        "Leak-proof full bore design",
        "High durability under pressure",
      ]);
      setVariants([
        {
          title: "Standard Variant",
          rows: [
            { size: '1/2"', sizeMm: "15 mm", price: "50.00", innerPkt: "20", outerPkt: "200" },
            { size: '3/4"', sizeMm: "20 mm", price: "75.00", innerPkt: "15", outerPkt: "150" },
            { size: '1"', sizeMm: "25 mm", price: "110.00", innerPkt: "10", outerPkt: "100" },
          ],
        },
      ]);
    }
  }, [editingProduct, allCategories]);

  if (!isOpen) return null;

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingProduct) {
      // Auto-generate slug
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      setSlug(generated);
    }
  };

  const handleAddFeature = () => {
    if (newFeatureText.trim()) {
      setFeatures([...features, newFeatureText.trim()]);
      setNewFeatureText("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleAddVariantGroup = () => {
    setVariants([
      ...variants,
      {
        title: `Variant Group ${variants.length + 1}`,
        rows: [
          { size: '1/2"', sizeMm: "15 mm", price: "0.00", innerPkt: "10", outerPkt: "100" },
        ],
      },
    ]);
  };

  const handleRemoveVariantGroup = (vIndex: number) => {
    setVariants(variants.filter((_, i) => i !== vIndex));
  };

  const handleAddRow = (vIndex: number) => {
    const updated = [...variants];
    updated[vIndex].rows.push({
      size: '1/2"',
      sizeMm: "15 mm",
      price: "0.00",
      altPrice: "",
      innerPkt: "10",
      outerPkt: "100",
    });
    setVariants(updated);
  };

  const handleRowChange = (
    vIndex: number,
    rIndex: number,
    field: keyof PriceRow,
    value: string
  ) => {
    const updated = [...variants];
    updated[vIndex].rows[rIndex] = {
      ...updated[vIndex].rows[rIndex],
      [field]: value,
    };
    setVariants(updated);
  };

  const handleRemoveRow = (vIndex: number, rIndex: number) => {
    const updated = [...variants];
    updated[vIndex].rows = updated[vIndex].rows.filter((_, i) => i !== rIndex);
    setVariants(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalCategory = category === "CUSTOM" ? customCategory : category;

    if (!name.trim()) {
      toast.error("Product name is required.");
      return;
    }
    if (!slug.trim()) {
      toast.error("Product slug is required.");
      return;
    }
    if (!finalCategory.trim()) {
      toast.error("Product category is required.");
      return;
    }

    const productPayload: ProductSpec = {
      slug: slug.trim(),
      brand,
      category: finalCategory.trim(),
      name: name.trim(),
      short: shortDesc.trim() || `${name} manufactured by Gravity Industries`,
      description: description.trim() || `${name} manufactured from high grade materials for long service life.`,
      features: features.length > 0 ? features : ["High quality engineering"],
      image: image.trim() || "/images/products/upvc-ball-valve.jpg",
      columns: [
        { key: "size", label: "Size (inch)" },
        { key: "sizeMm", label: "Size (mm)" },
        { key: "price", label: "Price (₹)" },
        { key: "altPrice", label: "Alt Price (₹)" },
        { key: "innerPkt", label: "Inner Pkt" },
        { key: "outerPkt", label: "Outer Pkt" },
      ],
      variants: variants.length > 0 ? variants : [{ title: "Standard", rows: [] }],
    };

    if (editingProduct) {
      updateProduct(editingProduct.slug, productPayload);
      toast.success(`Product "${name}" updated successfully!`);
    } else {
      addProduct(productPayload);
      toast.success(`Product "${name}" created successfully!`);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              {editingProduct ? "Edit Existing Product" : "New Catalog Item"}
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              {editingProduct ? editingProduct.name : "Add New Product"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-100/50 px-6 pt-3">
          <button
            onClick={() => setActiveTab("general")}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === "general"
                ? "border-primary text-primary bg-white rounded-t-xl shadow-xs"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>1. General & Info</span>
          </button>

          <button
            onClick={() => setActiveTab("features")}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === "features"
                ? "border-primary text-primary bg-white rounded-t-xl shadow-xs"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>2. Features ({features.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("variants")}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === "variants"
                ? "border-primary text-primary bg-white rounded-t-xl shadow-xs"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>3. Variants & Prices ({variants.reduce((n, v) => n + v.rows.length, 0)} SKUs)</span>
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === "general" && (
            <div className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. KingRoar uPVC Ball Valve"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. upvc-ball-valve"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-primary focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Brand *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setBrand("king-roar")}
                      className={`p-3 text-xs font-bold rounded-lg border transition-all text-center ${
                        brand === "king-roar"
                          ? "border-primary bg-primary/10 text-primary shadow-xs"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      King Roar
                    </button>
                    <button
                      type="button"
                      onClick={() => setBrand("devam")}
                      className={`p-3 text-xs font-bold rounded-lg border transition-all text-center ${
                        brand === "devam"
                          ? "border-primary bg-primary/10 text-primary shadow-xs"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      Devam
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-primary focus:outline-none"
                  >
                    {allCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="CUSTOM">+ Add New Custom Category...</option>
                  </select>

                  {category === "CUSTOM" && (
                    <input
                      type="text"
                      required
                      placeholder="Type custom category name..."
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      className="mt-2 w-full px-3.5 py-2 text-sm bg-amber-50 border border-amber-300 rounded-lg focus:outline-none"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Short Tagline / Summary
                </label>
                <input
                  type="text"
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="e.g. Premium uPVC ball valve — short & long handle variants"
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Detailed Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Comprehensive description for buyers and engineers..."
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Product Image URL
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="/images/products/upvc-ball-valve.jpg"
                    className="flex-1 px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-primary focus:outline-none font-mono"
                  />
                  {image && (
                    <div className="w-10 h-10 rounded-lg border border-slate-200 bg-slate-50 p-1 flex items-center justify-center shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={image} alt="Preview" className="max-w-full max-h-full object-contain" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "features" && (
            <div className="space-y-5">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFeatureText}
                  onChange={(e) => setNewFeatureText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddFeature();
                    }
                  }}
                  placeholder="Add a new feature (e.g., Manufactured from virgin uPVC compound)"
                  className="flex-1 px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-primary focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-4 py-2 bg-primary text-white font-semibold text-xs rounded-lg hover:bg-primary/90 transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>

              <div className="space-y-2">
                {features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors"
                  >
                    <span className="text-xs text-slate-800 font-medium">
                      • {feat}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(idx)}
                      className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {features.length === 0 && (
                  <p className="text-center py-8 text-xs text-slate-400">
                    No feature bullet points added yet. Type above and click Add.
                  </p>
                )}
              </div>
            </div>
          )}

          {activeTab === "variants" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">
                  Manage variants (e.g. Short Handle, Long Handle) and SKU pricing table rows:
                </span>
                <button
                  type="button"
                  onClick={handleAddVariantGroup}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg border border-slate-300 transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Variant Group</span>
                </button>
              </div>

              {variants.map((variant, vIdx) => (
                <div
                  key={vIdx}
                  className="p-4 border border-slate-200 rounded-2xl bg-slate-50/50 space-y-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <input
                      type="text"
                      value={variant.title}
                      onChange={(e) => {
                        const updated = [...variants];
                        updated[vIdx].title = e.target.value;
                        setVariants(updated);
                      }}
                      placeholder="Variant Title (e.g. Short Handle)"
                      className="font-bold text-sm bg-white px-3 py-1.5 border border-slate-300 rounded-lg focus:border-primary focus:outline-none"
                    />

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleAddRow(vIdx)}
                        className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-lg border border-emerald-200 transition-all flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Size Row</span>
                      </button>

                      {variants.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveVariantGroup(vIdx)}
                          className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                          title="Delete Variant Group"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Size Rows Table */}
                  <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-2xs">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                        <tr>
                          <th className="px-3 py-2">Size (Inch)</th>
                          <th className="px-3 py-2">Size (mm)</th>
                          <th className="px-3 py-2">Price (₹)</th>
                          <th className="px-3 py-2">Alt Price</th>
                          <th className="px-3 py-2">Inner Pkt</th>
                          <th className="px-3 py-2">Outer Pkt</th>
                          <th className="px-2 py-2 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {variant.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50">
                            <td className="p-2">
                              <input
                                type="text"
                                value={row.size || ""}
                                onChange={(e) =>
                                  handleRowChange(vIdx, rIdx, "size", e.target.value)
                                }
                                className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none"
                              />
                            </td>
                            <td className="p-2">
                              <input
                                type="text"
                                value={row.sizeMm || ""}
                                onChange={(e) =>
                                  handleRowChange(vIdx, rIdx, "sizeMm", e.target.value)
                                }
                                className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none"
                              />
                            </td>
                            <td className="p-2">
                              <input
                                type="text"
                                value={row.price || ""}
                                onChange={(e) =>
                                  handleRowChange(vIdx, rIdx, "price", e.target.value)
                                }
                                className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none font-semibold text-emerald-700"
                              />
                            </td>
                            <td className="p-2">
                              <input
                                type="text"
                                value={row.altPrice || ""}
                                onChange={(e) =>
                                  handleRowChange(vIdx, rIdx, "altPrice", e.target.value)
                                }
                                className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none text-slate-500"
                              />
                            </td>
                            <td className="p-2">
                              <input
                                type="text"
                                value={row.innerPkt || ""}
                                onChange={(e) =>
                                  handleRowChange(vIdx, rIdx, "innerPkt", e.target.value)
                                }
                                className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none"
                              />
                            </td>
                            <td className="p-2">
                              <input
                                type="text"
                                value={row.outerPkt || ""}
                                onChange={(e) =>
                                  handleRowChange(vIdx, rIdx, "outerPkt", e.target.value)
                                }
                                className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none"
                              />
                            </td>
                            <td className="p-2 text-right">
                              <button
                                type="button"
                                onClick={() => handleRemoveRow(vIdx, rIdx)}
                                className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Form Actions Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3 sticky bottom-0 bg-white py-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-bold text-white bg-primary hover:bg-primary/90 rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{editingProduct ? "Save Product Changes" : "Create Product"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
