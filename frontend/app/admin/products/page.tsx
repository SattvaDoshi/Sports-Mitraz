"use client";

import React, { useEffect, useState } from "react";
import { fetchApi } from "@/lib/api";

interface Category {
  id: number;
  name: string;
  slug: string;
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
  isActive: boolean;
  sortOrder: number;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProd, setEditingProd] = useState<Product | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startingPrice: "",
    categoryId: "",
    tags: "",
    isActive: true,
    sortOrder: 0
  });
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        fetchApi("/admin/products", { isAdmin: true }),
        fetchApi("/admin/categories/flat", { isAdmin: true })
      ]);
      if (prodRes.success) setProducts(prodRes.data);
      if (catRes.success) setCategories(catRes.data);
    } catch (err: any) {
      alert(err.message || "Failed to load data");
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
      setFormData({
        name: prod.name,
        description: prod.description || "",
        startingPrice: prod.startingPrice || "",
        categoryId: prod.categoryId.toString(),
        tags: prod.tags.join(", "),
        isActive: prod.isActive,
        sortOrder: prod.sortOrder
      });
    } else {
      setEditingProd(null);
      setFormData({
        name: "",
        description: "",
        startingPrice: "",
        categoryId: categories.length > 0 ? categories[0].id.toString() : "",
        tags: "",
        isActive: true,
        sortOrder: 0
      });
    }
    setImageFiles(null);
    setPdfFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProd(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const fd = new FormData();
      fd.append("name", formData.name);
      if (formData.description) fd.append("description", formData.description);
      if (formData.startingPrice) fd.append("startingPrice", formData.startingPrice);
      fd.append("categoryId", formData.categoryId);
      fd.append("tags", formData.tags);
      fd.append("isActive", String(formData.isActive));
      fd.append("sortOrder", String(formData.sortOrder));
      
      if (imageFiles) {
        for (let i = 0; i < imageFiles.length; i++) {
          fd.append("images", imageFiles[i]);
        }
      }
      
      if (pdfFile) {
        fd.append("catalogPdf", pdfFile);
      }

      const endpoint = editingProd ? `/admin/products/${editingProd.id}` : "/admin/products";
      const method = editingProd ? "PUT" : "POST";

      const res = await fetchApi(endpoint, {
        method,
        isAdmin: true,
        body: fd
      });

      if (res.success) {
        closeModal();
        loadData();
      }
    } catch (err: any) {
      alert(err.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const res = await fetchApi(`/admin/products/${id}`, {
        method: "DELETE",
        isAdmin: true
      });
      if (res.success) {
        loadData();
      }
    } catch (err: any) {
      alert(err.message || "Failed to delete product");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ margin: 0 }}>Products</h1>
        <button 
          onClick={() => openModal()}
          style={{ padding: "10px 20px", background: "#ed0f63", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}
        >
          + Add Product
        </button>
      </div>

      {loading ? (
        <div>Loading products...</div>
      ) : (
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e6e9e5", overflow: "hidden" }}>
          {products.length === 0 ? (
            <div style={{ padding: "40px", textAlign: "center", color: "#62686f" }}>No products found.</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
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
                          <img src={prod.images[0]} alt={prod.name} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px" }} />
                        ) : (
                          <div style={{ width: "50px", height: "50px", background: "#f1f5f9", borderRadius: "6px" }}></div>
                        )}
                        <div>
                          <div style={{ fontWeight: "bold" }}>{prod.name}</div>
                          <div style={{ fontSize: "0.85rem", color: "#62686f" }}>{prod.tags?.join(", ")}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "16px" }}>{prod.category?.name || "Unknown"}</td>
                    <td style={{ padding: "16px" }}>{prod.startingPrice ? `₹${prod.startingPrice}` : "-"}</td>
                    <td style={{ padding: "16px" }}>
                      {prod.isActive ? (
                        <span style={{ color: "#10b981", background: "#ecfdf5", padding: "4px 8px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: "bold" }}>Active</span>
                      ) : (
                        <span style={{ color: "#ef4444", background: "#fef2f2", padding: "4px 8px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: "bold" }}>Inactive</span>
                      )}
                    </td>
                    <td style={{ padding: "16px", textAlign: "right" }}>
                      <button onClick={() => openModal(prod)} style={{ padding: "6px 12px", border: "1px solid #e6e9e5", background: "#fff", borderRadius: "4px", cursor: "pointer", marginRight: "8px" }}>Edit</button>
                      <button onClick={() => handleDelete(prod.id)} style={{ padding: "6px 12px", border: "1px solid #fecaca", background: "#fef2f2", color: "#ef4444", borderRadius: "4px", cursor: "pointer" }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{ background: "#fff", width: "90%", maxWidth: "600px", borderRadius: "12px", padding: "24px", maxHeight: "90vh", overflowY: "auto" }}>
            <h2 style={{ marginTop: 0 }}>{editingProd ? "Edit Product" : "Add Product"}</h2>
            
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Name *</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #e6e9e5" }} />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Category *</label>
                  <select required value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #e6e9e5" }}>
                    <option value="">-- Select Category --</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Description</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #e6e9e5" }} />
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Starting Price (₹)</label>
                  <input type="number" step="0.01" value={formData.startingPrice} onChange={e => setFormData({...formData, startingPrice: e.target.value})} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #e6e9e5" }} />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Tags (comma separated)</label>
                  <input type="text" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} placeholder="e.g. Sublimation, Premium" style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #e6e9e5" }} />
                </div>
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Images</label>
                <input type="file" accept="image/*" multiple onChange={e => setImageFiles(e.target.files)} style={{ width: "100%", marginBottom: "8px" }} />
                <div style={{ fontSize: "0.85rem", color: "#62686f" }}>
                  {editingProd ? "Uploading new images will append to existing ones." : "You can select multiple images."}
                </div>
                {editingProd?.images && editingProd.images.length > 0 && (
                  <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
                    {editingProd.images.map((img, i) => (
                      <img key={i} src={img} alt={`Img ${i}`} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px", border: "1px solid #e6e9e5" }} />
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Catalog PDF (Optional)</label>
                <input type="file" accept="application/pdf" onChange={e => setPdfFile(e.target.files?.[0] || null)} style={{ width: "100%" }} />
                {editingProd?.catalogPdfUrl && !pdfFile && (
                  <div style={{ marginTop: "8px", fontSize: "0.9rem" }}>
                    <a href={editingProd.catalogPdfUrl} target="_blank" rel="noreferrer" style={{ color: "#3b82f6", textDecoration: "underline" }}>View Current Catalog</a>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", gap: "20px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} />
                  Is Active
                </label>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Sort Order</label>
                <input type="number" value={formData.sortOrder} onChange={e => setFormData({...formData, sortOrder: parseInt(e.target.value) || 0})} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #e6e9e5" }} />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "16px" }}>
                <button type="button" onClick={closeModal} style={{ padding: "10px 16px", background: "#f3f4f6", border: "none", borderRadius: "6px", cursor: "pointer" }}>Cancel</button>
                <button type="submit" disabled={saving} style={{ padding: "10px 16px", background: "#ed0f63", color: "#fff", border: "none", borderRadius: "6px", cursor: saving ? "not-allowed" : "pointer" }}>
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
