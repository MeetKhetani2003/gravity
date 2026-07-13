"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Filter } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { CTASection } from "@/components/site/CTASection";
import { products, brands } from "@/lib/site-data";

export default function ProductsPage() {
  const [brandFilter, setBrandFilter] = useState<"all" | "king-roar" | "devam">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filtered = products.filter((p) => {
    if (brandFilter !== "all" && p.brand !== brandFilter) return false;
    if (categoryFilter !== "all" && p.category !== categoryFilter) return false;
    return true;
  });

  const categories = Array.from(new Set(
    products.filter(p => brandFilter === "all" || p.brand === brandFilter).map((p) => p.category)
  ));

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
        eyebrow="Product Catalogue"
        title="Every product we manufacture."
        subtitle="Filter by brand or category to find the exact SKU you need. Full price tables, specifications and packaging details on every product page."
      />

      <Section bg="white">
        {/* FILTERS */}
        <div className="mb-10 flex flex-wrap items-center gap-3 pb-6 border-b border-border">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground mr-2"><Filter size={16} /> Filter</span>
          <FilterChip active={brandFilter === "all"} onClick={() => { setBrandFilter("all"); setCategoryFilter("all"); }}>All Brands</FilterChip>
          <FilterChip active={brandFilter === "king-roar"} onClick={() => { setBrandFilter("king-roar"); setCategoryFilter("all"); }}>King Roar</FilterChip>
          <FilterChip active={brandFilter === "devam"} onClick={() => { setBrandFilter("devam"); setCategoryFilter("all"); }}>Devam</FilterChip>
          <div className="w-full h-0" />
          <FilterChip active={categoryFilter === "all"} onClick={() => setCategoryFilter("all")} tone="ghost">All Categories</FilterChip>
          {categories.map((c) => (
            <FilterChip key={c} active={categoryFilter === c} onClick={() => setCategoryFilter(c)} tone="ghost">{c}</FilterChip>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <Link key={p.slug} href={`/products/${p.slug}`} className="card-elevated p-6 group flex flex-col h-full">
              {p.image && (
                <div className="mb-4 aspect-[4/3] rounded-lg bg-surface/50 p-4 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-primary font-semibold">{p.category}</span>
                <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-surface border border-border text-muted-foreground">
                  {brands[p.brand].name}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{p.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{p.short}</p>
              <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{p.variants.reduce((n, v) => n + v.rows.length, 0)} SKUs</span>
                <ArrowRight size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center py-16 text-muted-foreground">No products match the current filter.</p>
        )}
      </Section>

      <CTASection />
    </>
  );
}

function FilterChip({ active, onClick, children, tone = "solid" }: { active: boolean; onClick: () => void; children: React.ReactNode; tone?: "solid" | "ghost" }) {
  const base = "text-sm px-4 py-2 rounded-full border transition-colors";
  if (active) return <button onClick={onClick} className={`${base} bg-primary text-white border-primary`}>{children}</button>;
  return <button onClick={onClick} className={`${base} border-border text-foreground hover:border-primary hover:text-primary ${tone === "ghost" ? "bg-surface" : "bg-background"}`}>{children}</button>;
}
