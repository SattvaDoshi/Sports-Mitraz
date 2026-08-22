"use client";

import React from "react";

interface AdminHeaderProps {
  onToggleMobile: () => void;
  isMobileOpen: boolean;
}

export function AdminHeader({ onToggleMobile, isMobileOpen }: AdminHeaderProps) {
  return (
    <header
      style={{
        height: "60px",
        background: "#fff",
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
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={onToggleMobile}
          className="hamburger-btn"
          style={{
            background: "#f0f0f0",
            border: "1px solid #ccc",
            borderRadius: "6px",
            fontSize: "20px",
            cursor: "pointer",
            color: "#111318",
            padding: "4px 10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Toggle Menu"
        >
          {isMobileOpen ? "✕" : "☰"}
        </button>
        <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Admin Dashboard</span>
      </div>

      <button
        style={{
          padding: "6px 16px",
          border: "1px solid #e6e9e5",
          background: "#fff",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </header>
  );
}