"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { setAdminKey, fetchApi, clearAdminKey } from "@/lib/api";

export default function AdminLogin() {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      setAdminKey(key);
      await fetchApi("/admin/orders/stats", { isAdmin: true });
      router.push("/admin");
    } catch (err: any) {
      clearAdminKey();
      setError(err.message || "Invalid Admin Key");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f7f8f5",
        padding: "16px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "clamp(20px, 5vw, 40px)",
          borderRadius: "14px",
          boxShadow: "0 8px 24px rgba(17, 19, 24, 0.08)",
          width: "100%",
          maxWidth: "420px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <h1 style={{ margin: "0 0 8px 0", color: "#ed0f63", fontSize: "clamp(1.5rem, 5vw, 2rem)" }}>
            SportzMitra Admin
          </h1>
          <p style={{ margin: 0, color: "#62686f", fontSize: "0.95rem" }}>
            Enter your secret key to access the panel
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Admin Secret Key</label>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter key..."
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #e6e9e5",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
            />
          </div>

          {error && (
            <div
              style={{
                color: "#ed0f63",
                fontSize: "0.9rem",
                backgroundColor: "rgba(237, 15, 99, 0.1)",
                padding: "10px",
                borderRadius: "6px",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !key}
            style={{
              background: loading ? "#ccc" : "#ed0f63",
              color: "#fff",
              border: "none",
              padding: "14px",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: loading || !key ? "not-allowed" : "pointer",
              transition: "background 0.2s",
              width: "100%",
            }}
          >
            {loading ? "Verifying..." : "Login to Dashboard →"}
          </button>
        </form>
      </div>
    </div>
  );
}