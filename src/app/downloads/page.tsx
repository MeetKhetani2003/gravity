
import { Download, FileText } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionTitle } from "@/components/site/Section";
import { CTASection } from "@/components/site/CTASection";



const groups = [
  {
    title: "Corporate",
    items: [
      { name: "Corporate Profile", desc: "Gravity Industries at a glance.", file: "/downloads/king-roar-price-list.pdf", size: "PDF · 2024" },
    ],
  },
  {
    title: "King Roar Catalogues",
    items: [
      { name: "King Roar — Full Price List 2024", desc: "Complete range: ball valves, concealed valves, taps, showers, clamps and CP fittings.", file: "/downloads/king-roar-price-list.pdf", size: "PDF · Jul 2024" },
      { name: "King Roar — All Clamps Range", desc: "RCC nail, powder-coated metal, SS 202 and GI clamps in every size.", file: "/downloads/king-roar-clamps-price-list.pdf", size: "PDF · Jul 2024" },
    ],
  },
  {
    title: "Devam Catalogues",
    items: [
      { name: "Devam — Full Price List 2024", desc: "Concealed valves, NRV, PTMT pipes, solvent cement, waste couplings, bathroom accessories and garden products.", file: "/downloads/devam-price-list.pdf", size: "PDF · Jul 2024" },
    ],
  },
];

export default function DownloadsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Downloads" }]}
        eyebrow="Downloads"
        title="Catalogues, price lists & technical PDFs."
        subtitle="All current product literature, ready to download. Updated July 2024."
      />

      <Section bg="white">
        <div className="space-y-16">
          {groups.map((g) => (
            <div key={g.title}>
              <SectionTitle title={g.title} />
              <div className="grid md:grid-cols-2 gap-5">
                {g.items.map((it) => (
                  <a key={it.name} href={it.file} target="_blank" rel="noreferrer" className="card-elevated p-6 flex gap-5 group">
                    <div className="shrink-0 h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <FileText size={26} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs uppercase tracking-wider text-primary font-semibold">{it.size}</div>
                      <p className="mt-1 font-semibold text-foreground">{it.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{it.desc}</p>
                    </div>
                    <Download className="text-primary group-hover:scale-110 transition-transform self-center" />
                  </a>
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

