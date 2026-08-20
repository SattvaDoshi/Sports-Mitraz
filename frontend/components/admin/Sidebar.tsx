"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: "📊" },
    { name: "Orders", href: "/admin/orders", icon: "🛒" },
    { name: "Categories", href: "/admin/categories", icon: "📁" },
    { name: "Products", href: "/admin/products", icon: "👕" },
  ];

  return (
    <aside style={{
      width: "250px",
      backgroundColor: "#111318",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      position: "fixed",
      left: 0,
      top: 0
    }}>
      <div style={{ padding: "24px", borderBottom: "1px solid #333" }}>
        <h2 style={{ margin: 0, color: "#ed0f63" }}>SportzMitra</h2>
        <p style={{ margin: 0, fontSize: "0.8rem", color: "#888" }}>Admin Panel</p>
      </div>

      <nav style={{ padding: "20px 0", flex: 1 }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
          return (
            <Link key={item.name} href={item.href} style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 24px",
              color: isActive ? "#a7d900" : "#ccc",
              backgroundColor: isActive ? "rgba(167, 217, 0, 0.1)" : "transparent",
              textDecoration: "none",
              borderLeft: isActive ? "4px solid #a7d900" : "4px solid transparent",
              transition: "all 0.2s"
            }}>
              <span style={{ marginRight: "12px" }}>{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: "20px 24px", borderTop: "1px solid #333" }}>
        <Link href="/" style={{ color: "#888", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Back to Store
        </Link>
      </div>
    </aside>
  );
};
