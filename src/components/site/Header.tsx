"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ShieldCheck } from "lucide-react";
import logo from "@/assets/gravity-logo.png";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/brands", label: "Brands" },
  { href: "/products", label: "Products" },
  { href: "/applications", label: "Applications" },
  { href: "/downloads", label: "Downloads" },
  { href: "/quality", label: "Quality" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        transparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-md border-b border-border shadow-[0_1px_0_rgba(17,24,39,0.03)]",
      ].join(" ")}
    >
      <div className="container-page flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Gravity Industries — Home">
          <img src={logo.src} alt="Gravity Industries" className="h-8 md:h-10 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "px-3.5 py-2 text-sm font-medium rounded-md transition-colors",
                  transparent ? "text-white/90 hover:text-white" : "text-foreground hover:text-primary",
                  active && !transparent ? "text-primary font-semibold" : "",
                  active && transparent ? "text-white font-semibold" : "",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/admin"
            className={[
              "px-3 py-1.5 text-xs font-bold rounded-lg border transition-all flex items-center gap-1.5",
              transparent
                ? "bg-white/10 text-white border-white/20 hover:bg-white/20"
                : "bg-slate-900 text-white border-slate-800 hover:bg-slate-800",
            ].join(" ")}
            title="Products Admin Panel"
          >
            <ShieldCheck size={14} className="text-primary" />
            <span>Admin</span>
          </Link>
          <Link href="/contact" className="btn-primary text-sm py-2.5 px-5">
            Dealer Inquiry
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className={["lg:hidden p-2 -mr-2", transparent ? "text-white" : "text-foreground"].join(" ")}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-border">
          <div className="container-page py-4 flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3 text-foreground font-medium border-b border-border/60 last:border-0 flex items-center justify-between"
              >
                {item.label}
                <ChevronDown size={16} className="-rotate-90 text-muted-foreground" />
              </Link>
            ))}
            <Link
              href="/admin"
              className="py-3 text-primary font-bold border-b border-border/60 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck size={16} /> Admin Panel
              </span>
              <ChevronDown size={16} className="-rotate-90 text-primary" />
            </Link>
            <Link href="/contact" className="btn-primary mt-4">Dealer Inquiry</Link>
          </div>
        </div>
      )}
    </header>
  );
}
