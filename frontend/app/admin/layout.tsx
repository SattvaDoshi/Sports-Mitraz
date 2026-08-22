"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { getAdminKey } from "@/lib/api";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [isClient, setIsClient] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  // Handle Auth and Window Resize
  useEffect(() => {
    setIsClient(true);
    const key = getAdminKey();
    if (!key && pathname !== "/admin/login") {
      router.push("/admin/login");
    }

    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pathname, router]);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  if (!isClient) return null;

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: "📊" },
    { label: "Orders", href: "/admin/orders", icon: "🛒" },
    { label: "Categories", href: "/admin/categories", icon: "📁" },
    { label: "Products", href: "/admin/products", icon: "👕" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f7f8f5", position: "relative" }}>
      
      {/* 1. Backdrop Overlay for Mobile */}
      {isMobileView && isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 998,
          }}
        />
      )}

      {/* 2. Responsive Floating/Static Sidebar */}
      <aside
        style={{
          width: "250px",
          backgroundColor: "#111318",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 999,
          transition: "transform 0.3s ease",
          transform: isMobileView
            ? isMobileOpen
              ? "translateX(0)"
              : "translateX(-100%)"
            : "translateX(0)",
        }}
      >
        <div style={{ padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #222" }}>
          <div>
            <h2 style={{ margin: 0, color: "#ed0f63", fontSize: "1.4rem" }}>SportzMitra</h2>
            <span style={{ fontSize: "0.8rem", color: "#888" }}>Admin Panel</span>
          </div>
          {isMobileView && (
            <button
              onClick={() => setIsMobileOpen(false)}
              style={{
                background: "#222",
                border: "none",
                color: "#fff",
                fontSize: "18px",
                width: "32px",
                height: "32px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          )}
        </div>

        <nav style={{ flex: 1, padding: "16px 0" }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 20px",
                  color: isActive ? "#a3e635" : "#ccc",
                  backgroundColor: isActive ? "rgba(255,255,255,0.05)" : "transparent",
                  textDecoration: "none",
                  fontWeight: isActive ? "bold" : "normal",
                  borderLeft: isActive ? "4px solid #a3e635" : "4px solid transparent",
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: "20px", borderTop: "1px solid #222" }}>
          <Link href="/" style={{ color: "#888", textDecoration: "none", fontSize: "0.9rem" }}>
            ← Back to Store
          </Link>
        </div>
      </aside>

      {/* 3. Main Wrapper */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          marginLeft: isMobileView ? "0px" : "250px",
          width: isMobileView ? "100%" : "calc(100% - 250px)",
          minWidth: 0,
        }}
      >
        {/* Header with Hamburger */}
        <header
          style={{
            height: "60px",
            backgroundColor: "#fff",
            borderBottom: "1px solid #e6e9e5",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            position: "sticky",
            top: 0,
            zIndex: 800,
          }}
        >
          {isMobileView ? (
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              style={{
                backgroundColor: "#f0f0f0",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "20px",
                padding: "4px 10px",
                cursor: "pointer",
              }}
            >
              ☰
            </button>
          ) : (
            <div />
          )}

          <button
            style={{
              padding: "6px 16px",
              border: "1px solid #e6e9e5",
              backgroundColor: "#fff",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main style={{ padding: isMobileView ? "16px" : "32px", flex: 1, boxSizing: "border-box" }}>
          {children}
        </main>
      </div>
    </div>
  );
}