"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  username: string | null;
  login: (u: string, p: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const LOCAL_STORAGE_SESSION_KEY = "gravity_admin_auth_status";

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check auth status on initial load
  useEffect(() => {
    async function checkAuth() {
      try {
        // Fast local check first
        const localStatus = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
        if (localStatus === "true") {
          setIsAuthenticated(true);
        }

        // Verify with backend API route
        const res = await fetch("/api/admin/check", { cache: "no-store" });
        const data = await res.json();

        if (data.authenticated) {
          setIsAuthenticated(true);
          setUsername(data.username || "admin");
          localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, "true");
        } else {
          setIsAuthenticated(false);
          setUsername(null);
          localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
        }
      } catch (err) {
        console.error("Auth status check failed", err);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, []);

  const login = async (u: string, p: string) => {
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: u, password: p }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setUsername(data.username || u);
        localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, "true");
        return { success: true };
      } else {
        return { success: false, message: data.message || "Invalid credentials" };
      }
    } catch (err) {
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout request error", err);
    } finally {
      setIsAuthenticated(false);
      setUsername(null);
      localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        username,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
