"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ProductsProvider } from "@/lib/products-store";
import { AdminAuthProvider } from "@/lib/admin-auth";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <AdminAuthProvider>
        <ProductsProvider>
          {children}
          <Toaster position="top-right" richColors />
        </ProductsProvider>
      </AdminAuthProvider>
    </QueryClientProvider>
  );
}
