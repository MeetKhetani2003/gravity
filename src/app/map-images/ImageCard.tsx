"use client";
import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { type ProductSpec } from "@/lib/site-data";

export function ImageCard({ imgPath, products }: { imgPath: string, products: ProductSpec[] }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState("");

  async function handleMap() {
    if (!selectedSlug) return;
    setLoading(true);
    try {
      const res = await fetch("/api/map-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: imgPath, slug: selectedSlug }),
      });
      if (res.ok) {
        toast.success("Image mapped successfully!");
        setSuccess(true);
      } else {
        toast.error("Failed to map image.");
      }
    } catch (e) {
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card-elevated flex flex-col bg-background overflow-hidden border border-border">
      <div className="bg-surface/50 p-4 aspect-square flex items-center justify-center border-b border-border relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgPath} alt="Extracted" className="max-w-full max-h-full object-contain" loading="lazy" />
        {success && (
          <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center backdrop-blur-sm">
            <CheckCircle2 size={48} className="text-green-600 drop-shadow-md" />
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div className="text-[10px] text-muted-foreground truncate">{imgPath.split('/').pop()}</div>
        <select 
          className="w-full text-sm rounded-md border border-input bg-background px-3 py-2"
          value={selectedSlug}
          onChange={(e) => setSelectedSlug(e.target.value)}
          disabled={loading || success}
        >
          <option value="">Select a product...</option>
          {products.map(p => (
            <option key={p.slug} value={p.slug}>{p.name}</option>
          ))}
        </select>
        <button 
          className="btn-primary w-full justify-center disabled:opacity-50"
          onClick={handleMap}
          disabled={!selectedSlug || loading || success}
        >
          {success ? "Mapped!" : loading ? "Mapping..." : "Map to Product"}
        </button>
      </div>
    </div>
  );
}
