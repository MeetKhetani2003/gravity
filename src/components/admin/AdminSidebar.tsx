"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Tags,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
  LogOut,
} from "lucide-react";
import { useProductsStore } from "@/lib/products-store";
import { useAdminAuth } from "@/lib/admin-auth";
import { toast } from "sonner";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { products, resetToDefaults } = useProductsStore();
  const { username, logout } = useAdminAuth();

  const handleReset = () => {
    if (confirm("Are you sure you want to reset the product catalog to default factory data? Any unsaved edits will be lost.")) {
      resetToDefaults();
      toast.success("Product catalog restored to factory defaults");
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out of admin console.");
    router.push("/admin/login");
  };

  const navItems = [
    {
      href: "/admin",
      label: "Dashboard Overview",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: "/admin/products",
      label: "Products Catalog",
      icon: Package,
      badge: products.length.toString(),
    },
    {
      href: "/admin/categories",
      label: "Categories & Brands",
      icon: Tags,
    },
  ];

  return (
    <aside className="w-64 bg-slate-950 text-slate-200 border-r border-slate-800 flex flex-col h-screen sticky top-0 shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold">
            <ShieldCheck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <span className="font-bold text-white tracking-wide block text-sm">Gravity Admin</span>
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">Products Console</span>
          </div>
        </Link>
      </div>

      {/* Main Nav */}
      <div className="p-4 flex-1 space-y-1 overflow-y-auto">
        <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Management
        </div>

        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary text-white font-semibold shadow-md shadow-primary/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-800 text-slate-300"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        <div className="pt-6 px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Quick Links & Actions
        </div>

        <Link
          href="/products"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-emerald-400 hover:bg-slate-900 transition-all group"
        >
          <div className="flex items-center gap-3">
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-400" />
            <span>View Live Site</span>
          </div>
          <span className="text-[10px] text-emerald-400/80 font-mono">Live ↗</span>
        </Link>

        <button
          onClick={handleReset}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-amber-400 hover:bg-slate-900 transition-all text-left"
        >
          <RotateCcw className="w-4 h-4 text-slate-400 group-hover:text-amber-400" />
          <span>Reset Factory Catalog</span>
        </button>
      </div>

      {/* Footer Info with Logout */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-xs font-bold text-primary uppercase">
              {(username || "A").substring(0, 2)}
            </div>
            <div className="text-xs overflow-hidden">
              <p className="font-bold text-white truncate capitalize">{username || "admin"}</p>
              <p className="text-[10px] text-emerald-400 truncate flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" /> Active Session
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
