"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { clearAdminKey } from "@/lib/api";

export const AdminHeader = () => {
  const router = useRouter();

  const handleLogout = () => {
    clearAdminKey();
    router.push("/admin/login");
  };

  return (
    <header style={{
      height: "70px",
      backgroundColor: "#fff",
      borderBottom: "1px solid #e6e9e5",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 24px",
      position: "sticky",
      top: 0,
      zIndex: 10
    }}>
      <button 
        onClick={handleLogout}
        style={{
          background: "none",
          border: "1px solid #e6e9e5",
          padding: "8px 16px",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
          color: "#62686f"
        }}
      >
        Logout
      </button>
    </header>
  );
};
