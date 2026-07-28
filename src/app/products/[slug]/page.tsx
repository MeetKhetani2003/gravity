import { getProduct, brands } from "@/lib/site-data";
import { ProductDetailClient } from "./ProductDetailClient";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const p = getProduct(resolvedParams.slug);
  if (!p) {
    return {
      title: "Product — Gravity Industries",
    };
  }

  const brandName = brands[p.brand]?.name || p.brand.toUpperCase();

  return {
    title: `${p.name} — ${brandName} | Gravity Industries`,
    description: p.short,
    openGraph: {
      title: p.name,
      description: p.short,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params;
  return <ProductDetailClient slug={resolvedParams.slug} />;
}
