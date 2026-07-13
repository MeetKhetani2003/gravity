
import { Award, CheckCircle2, ClipboardCheck, FlaskConical, ShieldCheck, Zap } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionTitle } from "@/components/site/Section";
import { CTASection } from "@/components/site/CTASection";



export default function QualityPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Quality" }]}
        eyebrow="Quality & Certification"
        title="Quality that dealers can stake their name on."
        subtitle="Every product is manufactured under our ISO 9001:2015 quality management system — traceable, inspected and consistent, batch after batch."
      />

      <Section bg="white">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start">
          <div className="bg-surface border border-border rounded-2xl p-10">
            <Award className="text-accent" size={44} />
            <div className="mt-6 text-6xl font-semibold leading-none">ISO<br />9001:2015</div>
            <p className="mt-6 text-muted-foreground">Certified Quality Management System</p>
            <div className="mt-6 pt-6 border-t border-border text-sm text-muted-foreground">
              Applied to every process across our Rajkot manufacturing facility.
            </div>
          </div>
          <div>
            <div className="eyebrow mb-4">Certification</div>
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">A certified quality management system is a promise — not a plaque.</h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              ISO 9001:2015 certification means our processes are documented, audited and continuously improved. It's how we make sure the tenth thousand piece is exactly the same as the first — from concealed valves in Bengaluru high-rises to nail clamps on farm irrigation lines in Punjab.
            </p>
          </div>
        </div>
      </Section>

      <Section bg="surface">
        <SectionTitle eyebrow="Our process" title="Six checkpoints from compound to carton." subtitle="Quality is not an afterthought — it's built in at every stage of manufacturing." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: FlaskConical, t: "Raw material sourcing", d: "Virgin polymer compounds only — sourced from qualified suppliers with material certificates." },
            { icon: Zap, t: "Precision moulding", d: "Injection moulding parameters calibrated to each SKU. No shortcuts, no reclaim material." },
            { icon: ClipboardCheck, t: "In-line inspection", d: "Dimensional, visual and functional checks at moulding stage. Rejects removed immediately." },
            { icon: ShieldCheck, t: "Batch QC release", d: "Every batch is inspected against the specification before it is cleared for dispatch." },
            { icon: CheckCircle2, t: "Packaging integrity", d: "Consistent inner and outer packing, with clear labelling and batch traceability." },
            { icon: Award, t: "Continuous audit", d: "Internal audits and annual ISO surveillance ensure the system stays effective." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="card-elevated p-7 bg-white">
              <Icon className="text-primary" size={28} />
              <h3 className="mt-5 text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="white">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <div className="eyebrow mb-4">What quality means to us</div>
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">Consistency, backed by ownership.</h2>
          </div>
          <div className="space-y-5">
            {[
              ["No compound compromises", "We work with virgin uPVC, cPVC, PP, PC and ABS compounds — always."],
              ["Specifications, not opinions", "Every SKU has a written spec. Every batch is measured against it."],
              ["Real accountability", "Batch numbers link every carton back to shift, machine and operator."],
              ["A response, not a runaround", "Whenever a dealer flags an issue, we investigate and respond."],
            ].map(([t, d]) => (
              <div key={t} className="flex gap-4 pb-5 border-b border-border last:border-0">
                <CheckCircle2 className="text-accent shrink-0 mt-1" size={22} />
                <div>
                  <p className="font-medium text-foreground">{t}</p>
                  <p className="text-sm text-muted-foreground mt-1">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CTASection />
    </>
  );
}

