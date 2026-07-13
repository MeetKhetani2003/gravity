import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { Section, SectionTitle } from "@/components/site/Section";
import { CTASection } from "@/components/site/CTASection";
import { brands, productsByBrand, type BrandSlug } from "@/lib/site-data";
import kingroar from "@/assets/king-roar-hero.jpg";
import devamImg from "@/assets/devam-hero.jpg";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ brand: string }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const resolvedParams = await params;
  const b = brands[resolvedParams.brand as BrandSlug];
  if (!b) return {};
  
  return {
    title: `${b.name} — ${b.tagline} | Gravity Industries`,
    description: b.description,
    openGraph: {
      title: `${b.name} by Gravity Industries`,
      description: b.description,
    },
  };
}

export default async function BrandPage({ params }: Props) {
  const resolvedParams = await params;
  const brand = brands[resolvedParams.brand as BrandSlug];
  if (!brand) notFound();

  const items = productsByBrand(brand.slug);
  const img = brand.slug === "king-roar" ? kingroar : devamImg;
  const catalogFile = brand.slug === "king-roar" ? "/downloads/king-roar-price-list.pdf" : "/downloads/devam-price-list.pdf";

  const byCategory = brand.categories.map((cat: string) => ({
    cat,
    items: items.filter((p) => p.category === cat),
  })).filter((g: { items: unknown[] }) => g.items.length > 0);

  return (
    <>
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 bg-[oklch(0.20_0.04_235)] text-white overflow-hidden">
        {/* @ts-ignore NextJS image import object compatibility */}
        <img src={img.src || img} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" loading="eager" width={1600} height={1000} />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.16_0.03_235)]/95 to-[oklch(0.16_0.03_235)]/60" />
        <div className="container-page relative">
          <nav className="flex items-center gap-1.5 text-xs text-white/60 mb-6">
            <Link href="/" className="hover:text-white">Home</Link><span>›</span>
            <Link href="/brands" className="hover:text-white">Brands</Link><span>›</span>
            <span className="text-white font-medium">{brand.name}</span>
          </nav>
          <div className="text-xs uppercase tracking-widest text-accent font-semibold">By Gravity Industries</div>
          <h1 className="mt-4 text-5xl md:text-7xl font-semibold leading-[1.02]">{brand.name}</h1>
          <p className="mt-4 text-xl text-white/80 max-w-2xl">{brand.tagline}</p>
          <p className="mt-6 text-white/70 max-w-2xl leading-relaxed">{brand.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/products?brand=${brand.slug}`} className="btn-primary">Browse products <ArrowRight size={16} /></Link>
            <a href={catalogFile} target="_blank" rel="noreferrer" className="btn-ghost-light"><Download size={16} /> Download Catalogue</a>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <Section bg="white">
        <SectionTitle eyebrow="Product categories" title={`${brand.name} product range.`} />
        <div className="space-y-16">
          {byCategory.map((group) => (
            <div key={group.cat}>
              <div className="flex items-end justify-between border-b border-border pb-4 mb-6">
                <h3 className="text-2xl md:text-3xl font-semibold">{group.cat}</h3>
                <span className="text-sm text-muted-foreground">{group.items.length} {group.items.length === 1 ? "product" : "products"}</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.items.map((p) => (
                  <Link key={p.slug} href={`/products/${p.slug}`} className="card-elevated p-6 group">
                    <div className="text-xs uppercase tracking-wider text-primary font-semibold">{p.category}</div>
                    <h4 className="mt-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{p.name}</h4>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{p.short}</p>
                    <div className="mt-5 pt-4 border-t border-border flex items-center justify-end">
                      <ArrowRight size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
