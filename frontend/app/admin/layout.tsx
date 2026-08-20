"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "@/components/admin/Sidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { getAdminKey } from "@/lib/api";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const key = getAdminKey();
    if (!key && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  const isLoginPage = pathname === "/admin/login";

  if (!isClient) return null; // Avoid hydration mismatch

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f7f8f5" }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: "250px", display: "flex", flexDirection: "column" }}>
        <AdminHeader />
        <main style={{ padding: "32px", flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
