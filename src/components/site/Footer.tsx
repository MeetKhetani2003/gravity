import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/gravity-logo.png";
import { company } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="bg-[oklch(0.16_0.02_260)] text-white/80 mt-24">
      <div className="container-page py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="bg-white inline-flex rounded-md p-3">
            <img src={logo.src} alt="Gravity Industries" className="h-9 w-auto" />
          </div>
          <p className="mt-5 text-sm leading-relaxed text-white/70 max-w-sm">
            {company.tagline}. ISO 9001:2015 certified manufacturer of plumbing fittings, bathware and plastic products since {company.since}.
          </p>
          <div className="mt-6 space-y-2 text-sm">
            <p className="flex gap-3"><MapPin size={16} className="mt-0.5 text-accent shrink-0" /><span>{company.address}</span></p>
            <p className="flex gap-3"><Phone size={16} className="text-accent shrink-0" />
              {company.phones.map((p, i) => (<span key={p}>{p}{i < company.phones.length - 1 ? ", " : ""}</span>))}
            </p>
            <p className="flex gap-3"><Mail size={16} className="text-accent shrink-0" /><a href={`mailto:${company.email}`} className="hover:text-white">{company.email}</a></p>
          </div>
        </div>

        <FooterCol title="Company" links={[["About","/about"],["Quality","/quality"],["Contact","/contact"]]} />
        <FooterCol title="Brands" links={[["King Roar","/brands/king-roar"],["Devam","/brands/devam"],["All Brands","/brands"]]} />
        <FooterCol title="Products" links={[["All Products","/products"],["Applications","/applications"],["Downloads","/downloads"]]} />
        <FooterCol title="Resources" links={[["Catalogue","/downloads"],["Price List","/downloads"],["Dealer Inquiry","/contact"]]} />
      </div>
      <div className="border-t border-white/10">
        <div className="container-page py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Gravity Industries. All rights reserved. Manufactured in India.</p>
          <p>ISO 9001:2015 Certified • Made in India</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="lg:col-span-2">
      <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">{title}</h4>
      <ul className="space-y-2.5 text-sm">
        {links.map(([label, href]) => (
          <li key={href}><Link href={href} className="text-white/60 hover:text-white transition-colors">{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
