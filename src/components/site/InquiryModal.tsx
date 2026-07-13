"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

type InquiryModalProps = {
  productName: string;
  brandName: string;
  trigger: React.ReactNode;
};

export function InquiryModal({ productName, brandName, trigger }: InquiryModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          productName,
          brandName,
        }),
      });

      if (!res.ok) throw new Error("Failed to send inquiry");
      
      setSent(true);
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      setOpen(val);
      if (!val) {
        // Reset state on close after a delay
        setTimeout(() => setSent(false), 300);
      }
    }}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Request a Quote</DialogTitle>
          <DialogDescription>
            Inquire about {productName} ({brandName}). We will get back to you shortly.
          </DialogDescription>
        </DialogHeader>

        {sent ? (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Inquiry Sent!</h3>
            <p className="text-muted-foreground">Thank you for reaching out. We will contact you soon.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Product</label>
                <input className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm text-muted-foreground" value={productName} disabled />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Brand</label>
                <input className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm text-muted-foreground" value={brandName} disabled />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name *</label>
              <input name="name" required className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter your name" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email *</label>
                <input name="email" type="email" required className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="name@company.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone *</label>
                <input name="phone" type="tel" required className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your phone number" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Message *</label>
              <textarea name="message" required rows={4} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Tell us your requirements, expected quantity, etc." />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <button type="submit" disabled={loading} className="w-full btn-primary justify-center mt-2">
              {loading ? <Loader2 className="animate-spin" size={16} /> : <>Send Inquiry <Send size={16} /></>}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
