"use client";

import React, { useEffect, useState } from "react";
import { fetchApi } from "@/lib/api";
import { toast } from "react-toastify";
import { getDirectImageUrl } from "@/lib/driveImage";

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  isFeatured: boolean;
}

export default function FeaturedCategoriesAdmin() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchApi("/admin/categories/flat", { isAdmin: true });
      if (!res.success) throw new Error(res.message);
      
      setCategories(res.data);
      const featured = res.data.filter((c: Category) => c.isFeatured).map((c: Category) => c.id);
      setSelectedIds(featured);
    } catch (err: any) {
      toast.error(err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggle = (id: number) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 5) {
        toast.warning("You can only select up to 5 featured categories.");
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetchApi("/admin/categories/featured", {
        method: "PUT",
        isAdmin: true,
        body: JSON.stringify({ featuredIds: selectedIds }),
      });
      if (res.success) {
        toast.success("Featured categories updated successfully!");
        loadData();
      } else {
        throw new Error(res.message);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update featured categories");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: "16px", maxWidth: "800px", margin: "0 auto", boxSizing: "border-box" }}>
      <div
        className="admin-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "clamp(1.5rem, 4vw, 2rem)" }}>Featured Categories</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            padding: "10px 20px",
            background: "#ed0f63",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: saving ? "not-allowed" : "pointer",
          }}
        >
          {saving ? "Saving..." : "Save Selection"}
        </button>
      </div>

      <div style={{ marginBottom: "20px", padding: "12px", background: "#fef3c7", color: "#92400e", borderRadius: "8px" }}>
        <strong>Note:</strong> Select up to 5 categories to be displayed on the homepage featured section. 
        Current selection: {selectedIds.length}/5
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {categories.map((cat) => (
            <label
              key={cat.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                background: "#fff",
                padding: "12px 16px",
                borderRadius: "8px",
                border: selectedIds.includes(cat.id) ? "2px solid #a3e635" : "1px solid #e6e9e5",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(cat.id)}
                onChange={() => handleToggle(cat.id)}
                style={{ width: "20px", height: "20px" }}
              />
              {cat.image && (
                <img
                  src={getDirectImageUrl(cat.image)}
                  alt="cat"
                  style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px" }}
                />
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{cat.name}</div>
                <div style={{ fontSize: "0.8rem", color: "#62686f" }}>/{cat.slug}</div>
              </div>
            </label>
          ))}
          {categories.length === 0 && (
            <div style={{ padding: "40px", textAlign: "center", background: "#fff", borderRadius: "8px" }}>
              No categories found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
