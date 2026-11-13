"use client";

import React, { useEffect, useState } from "react";
import { fetchApi } from "@/lib/api";
import { toast } from "react-toastify";
import { getDirectImageUrl } from "@/lib/driveImage";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface SizeEntry {
  size: string;
  price: string;
}

interface ProductSizeItem {
  size: string;
  price?: number | null;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  startingPrice: string | null;
  categoryId: number;
  category: Category;
  images: string[];
  catalogPdfUrl: string | null;
  tags: string[];
  sizes: (string | ProductSizeItem)[];
  isActive: boolean;
  sortOrder: number;
  priceType: "starting" | "fixed";
}

function parseSizesToEntries(raw: unknown): SizeEntry[] {
  if (!raw) return [];
  let list = raw;
  if (typeof raw === "string") {
    const trimmed = raw.trim();
    if (!trimmed) return [];
    if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
      try {
        list = JSON.parse(trimmed);
      } catch {
        // fallback to comma
      }
    }
    if (typeof list === "string") {
      list = list.split(",").map((s) => s.trim()).filter(Boolean);
    }
  }

  if (Array.isArray(list)) {
    return list
      .map((item) => {
        if (!item) return null;
        if (typeof item === "string") {
          const trimmed = item.trim();
          if (trimmed.includes(":")) {
            const [sz, pr] = trimmed.split(":");
            return { size: sz.trim(), price: pr.trim() };
          }
          return { size: trimmed, price: "" };
        }
        if (typeof item === "object") {
          const anyItem = item as any;
          return {
            size: String(anyItem.size || anyItem.name || "").trim(),
            price:
              anyItem.price !== null && anyItem.price !== undefined
                ? String(anyItem.price)
                : "",
          };
        }
        return null;
      })
      .filter((e): e is SizeEntry => Boolean(e && e.size));
  }
  return [];
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProd, setEditingProd] = useState<Product | null>(null);

  // Size-wise pricing entries state
  const [sizeEntries, setSizeEntries] = useState<SizeEntry[]>([]);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startingPrice: "",
    priceType: "starting" as "starting" | "fixed",
    categoryId: "",
    tags: "",
    sizes: "",
    isActive: true,
    sortOrder: 0,
  });
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [removedImages, setRemovedImages] = useState<string[]>([]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        fetchApi("/admin/products", { isAdmin: true }),
        fetchApi("/admin/categories/flat", { isAdmin: true }),
      ]);
      if (prodRes.success) setProducts(prodRes.data);
      if (catRes.success) setCategories(catRes.data);
      else throw new Error(prodRes.message || "Failed to load data");
    } catch (err: any) {
      toast.error(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openModal = (prod?: Product) => {
    if (prod) {
      setEditingProd(prod);
      const parsedEntries = parseSizesToEntries(prod.sizes);
      setSizeEntries(parsedEntries);
      setFormData({
        name: prod.name,
        description: prod.description || "",
        startingPrice: prod.startingPrice || "",
        priceType: prod.priceType || "starting",
        categoryId: prod.categoryId.toString(),
        tags: prod.tags ? prod.tags.join(", ") : "",
        sizes: "",
        isActive: prod.isActive,
        sortOrder: prod.sortOrder,
      });
    } else {
      setEditingProd(null);
      setSizeEntries([]);
      setFormData({
        name: "",
        description: "",
        startingPrice: "",
        priceType: "starting",
        categoryId: categories.length > 0 ? categories[0].id.toString() : "",
        tags: "",
        sizes: "",
        isActive: true,
        sortOrder: 0,
      });
    }
    setImageFiles(null);
    setImagePreviews([]);
    setPdfFile(null);
    setRemovedImages([]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProd(null);
    setSizeEntries([]);
    setImageFiles(null);
    setImagePreviews([]);
    setPdfFile(null);
    setRemovedImages([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const fd = new FormData();
      fd.append("name", formData.name);
      if (formData.description) fd.append("description", formData.description);

      // Clean size entries and calculate starting price if omitted
      const cleanedSizes = sizeEntries
        .filter((e) => e.size.trim() !== "")
        .map((e) => ({
          size: e.size.trim(),
          price: e.price.trim() !== "" && !isNaN(Number(e.price)) ? Number(e.price) : null,
        }));

      let effectiveStartingPrice = formData.startingPrice;
      if (!effectiveStartingPrice && cleanedSizes.length > 0) {
        const numericPrices = cleanedSizes
          .map((s) => s.price)
          .filter((p): p is number => p !== null && !isNaN(p));
        if (numericPrices.length > 0) {
          effectiveStartingPrice = String(Math.min(...numericPrices));
        }
      }

      if (effectiveStartingPrice) fd.append("startingPrice", effectiveStartingPrice);
      fd.append("priceType", formData.priceType);
      fd.append("categoryId", formData.categoryId);
      fd.append("tags", formData.tags);
      fd.append("sizes", JSON.stringify(cleanedSizes));
      fd.append("isActive", String(formData.isActive));
      fd.append("sortOrder", String(formData.sortOrder));

      if (imageFiles && imageFiles.length > 0) {
        for (let i = 0; i < imageFiles.length; i++) {
          fd.append("images", imageFiles[i]);
        }
        if (editingProd) {
          // When editing and new images are selected, ALWAYS replace to prevent duplicates
          fd.append("replaceImages", "true");
        }
      } else if (editingProd && removedImages.length > 0) {
        // No new images, but some existing ones were removed individually
        fd.append("removeImageUrls", JSON.stringify(removedImages));
      }

      if (pdfFile) {
        fd.append("catalogPdf", pdfFile);
      }

      const endpoint = editingProd ? `/admin/products/${editingProd.id}` : "/admin/products";
      const method = editingProd ? "PUT" : "POST";

      const res = await fetchApi(endpoint, {
        method,
        isAdmin: true,
        body: fd,
      });

      if (res.success) {
        closeModal();
        loadData();
        toast.success(editingProd ? "Product updated successfully!" : "Product created successfully!");
      } else {
        throw new Error(res.message);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetchApi(`/admin/products/${id}`, {
        method: "DELETE",
        isAdmin: true,
      });
      if (res.success) {
        loadData();
        toast.success("Product deleted successfully!");
      } else {
        throw new Error(res.message);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete product");
    }
  };

  return (
    <div style={{ width: "100%", padding: "16px", boxSizing: "border-box" }}>
      {/* Header Container */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "clamp(1.5rem, 4vw, 2rem)" }}>Products</h1>
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
            width: "auto",
          }}
        >
          + Add Product
        </button>
      </div>

      {loading ? (
        <div>Loading products...</div>
      ) : (
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            border: "1px solid #e6e9e5",
            overflow: "hidden",
          }}
        >
          {products.length === 0 ? (
            <div style={{ padding: "40px", textAlign: "center", color: "#62686f" }}>
              No products found.
            </div>
          ) : (
            /* Responsive Table Container */
            <div style={{ overflowX: "auto", width: "100%" }}>
              <table style={{ width: "100%", minWidth: "650px", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "#f7f8f5", borderBottom: "1px solid #e6e9e5" }}>
                    <th style={{ padding: "16px" }}>Product</th>
                    <th style={{ padding: "16px" }}>Category</th>
                    <th style={{ padding: "16px" }}>Price</th>
                    <th style={{ padding: "16px" }}>Status</th>
                    <th style={{ padding: "16px", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((prod) => (
                    <tr key={prod.id} style={{ borderBottom: "1px solid #e6e9e5" }}>
                      <td style={{ padding: "16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          {prod.images && prod.images.length > 0 ? (
                            <img
                              src={getDirectImageUrl(prod.images[0])}
                              alt={prod.name}
                              style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px", flexShrink: 0 }}
                            />
                          ) : (
                            <div style={{ width: "50px", height: "50px", background: "#f1f5f9", borderRadius: "6px", flexShrink: 0 }}></div>
                          )}
                          <div>
                            <div style={{ fontWeight: "bold" }}>{prod.name}</div>
                            <div style={{ fontSize: "0.85rem", color: "#62686f" }}>{prod.tags?.join(", ")}</div>
                            {prod.sizes && parseSizesToEntries(prod.sizes).length > 0 && (
                              <div style={{ marginTop: "4px", display: "flex", flexWrap: "wrap", gap: "4px" }}>
                                {parseSizesToEntries(prod.sizes).map((s, idx) => (
                                  <span
                                    key={idx}
                                    style={{
                                      fontSize: "0.72rem",
                                      background: "#f1f5f9",
                                      border: "1px solid #e2e8f0",
                                      borderRadius: "4px",
                                      padding: "1px 6px",
                                      color: "#334155",
                                    }}
                                  >
                                    {s.size}{s.price ? `: ₹${s.price}` : ""}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "16px" }}>{prod.category?.name || "Unknown"}</td>
                      <td style={{ padding: "16px" }}>
                        {prod.startingPrice ? (
                          prod.priceType === "fixed" ? `₹${prod.startingPrice}` : `From ₹${prod.startingPrice}`
                        ) : "-"}
                      </td>
                      <td style={{ padding: "16px" }}>
                        {prod.isActive ? (
                          <span style={{ color: "#10b981", background: "#ecfdf5", padding: "4px 8px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: "bold" }}>
                            Active
                          </span>
                        ) : (
                          <span style={{ color: "#ef4444", background: "#fef2f2", padding: "4px 8px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: "bold" }}>
                            Inactive
                          </span>
                        )}
                      </td>
                      <td style={{ padding: "16px", textAlign: "right", whiteSpace: "nowrap" }}>
                        <button
                          onClick={() => openModal(prod)}
                          style={{ padding: "6px 12px", border: "1px solid #e6e9e5", background: "#fff", borderRadius: "4px", cursor: "pointer", marginRight: "8px" }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(prod.id)}
                          style={{ padding: "6px 12px", border: "1px solid #fecaca", background: "#fef2f2", color: "#ef4444", borderRadius: "4px", cursor: "pointer" }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Modal Overlay */}
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
              maxWidth: "600px",
              borderRadius: "12px",
              padding: "24px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxSizing: "border-box",
            }}
          >
            <h2 style={{ marginTop: 0, fontSize: "1.5rem" }}>{editingProd ? "Edit Product" : "Add Product"}</h2>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Responsive Grid Row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
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
                  <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Category *</label>
                  <select
                    required
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #e6e9e5", boxSizing: "border-box" }}
                  >
                    <option value="">-- Select Category --</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
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

              {/* Responsive Grid Row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Price Type</label>
                  <select
                    value={formData.priceType}
                    onChange={(e) => setFormData({ ...formData, priceType: e.target.value as "starting" | "fixed" })}
                    style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #e6e9e5", boxSizing: "border-box" }}
                  >
                    <option value="starting">Starting From</option>
                    <option value="fixed">Fixed Price</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>
                    {formData.priceType === "starting" ? "Base / Starting Price (₹)" : "Price (₹)"}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.startingPrice}
                    onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                    placeholder="e.g. 299"
                    style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #e6e9e5", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Tags (comma separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="e.g. Sublimation, Premium"
                    style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #e6e9e5", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              {/* Sizes and Size-Wise Pricing Builder */}
              <div
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                  <div>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "0.95rem", color: "#1e293b" }}>
                      Sizes & Size-Wise Pricing (Optional)
                    </label>
                  </div>
                  {sizeEntries.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setSizeEntries([])}
                      style={{
                        fontSize: "0.8rem",
                        padding: "4px 8px",
                        background: "transparent",
                        border: "1px solid #cbd5e1",
                        borderRadius: "4px",
                        color: "#64748b",
                        cursor: "pointer",
                      }}
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Size Rows */}
                {sizeEntries.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "14px", background: "#fff", border: "1px dashed #cbd5e1", borderRadius: "6px", color: "#94a3b8", fontSize: "0.85rem" }}>
                    No sizes added yet. Click &quot;+ Add Size&quot; or choose a quick preset above.
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "240px", overflowY: "auto", paddingRight: "4px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 40px", gap: "8px", fontSize: "0.75rem", fontWeight: "bold", color: "#64748b", padding: "0 4px" }}>
                      <span>SIZE / VARIANT NAME</span>
                      <span>PRICE (₹) (OPTIONAL)</span>
                      <span></span>
                    </div>
                    {sizeEntries.map((entry, idx) => (
                      <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 40px", gap: "8px", alignItems: "center" }}>
                        <input
                          type="text"
                          placeholder="e.g. S, 10 inch, 42"
                          value={entry.size}
                          onChange={(e) => {
                            const updated = [...sizeEntries];
                            updated[idx].size = e.target.value;
                            setSizeEntries(updated);
                          }}
                          style={{
                            padding: "8px 10px",
                            borderRadius: "6px",
                            border: "1px solid #cbd5e1",
                            background: "#fff",
                            fontSize: "0.88rem",
                            boxSizing: "border-box",
                            width: "100%",
                          }}
                        />
                        <input
                          type="number"
                          step="0.01"
                          placeholder="e.g. 299 (optional)"
                          value={entry.price}
                          onChange={(e) => {
                            const updated = [...sizeEntries];
                            updated[idx].price = e.target.value;
                            setSizeEntries(updated);
                          }}
                          style={{
                            padding: "8px 10px",
                            borderRadius: "6px",
                            border: "1px solid #cbd5e1",
                            background: "#fff",
                            fontSize: "0.88rem",
                            boxSizing: "border-box",
                            width: "100%",
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setSizeEntries(sizeEntries.filter((_, i) => i !== idx));
                          }}
                          title="Remove size"
                          style={{
                            height: "36px",
                            border: "1px solid #fecaca",
                            background: "#fef2f2",
                            color: "#ef4444",
                            borderRadius: "6px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            fontSize: "1rem",
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px", flexWrap: "wrap", gap: "8px" }}>
                  <button
                    type="button"
                    onClick={() => setSizeEntries([...sizeEntries, { size: "", price: "" }])}
                    style={{
                      padding: "8px 14px",
                      background: "#fff",
                      border: "1px dashed #64748b",
                      borderRadius: "6px",
                      color: "#334155",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                    }}
                  >
                    + Add Size
                  </button>

                  {/* Suggest min price button if sizes have prices */}
                  {(() => {
                    const prices = sizeEntries
                      .map((e) => (e.price.trim() !== "" ? parseFloat(e.price) : null))
                      .filter((p): p is number => p !== null && !isNaN(p));
                    if (prices.length > 0) {
                      const minPrice = Math.min(...prices);
                      return (
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, startingPrice: String(minPrice) })}
                          style={{
                            fontSize: "0.78rem",
                            padding: "6px 10px",
                            background: "#eff6ff",
                            border: "1px solid #bfdbfe",
                            borderRadius: "4px",
                            color: "#2563eb",
                            cursor: "pointer",
                            fontWeight: "500",
                          }}
                        >
                          Set Base Price to lowest size (₹{minPrice})
                        </button>
                      );
                    }
                    return null;
                  })()}
                </div>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = e.target.files;
                    setImageFiles(files);
                    if (files && files.length > 0) {
                      const previews = Array.from(files).map((f) => URL.createObjectURL(f));
                      setImagePreviews(previews);
                    } else {
                      setImagePreviews([]);
                    }
                  }}
                  style={{ width: "100%", marginBottom: "8px" }}
                />

                {/* New file previews */}
                {imagePreviews.length > 0 && (
                  <div>
                    <div style={{ fontSize: "0.8rem", color: "#62686f", marginBottom: "6px" }}>Selected images (will replace existing):</div>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {imagePreviews.map((src, i) => (
                        <img key={i} src={src} alt={`Preview ${i + 1}`}
                          style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px", border: "2px solid #ed0f63" }} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Existing images when editing */}
                {editingProd?.images && editingProd.images.length > 0 && imagePreviews.length === 0 && (
                  <div style={{ marginTop: "10px" }}>
                    <div style={{ fontSize: "0.8rem", color: "#62686f", marginBottom: "6px" }}>Current images (click ✕ to remove):</div>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {editingProd.images
                        .filter((img) => !removedImages.includes(img))
                        .map((img, i) => (
                          <div key={i} style={{ position: "relative", cursor: "pointer" }}
                            onClick={() => setRemovedImages((prev) => [...prev, img])}
                            title="Click to remove">
                            <img src={getDirectImageUrl(img)} alt={`Img ${i}`}
                              style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px", border: "1px solid #e6e9e5" }} />
                            <div style={{
                              position: "absolute", top: "-6px", right: "-6px",
                              background: "#ef4444", color: "#fff",
                              borderRadius: "50%", width: "18px", height: "18px",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: "12px", fontWeight: "bold",
                            }}>×</div>
                          </div>
                        ))}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "6px" }}>
                      Selecting new images above will replace all current images.
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Catalog PDF (Optional)</label>
                <input type="file" accept="application/pdf" onChange={(e) => setPdfFile(e.target.files?.[0] || null)} style={{ width: "100%" }} />
                {editingProd?.catalogPdfUrl && !pdfFile && (
                  <div style={{ marginTop: "8px", fontSize: "0.9rem" }}>
                    <a href={editingProd.catalogPdfUrl} target="_blank" rel="noreferrer" style={{ color: "#3b82f6", textDecoration: "underline" }}>
                      View Current Catalog
                    </a>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", gap: "20px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                  Is Active
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

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "16px", flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={closeModal}
                  style={{ padding: "10px 16px", background: "#f3f4f6", border: "none", borderRadius: "6px", cursor: "pointer", flex: "1 1 auto", textAlign: "center" }}
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
                    flex: "1 1 auto",
                    textAlign: "center",
                  }}
                >
                  {saving ? "Saving..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}