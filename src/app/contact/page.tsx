"use client";

import { useState } from "react";
import { Mail, MapPin, MessageCircle, Phone, Clock, Send, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { company } from "@/lib/site-data";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  company: z.string().trim().max(120).optional(),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().min(7, "Enter a valid phone").max(20),
  city: z.string().trim().max(80).optional(),
  interest: z.enum(["dealership", "product", "export", "general"]),
  message: z.string().trim().min(10, "Please share a few details").max(1000),
});

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const r = contactSchema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(r.data),
      });

      if (!res.ok) throw new Error("Failed to send inquiry");
      setSent(true);
    } catch (err) {
      setErrors({ message: "Failed to send message. Please try again or contact us directly." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        eyebrow="Get in touch"
        title="Talk to us."
        subtitle="Dealer inquiries, product questions, export orders or general questions — we respond within one business day."
      />

      <Section bg="white">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12">
          {/* FORM */}
          <div className="card-elevated p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-semibold">Send us a message</h2>
            <p className="mt-2 text-muted-foreground">Fill in the form and we'll be in touch.</p>

            {sent ? (
              <div className="mt-8 p-6 bg-surface rounded-xl border border-border flex gap-4">
                <CheckCircle2 className="text-accent shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Your message has been successfully sent.</p>
                  <p className="text-sm text-muted-foreground mt-1">Prefer WhatsApp? <a className="text-primary underline" href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g,"")}`} target="_blank" rel="noreferrer">Message us directly</a>.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-6 grid sm:grid-cols-2 gap-4">
                <Field name="name" label="Full name *" error={errors.name} />
                <Field name="company" label="Company (optional)" />
                <Field name="email" label="Email *" type="email" error={errors.email} />
                <Field name="phone" label="Phone *" type="tel" error={errors.phone} />
                <Field name="city" label="City" />
                <div>
                  <label className="text-sm font-medium">Interest *</label>
                  <select name="interest" defaultValue="dealership" className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="dealership">Dealership / Distribution</option>
                    <option value="product">Product Inquiry</option>
                    <option value="export">Export Order</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium">Message *</label>
                  <textarea name="message" rows={5} className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Tell us about your requirement..." />
                  {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                </div>
                <div className="sm:col-span-2 flex gap-3 mt-2">
                  <button type="submit" disabled={loading} className="btn-primary">
                    {loading ? "Sending..." : <>Send message <Send size={16} /></>}
                  </button>
                  <a href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g,"")}`} target="_blank" rel="noreferrer" className="btn-outline">
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="space-y-4">
            <InfoCard icon={<MapPin />} title="Factory Address">
              <p>{company.address}</p>
            </InfoCard>
            <InfoCard icon={<Phone />} title="Phone">
              {company.phones.map((p) => (
                <p key={p}><a href={`tel:${p.replace(/\s/g,"")}`} className="hover:text-primary">{p}</a></p>
              ))}
            </InfoCard>
            <InfoCard icon={<Mail />} title="Email">
              <a href={`mailto:${company.email}`} className="hover:text-primary">{company.email}</a>
            </InfoCard>
            <InfoCard icon={<Clock />} title="Business Hours">
              <p>Monday – Saturday</p>
              <p className="text-muted-foreground">10:00 AM – 7:00 PM IST</p>
            </InfoCard>
          </div>
        </div>
      </Section>

      {/* MAP */}
      <Section bg="surface" className="!py-0">
        <div className="py-16">
          <div className="rounded-2xl overflow-hidden border border-border h-[420px]">
            <iframe
              title="Gravity Industries — Rajkot"
              src="https://www.google.com/maps?q=Sojitra+Park+Radhe+Krishna+Chowk+Mavdi+Rajkot&output=embed"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Section>
    </>
  );
}

function Field({ name, label, type = "text", error }: { name: string; label: string; type?: string; error?: string }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input name={name} type={type} className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function InfoCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="card-elevated p-6 flex gap-4">
      <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">{icon}</div>
      <div className="text-sm">
        <p className="font-semibold text-foreground">{title}</p>
        <div className="mt-1 text-foreground/80 space-y-0.5">{children}</div>
      </div>
    </div>
  );
}
