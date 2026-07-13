import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

export function CTASection() {
  return (
    <section className="bg-primary relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25), transparent 40%), radial-gradient(circle at 80% 80%, rgba(242,103,34,0.35), transparent 45%)",
        }}
      />
      <div className="container-page relative py-20 md:py-24 grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
        <div>
          <div className="eyebrow text-accent mb-4 [&::before]:bg-white/70">Partner with us</div>
          <h2 className="text-3xl md:text-5xl font-semibold text-white leading-tight">
            Become a Gravity Industries dealer or distributor.
          </h2>
          <p className="mt-5 text-white/80 text-lg max-w-xl">
            Nationwide dealership opportunities across King Roar and Devam. Attractive margins, full technical support, and a 15-year manufacturing track record.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Link href="/contact" className="btn-primary justify-center text-base py-4">
            Request Dealership <ArrowRight size={18} />
          </Link>
          <Link href="/downloads" className="btn-ghost-light justify-center py-4">
            <Download size={18} /> Download Catalogue
          </Link>
        </div>
      </div>
    </section>
  );
}
