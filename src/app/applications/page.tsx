import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { CTASection } from "@/components/site/CTASection";
import { applications, getProduct } from "@/lib/site-data";
import residential from "@/assets/app-residential.jpg";
import commercial from "@/assets/app-commercial.jpg";
import industrial from "@/assets/app-industrial.jpg";
import agriculture from "@/assets/app-agriculture.jpg";

const imgs: Record<string, any> = {
  residential, commercial, industrial, agriculture,
  "water-supply": industrial,
  infrastructure: commercial,
  construction: residential,
};



export default function ApplicationsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Applications" }]}
        eyebrow="Applications"
        title="Where our products live."
        subtitle="From city apartments to farm irrigation lines and municipal water networks — Gravity Industries products serve seven core application areas."
      />

      <Section bg="white">
        <div className="space-y-24">
          {applications.map((a, i) => (
            <div key={a.slug} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border">
                  <img src={(imgs[a.slug] as any).src || imgs[a.slug]} alt={a.name} className="w-full h-full object-cover" loading="lazy" width={1200} height={800} />
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-primary font-semibold">Application {String(i + 1).padStart(2, "0")}</div>
                <h2 className="mt-3 text-3xl md:text-4xl font-semibold leading-tight">{a.name}</h2>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{a.description}</p>
                <div className="mt-8">
                  <div className="text-sm font-semibold text-foreground mb-3">Recommended products</div>
                  <div className="flex flex-wrap gap-2">
                    {a.products.map((slug) => {
                      const p = getProduct(slug);
                      if (!p) return null;
                      return (
                        <Link key={slug} href={`/products/${slug}`} className="text-sm px-4 py-2 rounded-full bg-surface border border-border hover:border-primary hover:text-primary transition-colors">
                          {p.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
                <Link href="/products" className="mt-8 inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
                  Browse all products <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}

