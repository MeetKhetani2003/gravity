
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionTitle } from "@/components/site/Section";
import { CTASection } from "@/components/site/CTASection";
import { company, timeline, stats } from "@/lib/site-data";
import { Target, Compass, Award, Building2 } from "lucide-react";
import hero from "@/assets/hero-factory.jpg";



export default function About() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        eyebrow={`Since ${company.since}`}
        title="A Rajkot manufacturer built on quality, commitment and service."
        subtitle="Gravity Industries has been engineering premium plumbing and bathware products for Indian homes, businesses and infrastructure for over fifteen years."
      />

      {/* STORY */}
      <Section bg="white">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <div className="eyebrow mb-4">Our story</div>
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">One-stop shop for plumbing, sanitary and drainage.</h2>
          </div>
          <div className="text-lg text-muted-foreground leading-relaxed space-y-5">
            <p>{company.about}</p>
            <p>Our aim is to manufacture high-quality plastic, PVC, bathware and pipe products that bring a real difference to people's lives — a difference that spells convenience, efficiency, consistency, utility and complete value for money.</p>
          </div>
        </div>
      </Section>

      {/* MISSION VISION */}
      <Section bg="surface">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-elevated p-10">
            <Target className="text-accent" size={36} />
            <h3 className="mt-6 text-2xl font-semibold">Our Mission</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">{company.mission}</p>
          </div>
          <div className="card-elevated p-10">
            <Compass className="text-accent" size={36} />
            <h3 className="mt-6 text-2xl font-semibold">Our Vision</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              To be India's most trusted one-stop manufacturer for plumbing, sanitary and drainage products — recognised by dealers, builders and export buyers for consistent quality and dependable supply.
            </p>
          </div>
        </div>
      </Section>

      {/* MANUFACTURING EXCELLENCE */}
      <Section bg="white">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border">
            <img src={hero.src} alt="Manufacturing" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div>
            <div className="eyebrow mb-4">Manufacturing Excellence</div>
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">Engineered end-to-end at our Rajkot facility.</h2>
            <div className="mt-8 space-y-5">
              {[
                ["In-house injection moulding", "Precision moulding of every uPVC, cPVC, PP and PC component."],
                ["Quality inspection at every stage", "From raw material to finished carton, every batch is inspected."],
                ["Wide product portfolio", "150+ SKUs across two brands, all under one roof."],
                ["Dependable dispatch", "Batch traceable, inner/outer packed and ready for nationwide distribution."],
              ].map(([t, d]) => (
                <div key={t} className="flex gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-accent shrink-0" />
                  <div><p className="font-medium text-foreground">{t}</p><p className="text-sm text-muted-foreground mt-1">{d}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* TIMELINE */}
      <Section bg="surface">
        <SectionTitle eyebrow="Our journey" title="Fifteen years of building trust." />
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
          <div className="space-y-10">
            {timeline.map((t, i) => (
              <div key={t.year} className={`relative grid md:grid-cols-2 gap-8 items-start ${i % 2 === 0 ? "" : "md:direction-rtl"}`}>
                <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:col-start-2 md:pl-12"}`}>
                  <div className="text-4xl md:text-5xl font-semibold text-primary">{t.year}</div>
                  <h3 className="mt-2 text-xl font-semibold text-foreground">{t.title}</h3>
                  <p className="mt-2 text-muted-foreground">{t.body}</p>
                </div>
                <div className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 h-4 w-4 rounded-full bg-accent border-4 border-surface" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* QUALITY COMMITMENT */}
      <Section bg="white">
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center p-8 border border-border rounded-xl">
              <div className="text-4xl md:text-5xl font-semibold text-primary">{s.value}</div>
              <div className="mt-2 text-sm text-muted-foreground uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <div className="p-10 rounded-2xl bg-surface border border-border">
            <Award className="text-accent" size={32} />
            <h3 className="mt-5 text-2xl font-semibold">Quality commitment</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">Every product is manufactured under our ISO 9001:2015 quality management system. From compound sourcing to final dispatch, we hold ourselves to the same standard our customers stake their name on.</p>
          </div>
          <div className="p-10 rounded-2xl bg-surface border border-border">
            <Building2 className="text-accent" size={32} />
            <h3 className="mt-5 text-2xl font-semibold">Infrastructure</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">Modern manufacturing plant in Rajkot, Gujarat — a strategic location with access to raw materials and India's western logistics corridor. Warehousing, dispatch and quality control all under one roof.</p>
          </div>
        </div>
      </Section>

      <CTASection />
    </>
  );
}

