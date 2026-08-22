"use client";

import React, { useEffect, useState } from "react";
import { fetchApi } from "@/lib/api";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  parentId: number | null;
  isLeaf: boolean;
  sortOrder: number;
  isActive: boolean;
  subcategories?: Category[];
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [flatCategories, setFlatCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<Category | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parentId: "",
    isLeaf: false,
    sortOrder: 0,
    isActive: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [treeRes, flatRes] = await Promise.all([
        fetchApi("/admin/categories", { isAdmin: true }),
        fetchApi("/admin/categories/flat", { isAdmin: true }),
      ]);
      if (treeRes.success) setCategories(treeRes.data);
      if (flatRes.success) setFlatCategories(flatRes.data);
    } catch (err: any) {
      alert(err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openModal = (cat?: Category) => {
    if (cat) {
      setEditingCat(cat);
      setFormData({
        name: cat.name,
        description: cat.description || "",
        parentId: cat.parentId ? cat.parentId.toString() : "",
        isLeaf: cat.isLeaf,
        sortOrder: cat.sortOrder,
        isActive: cat.isActive,
      });
    } else {
      setEditingCat(null);
      setFormData({
        name: "",
        description: "",
        parentId: "",
        isLeaf: false,
        sortOrder: 0,
        isActive: true,
      });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCat(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const fd = new FormData();
      fd.append("name", formData.name);
      if (formData.description) fd.append("description", formData.description);
      if (formData.parentId) fd.append("parentId", formData.parentId);
      fd.append("isLeaf", String(formData.isLeaf));
      fd.append("sortOrder", String(formData.sortOrder));
      fd.append("isActive", String(formData.isActive));

      if (imageFile) {
        fd.append("image", imageFile);
      }

      const endpoint = editingCat ? `/admin/categories/${editingCat.id}` : "/admin/categories";
      const method = editingCat ? "PUT" : "POST";

      const res = await fetchApi(endpoint, {
        method,
        isAdmin: true,
        body: fd,
      });

      if (res.success) {
        closeModal();
        loadData();
      }
    } catch (err: any) {
      alert(err.message || "Failed to save category");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await fetchApi(`/admin/categories/${id}`, {
        method: "DELETE",
        isAdmin: true,
      });
      if (res.success) {
        loadData();
      }
    } catch (err: any) {
      alert(err.message || "Failed to delete category");
    }
  };

  const renderCategoryTree = (cats: Category[], level = 0) => {
    return cats.map((cat) => (
      <div
        key={cat.id}
        className="category-tree-level"
        style={{
          "--level": level,
          marginBottom: "8px",
        } as React.CSSProperties}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            background: "#fff",
            padding: "12px 16px",
            borderRadius: "8px",
            border: "1px solid #e6e9e5",
            borderLeft: `4px solid ${
              level === 0 ? "#ed0f63" : level === 1 ? "#a7d900" : "#cbd5e1"
            }`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: "1 1 200px" }}>
            {cat.image && (
              <img
                src={cat.image}
                alt={cat.name}
                style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px", flexShrink: 0 }}
              />
            )}
            <div style={{ wordBreak: "break-word" }}>
              <div style={{ fontWeight: "bold", display: "flex", alignItems: "center", flexWrap: "wrap", gap: "6px" }}>
                <span>{cat.name}</span>
                {!cat.isActive && (
                  <span style={{ color: "red", fontSize: "0.8rem" }}>(Inactive)</span>
                )}
                {cat.isLeaf && (
                  <span
                    style={{
                      color: "#3b82f6",
                      fontSize: "0.8rem",
                      background: "#eff6ff",
                      padding: "2px 6px",
                      borderRadius: "4px",
                    }}
                  >
                    Product Leaf
                  </span>
                )}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#62686f" }}>/{cat.slug}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
            <button
              onClick={() => openModal(cat)}
              style={{
                padding: "6px 12px",
                border: "1px solid #e6e9e5",
                background: "#fff",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(cat.id)}
              style={{
                padding: "6px 12px",
                border: "1px solid #fecaca",
                background: "#fef2f2",
                color: "#ef4444",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              Delete
            </button>
          </div>
        </div>

        {cat.subcategories && cat.subcategories.length > 0 && (
          <div style={{ marginTop: "8px" }}>
            {renderCategoryTree(cat.subcategories, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div style={{ padding: "16px", maxWidth: "1200px", margin: "0 auto", boxSizing: "border-box" }}>
      <style>{`
        .category-tree-level {
          margin-left: calc(var(--level) * 24px);
        }
        @media (max-width: 640px) {
          .category-tree-level {
            margin-left: calc(var(--level) * 10px);
          }
          .admin-header {
            flex-direction: column;
            align-items: stretch !important;
            gap: 12px;
          }
          .admin-header button {
            width: 100%;
          }
        }
      `}</style>

      <div
        className="admin-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "clamp(1.5rem, 4vw, 2rem)" }}>Categories</h1>
        <button
          onClick={() => openModal()}
          style={{
            padding: "10px 20px",
            background: "#ed0f63",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          + Add Category
        </button>
      </div>

      {loading ? (
        <div>Loading categories...</div>
      ) : (
        <div>
          {categories.length === 0 ? (
            <div style={{ padding: "40px", textAlign: "center", background: "#fff", borderRadius: "8px" }}>
              No categories found.
            </div>
          ) : (
            renderCategoryTree(categories)
          )}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              background: "#fff",
              width: "100%",
              maxWidth: "500px",
              borderRadius: "12px",
              padding: "20px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxSizing: "border-box",
            }}
          >
            <h2 style={{ marginTop: 0, fontSize: "1.3rem" }}>
              {editingCat ? "Edit Category" : "Add Category"}
            </h2>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Name *</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #e6e9e5", boxSizing: "border-box" }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Parent Category</label>
                <select
                  value={formData.parentId}
                  onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #e6e9e5", boxSizing: "border-box" }}
                >
                  <option value="">-- None (Top Level) --</option>
                  {flatCategories
                    .filter((c) => c.id !== editingCat?.id)
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #e6e9e5", boxSizing: "border-box" }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  style={{ width: "100%" }}
                />
                {editingCat?.image && !imageFile && (
                  <img
                    src={editingCat.image}
                    alt="Current"
                    style={{ width: "60px", marginTop: "8px", borderRadius: "4px" }}
                  />
                )}
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                  Is Active
                </label>
                <label
                  style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
                  title="If checked, this category acts as a product itself"
                >
                  <input
                    type="checkbox"
                    checked={formData.isLeaf}
                    onChange={(e) => setFormData({ ...formData, isLeaf: e.target.checked })}
                  />
                  Is Leaf (Product)
                </label>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Sort Order</label>
                <input
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #e6e9e5", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={closeModal}
                  style={{ padding: "10px 16px", background: "#f3f4f6", border: "none", borderRadius: "6px", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    padding: "10px 16px",
                    background: "#ed0f63",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: saving ? "not-allowed" : "pointer",
                  }}
                >
                  {saving ? "Saving..." : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}