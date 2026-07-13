import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { CTASection } from "@/components/site/CTASection";
import { brands } from "@/lib/site-data";
import kingroar from "@/assets/king-roar-hero.jpg";
import devamImg from "@/assets/devam-hero.jpg";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Brands | Gravity Industries",
  description: "Every Gravity Industries brand carries the same commitment to quality — ISO 9001:2015 certified, manufactured in Rajkot, dispatched nationwide.",
};

export default function BrandsPage() {
  const cards = [
    { ...brands["king-roar"], img: kingroar },
    { ...brands.devam, img: devamImg },
  ];

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Brands" }]}
        eyebrow="Our Brands"
        title="Two brands, one manufacturer."
        subtitle="Every Gravity Industries brand carries the same commitment to quality — ISO 9001:2015 certified, manufactured in Rajkot, dispatched nationwide."
      />
      <Section bg="white">
        <div className="grid md:grid-cols-2 gap-8">
          {cards.map((b) => (
            <Link key={b.slug} href={`/brands/${b.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
                {/* @ts-ignore */}
                <img src={b.img.src || b.img} alt={b.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" width={1600} height={1000} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <h3 className="text-4xl md:text-5xl font-semibold">{b.name}</h3>
                  <p className="mt-2 text-white/80">{b.tagline}</p>
                </div>
              </div>
              <p className="mt-5 text-muted-foreground">{b.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {b.categories.slice(0, 6).map((c) => (
                  <span key={c} className="text-xs px-3 py-1 rounded-full bg-surface border border-border text-muted-foreground">{c}</span>
                ))}
              </div>
              <div className="mt-8 flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
                Explore {b.name} <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </Section>
      <CTASection />
    </>
  );
}
