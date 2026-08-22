"use client";

import React, { useEffect, useState } from "react";
import { fetchApi } from "@/lib/api";
import Link from "next/link";

interface Stats {
  pending: number;
  confirmed: number;
  booked: number;
  cancelled: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await fetchApi("/admin/orders/stats", { isAdmin: true });
        if (response.success) {
          setStats(response.data);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) return <div style={{ padding: "16px" }}>Loading dashboard...</div>;
  if (error) return <div style={{ padding: "16px", color: "red" }}>{error}</div>;

  const totalOrders = stats ? stats.pending + stats.confirmed + stats.booked + stats.cancelled : 0;

  const statCards = [
    { title: "Pending Orders", value: stats?.pending || 0, color: "#f59e0b", bgColor: "rgba(245, 158, 11, 0.1)" },
    { title: "Confirmed Orders", value: stats?.confirmed || 0, color: "#3b82f6", bgColor: "rgba(59, 130, 246, 0.1)" },
    { title: "Booked (Completed)", value: stats?.booked || 0, color: "#10b981", bgColor: "rgba(16, 185, 129, 0.1)" },
    { title: "Cancelled", value: stats?.cancelled || 0, color: "#ef4444", bgColor: "rgba(239, 68, 68, 0.1)" },
  ];

  return (
    <div style={{ width: "100%", padding: "16px", boxSizing: "border-box" }}>
      <h1 style={{ marginBottom: "24px", color: "#111318", fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}>
        Dashboard Overview
      </h1>

      {/* Grid adapts based on screen width */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        {/* Total Orders Card */}
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
            border: "1px solid #e6e9e5",
          }}
        >
          <h3 style={{ margin: "0 0 8px 0", color: "#62686f", fontSize: "0.95rem" }}>Total Enquiries</h3>
          <p style={{ margin: 0, fontSize: "clamp(1.8rem, 5vw, 2.5rem)", fontWeight: "bold", color: "#111318" }}>
            {totalOrders}
          </p>
        </div>

        {statCards.map((card, idx) => (
          <div
            key={idx}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
              border: "1px solid #e6e9e5",
            }}
          >
            <h3 style={{ margin: "0 0 8px 0", color: "#62686f", fontSize: "0.95rem" }}>{card.title}</h3>
            <p style={{ margin: 0, fontSize: "clamp(1.8rem, 5vw, 2.5rem)", fontWeight: "bold", color: card.color }}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          background: "#fff",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
          border: "1px solid #e6e9e5",
        }}
      >
        <h2 style={{ margin: "0 0 16px 0", fontSize: "1.25rem" }}>Quick Actions</h2>
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/admin/orders"
            style={{
              padding: "12px 20px",
              background: "#ed0f63",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              textAlign: "center",
              flex: "1 1 180px",
            }}
          >
            View All Orders
          </Link>
          <Link
            href="/admin/products"
            style={{
              padding: "12px 20px",
              background: "#111318",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              textAlign: "center",
              flex: "1 1 180px",
            }}
          >
            Manage Products
          </Link>
        </div>
      </div>
    </div>
  );
}