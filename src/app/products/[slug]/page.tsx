import Link from "next/link";
import { InquiryModal } from "@/components/site/InquiryModal";
import { ArrowRight, CheckCircle2, Download, MessageCircle, Package } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionTitle } from "@/components/site/Section";
import { getProduct, products, brands, company, type ProductSpec } from "@/lib/site-data";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const resolvedParams = await params;
  const p = getProduct(resolvedParams.slug);
  if (!p) return {};
  
  return {
    title: `${p.name} — ${brands[p.brand].name} | Gravity Industries`,
    description: p.short,
    openGraph: {
      title: p.name,
      description: p.short,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params;
  const p = getProduct(resolvedParams.slug);
  if (!p) notFound();

  const brand = brands[p.brand];
  const related = products.filter((x) => x.brand === p.brand && x.slug !== p.slug).slice(0, 3);
  const catalogFile = p.brand === "king-roar" ? "/downloads/king-roar-price-list.pdf" : "/downloads/devam-price-list.pdf";

  const inquiryMsg = encodeURIComponent(`Hello Gravity Industries, I would like a quote for ${p.name} (${brand.name}).`);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: p.name },
        ]}
        eyebrow={`${brand.name} · ${p.category}`}
        title={p.name}
        subtitle={p.short}
      >
        <div className="flex flex-wrap gap-3">
          <InquiryModal 
            productName={p.name} 
            brandName={brand.name} 
            trigger={
              <button className="btn-primary">
                <MessageCircle size={16} /> Request a Quote
              </button>
            } 
          />
          <a href={catalogFile} target="_blank" rel="noreferrer" className="btn-outline">
            <Download size={16} /> Download PDF
          </a>
        </div>
      </PageHero>

      {/* OVERVIEW + FEATURES */}
      <Section bg="white">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Overview</h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{p.description}</p>

            <h3 className="mt-12 text-2xl font-semibold">Key features</h3>
            <ul className="mt-5 grid sm:grid-cols-2 gap-3">
              {p.features.map((f) => (
                <li key={f} className="flex gap-3 items-start">
                  <CheckCircle2 size={18} className="text-accent shrink-0 mt-1" />
                  <span className="text-foreground">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="bg-surface rounded-2xl border border-border p-8 self-start sticky top-24">
            <div className="text-xs uppercase tracking-widest text-primary font-semibold">Quick facts</div>
            <div className="mt-5 space-y-4 text-sm">
              <Fact k="Brand" v={brand.name} />
              <Fact k="Category" v={p.category} />
              <Fact k="Variants" v={String(p.variants.length)} />
              <Fact k="Total SKUs" v={String(p.variants.reduce((n, v) => n + v.rows.length, 0))} />
              <Fact k="Certification" v="ISO 9001:2015" />
              <Fact k="Made in" v="Rajkot, India" />
            </div>
            <div className="mt-6 pt-6 border-t border-border space-y-3">
              <a href={`tel:${company.phones[0].replace(/\s/g,"")}`} className="btn-outline w-full justify-center">Call {company.phones[0]}</a>
              <InquiryModal 
                productName={p.name} 
                brandName={brand.name} 
                trigger={<button className="btn-primary w-full justify-center">Email Inquiry</button>} 
              />
            </div>
          </aside>
        </div>
      </Section>

      {/* PRICE TABLES */}
      <Section bg="surface">
        <SectionTitle eyebrow="Specifications & Price" title="Full price table." subtitle="Prices ex-factory Rajkot as of July 2024. Dealer margins on request." />
        <div className="space-y-10">
          {p.variants.map((v) => (
            <div key={v.title}>
              <h3 className="text-xl font-semibold mb-4">{v.title}</h3>
              <div className="overflow-x-auto rounded-xl border border-border bg-background">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-primary text-primary-foreground text-left">
                      {p.columns.map((c) => (
                        <th key={c.key} className="px-5 py-3.5 font-medium uppercase text-xs tracking-wider">{c.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {v.rows.map((row, i) => (
                      <tr key={i} className="border-t border-border hover:bg-surface/50">
                        {p.columns.map((c) => (
                          <td key={c.key} className="px-5 py-3.5 text-foreground">{String(row[c.key as keyof typeof row] ?? "—")}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex gap-3 items-center text-sm text-muted-foreground">
          <Package size={16} /> Packaging: standard inner/outer pack; custom packs available on request.
        </div>
      </Section>

      {/* RELATED */}
      {related.length > 0 && (
        <Section bg="white">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <SectionTitle title={`More from ${brand.name}`} />
            <Link href={`/brands/${p.brand}`} className="btn-outline">All {brand.name} <ArrowRight size={16} /></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link key={r.slug} href={`/products/${r.slug}`} className="card-elevated p-6 group">
                <div className="text-xs uppercase tracking-wider text-primary font-semibold">{r.category}</div>
                <h4 className="mt-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{r.name}</h4>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{r.short}</p>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium text-foreground text-right">{v}</span>
    </div>
  );
}
