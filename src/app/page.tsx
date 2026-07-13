import Link from "next/link";
import { ArrowRight, Award, CheckCircle2, Download, Factory, Layers, ShieldCheck, Truck } from "lucide-react";
import hero from "@/assets/hero-factory.jpg";
import kingroar from "@/assets/king-roar-hero.jpg";
import devamImg from "@/assets/devam-hero.jpg";
import { Section, SectionTitle } from "@/components/site/Section";
import { CTASection } from "@/components/site/CTASection";
import { company, stats, products } from "@/lib/site-data";



export default function Home() {
  const featured = ["upvc-ball-valve", "devam-concealed-valve", "rcc-nail-clamps", "abs-showers", "solvent-cement", "cp-extension-nipples"]
    .map((s) => products.find((p) => p.slug === s)!).filter(Boolean);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden">
        <img src={hero.src} alt="Gravity Industries manufacturing facility" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.16_0.03_235)]/95 via-[oklch(0.16_0.03_235)]/70 to-[oklch(0.16_0.03_235)]/20" />
        <div className="container-page relative pt-24 pb-16 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur px-3 py-1.5 text-xs font-medium text-white/90 uppercase tracking-wider">
              <ShieldCheck size={14} className="text-accent" /> ISO 9001:2015 Certified · Since {company.since}
            </div>
            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.02]">
              Engineering water,<br />built to last.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
              Gravity Industries is a Rajkot-based ISO 9001:2015 manufacturer of premium plumbing fittings, bathware and plastic products — under two trusted brands, <strong className="text-white">King Roar</strong> and <strong className="text-white">Devam</strong>.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary text-base py-4 px-7">
                Explore Products <ArrowRight size={18} />
              </Link>
              <Link href="/contact" className="btn-ghost-light py-4 px-7">
                Become a Dealer
              </Link>
            </div>
          </div>

          <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 max-w-4xl">
            {stats.map((s) => (
              <div key={s.label} className="text-white">
                <div className="text-3xl md:text-5xl font-semibold text-white">{s.value}</div>
                <div className="mt-1 text-xs md:text-sm text-white/60 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <Section bg="white">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="eyebrow mb-5">About Gravity Industries</div>
            <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
              A one-stop manufacturer for plumbing, sanitary & drainage.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Based in Rajkot, Gujarat, Gravity Industries has been synonymous with quality, commitment and service since 2010. As an ISO 9001:2015 certified company, we manufacture high-quality plastic products, PVC products, bathware and pipe fittings for dealers, distributors, builders and export buyers across India and beyond.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                ["Plumbing Fittings", "uPVC, cPVC & CP fittings"],
                ["Bathware", "Taps, showers, accessories"],
                ["Pipe Clamps", "RCC, MS, SS, GI variants"],
                ["Plastic Products", "PP, PVC utility products"],
              ].map(([t, s]) => (
                <div key={t} className="flex gap-3">
                  <CheckCircle2 className="text-accent shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="font-medium text-foreground">{t}</p>
                    <p className="text-sm text-muted-foreground">{s}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
              About the company <ArrowRight size={16} />
            </Link>
          </div>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border">
            <img src={kingroar.src} alt="Premium pipe fittings" className="w-full h-full object-cover" loading="lazy" width={1600} height={1000} />
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur rounded-xl p-5 border border-border shadow-lg">
              <div className="text-xs uppercase tracking-wider text-primary font-semibold">Certified quality</div>
              <p className="mt-1 font-medium text-foreground">ISO 9001:2015 Quality Management System</p>
            </div>
          </div>
        </div>
      </Section>

      {/* WHY GRAVITY */}
      <Section bg="surface">
        <SectionTitle eyebrow="Why Gravity" title="Built on quality. Trusted by professionals." subtitle="Everything we make is measured against a simple standard — reliability that dealers, plumbers and contractors can stake their name on." />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Factory, t: "In-house manufacturing", d: "End-to-end control across moulding, finishing and quality inspection at our Rajkot facility." },
            { icon: ShieldCheck, t: "ISO 9001:2015", d: "Certified quality management, applied consistently across every SKU we ship." },
            { icon: Layers, t: "Wide product range", d: "150+ SKUs across pipe fittings, valves, clamps, bathware and plastic products." },
            { icon: Truck, t: "Nationwide distribution", d: "Reliable supply and dealership network across India, with export capability." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="card-elevated p-7">
              <Icon className="text-primary" size={28} />
              <h3 className="mt-5 text-lg font-semibold text-foreground">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* BRANDS */}
      <Section bg="white">
        <SectionTitle eyebrow="Our Brands" title="Two brands. One commitment to quality." subtitle="King Roar leads on pipe fittings and clamps. Devam leads on bathware and plumbing accessories. Both carry the Gravity Industries quality mark." />
        <div className="grid md:grid-cols-2 gap-8">
          <BrandCard
            img={kingroar.src}
            eyebrow="Brand 01"
            name="King Roar"
            tagline="Premium Pipe Fittings & Clamps"
            desc="The choice for high-strength PVC, uPVC, cPVC ball valves, concealed valves, and robust metal pipe clamps."
            to="/brands/king-roar"
          />
          <BrandCard
            img={devamImg.src}
            eyebrow="Brand 02"
            name="Devam"
            tagline="Bathware & Plumbing Accessories"
            desc="Unbreakable PTMT connection pipes, ABS showers, Nahani traps, and premium sink wastes."
            to="/brands/devam"
          />
        </div>
      </Section>

      {/* FEATURED PRODUCTS */}
      <Section bg="surface">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <SectionTitle eyebrow="Featured products" title="Best-selling ranges." />
          <Link href="/products" className="btn-outline">View all products <ArrowRight size={16} /></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => (
            <Link key={p.slug} href={`/products/${p.slug}`} className="card-elevated p-6 flex flex-col group h-full">
              {p.image && (
                <div className="mb-4 aspect-[4/3] rounded-lg bg-surface/50 p-4 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
              )}
              <div className="text-xs uppercase tracking-wider text-primary font-semibold">{p.category}</div>
              <h3 className="mt-2 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">{p.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{p.short}</p>
              <div className="mt-auto pt-5 border-t border-border flex items-center justify-between">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{p.brand === "king-roar" ? "King Roar" : "Devam"}</span>
                <ArrowRight size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* QUALITY / CERTIFICATION */}
      <Section bg="white">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-surface rounded-2xl p-10 md:p-14 border border-border">
              <Award size={44} className="text-accent" />
              <div className="mt-6 text-6xl md:text-7xl font-semibold text-foreground leading-none">ISO<br />9001:2015</div>
              <p className="mt-6 text-muted-foreground">Certified Quality Management System — applied end-to-end from raw material to finished goods.</p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="eyebrow mb-5">Manufacturing & quality</div>
            <h2 className="text-3xl md:text-5xl font-semibold leading-tight">From raw compound to shipped SKU — quality checks at every stage.</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Our manufacturing process is engineered around consistency. Virgin compound sourcing, precision moulding, in-line inspection and batch-wise quality release ensure that every carton leaving our factory meets the same standard.
            </p>
            <ul className="mt-8 space-y-4">
              {["Virgin polymer compounds only","Precision injection moulding","In-line and batch QC","Traceable dispatch"].map((x) => (
                <li key={x} className="flex gap-3"><CheckCircle2 className="text-accent shrink-0 mt-0.5" size={20} /><span className="text-foreground">{x}</span></li>
              ))}
            </ul>
            <Link href="/quality" className="mt-8 inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
              About our quality standards <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </Section>

      {/* DOWNLOAD */}
      <Section bg="surface">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "King Roar Price List", file: "/downloads/king-roar-price-list.pdf" },
            { name: "King Roar — Clamps Range", file: "/downloads/king-roar-clamps-price-list.pdf" },
            { name: "Devam Price List", file: "/downloads/devam-price-list.pdf" },
          ].map((d) => (
            <a key={d.name} href={d.file} target="_blank" rel="noreferrer" className="card-elevated p-7 flex items-center justify-between group">
              <div>
                <div className="text-xs uppercase tracking-wider text-primary font-semibold">PDF · 2024</div>
                <p className="mt-2 font-semibold text-foreground">{d.name}</p>
              </div>
              <Download className="text-primary group-hover:scale-110 transition-transform" />
            </a>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}

function BrandCard({ img, eyebrow, name, tagline, desc, to }: { img: string; eyebrow: string; name: string; tagline: string; desc: string; to: string }) {
  return (
    <Link href={to} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
        <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" width={1600} height={1000} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
          <div className="text-xs uppercase tracking-widest text-white/70">{eyebrow}</div>
          <h3 className="mt-2 text-3xl md:text-4xl font-semibold">{name}</h3>
          <p className="mt-1 text-white/80">{tagline}</p>
        </div>
      </div>
      <p className="mt-5 text-muted-foreground">{desc}</p>
      <div className="mt-4 inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
        View brand <ArrowRight size={16} />
      </div>
    </Link>
  );
}

