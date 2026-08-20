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

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  const totalOrders = stats ? stats.pending + stats.confirmed + stats.booked + stats.cancelled : 0;

  const statCards = [
    { title: "Pending Orders", value: stats?.pending || 0, color: "#f59e0b", bgColor: "rgba(245, 158, 11, 0.1)" },
    { title: "Confirmed Orders", value: stats?.confirmed || 0, color: "#3b82f6", bgColor: "rgba(59, 130, 246, 0.1)" },
    { title: "Booked (Completed)", value: stats?.booked || 0, color: "#10b981", bgColor: "rgba(16, 185, 129, 0.1)" },
    { title: "Cancelled", value: stats?.cancelled || 0, color: "#ef4444", bgColor: "rgba(239, 68, 68, 0.1)" }
  ];

  return (
    <div>
      <h1 style={{ marginBottom: "24px", color: "#111318" }}>Dashboard Overview</h1>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "24px",
        marginBottom: "32px"
      }}>
        {/* Total Orders Card */}
        <div style={{
          background: "#fff",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
          border: "1px solid #e6e9e5"
        }}>
          <h3 style={{ margin: "0 0 8px 0", color: "#62686f", fontSize: "1rem" }}>Total Enquiries</h3>
          <p style={{ margin: 0, fontSize: "2.5rem", fontWeight: "bold", color: "#111318" }}>
            {totalOrders}
          </p>
        </div>

        {statCards.map((card, idx) => (
          <div key={idx} style={{
            background: "#fff",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
            border: "1px solid #e6e9e5"
          }}>
            <h3 style={{ margin: "0 0 8px 0", color: "#62686f", fontSize: "1rem" }}>{card.title}</h3>
            <p style={{ margin: 0, fontSize: "2.5rem", fontWeight: "bold", color: card.color }}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div style={{
        background: "#fff",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
        border: "1px solid #e6e9e5"
      }}>
        <h2>Quick Actions</h2>
        <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
          <Link href="/admin/orders" style={{
            padding: "10px 20px",
            background: "#ed0f63",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "6px",
            fontWeight: "bold"
          }}>
            View All Orders
          </Link>
          <Link href="/admin/products" style={{
            padding: "10px 20px",
            background: "#111318",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "6px",
            fontWeight: "bold"
          }}>
            Manage Products
          </Link>
        </div>
      </div>
    </div>
  );
}
