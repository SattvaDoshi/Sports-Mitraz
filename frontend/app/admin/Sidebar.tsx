"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: "📊" },
    { label: "Orders", href: "/admin/orders", icon: "🛒" },
    { label: "Categories", href: "/admin/categories", icon: "📁" },
    { label: "Products", href: "/admin/products", icon: "👕" },
  ];

  return (
    <aside
      style={{
        width: "250px",
        background: "#111318",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 1000,
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      className={`admin-sidebar ${isOpen ? "sidebar-open" : ""}`}
    >
      {/* Sidebar Header */}
      <div style={{ padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #222" }}>
        <div>
          <h2 style={{ margin: 0, color: "#ed0f63", fontSize: "1.4rem" }}>SportzMitra</h2>
          <span style={{ fontSize: "0.8rem", color: "#888" }}>Admin Panel</span>
        </div>
        {/* Mobile Close (X) Button */}
        <button
          onClick={onClose}
          style={{
            background: "#222",
            border: "1px solid #333",
            color: "#fff",
            fontSize: "18px",
            width: "32px",
            height: "32px",
            borderRadius: "6px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Close menu"
        >
          ✕
        </button>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "16px 0" }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 20px",
                color: isActive ? "#a3e635" : "#ccc",
                background: isActive ? "rgba(255,255,255,0.05)" : "transparent",
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

      {/* Footer */}
      <div style={{ padding: "20px", borderTop: "1px solid #222" }}>
        <Link href="/" style={{ color: "#888", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Back to Store
        </Link>
      </div>
    </aside>
  );
}