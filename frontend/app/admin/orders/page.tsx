"use client";

import React, { useEffect, useState } from "react";
import { fetchApi } from "@/lib/api";

interface Order {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  product: string | null;
  message: string;
  status: "pending" | "confirmed" | "booked" | "cancelled";
  adminNotes: string | null;
  createdAt: string;
  sheetSynced: boolean;
  productDetails?: { id: number; name: string } | null;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [adminNotes, setAdminNotes] = useState("");

  const loadOrders = async (status = "all") => {
    setLoading(true);
    try {
      const endpoint = status === "all" ? "/admin/orders" : `/admin/orders?status=${status}`;
      const response = await fetchApi(endpoint, { isAdmin: true });
      if (response.success) {
        setOrders(response.data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders(statusFilter);
  }, [statusFilter]);

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await fetchApi(`/admin/orders/${orderId}/status`, {
        method: "PATCH",
        isAdmin: true,
        body: JSON.stringify({ status: newStatus }),
      });
      setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus as any } : o)));
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus as any });
      }
    } catch (err: any) {
      alert(err.message || "Failed to update status");
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedOrder) return;
    try {
      await fetchApi(`/admin/orders/${selectedOrder.id}/notes`, {
        method: "PATCH",
        isAdmin: true,
        body: JSON.stringify({ adminNotes }),
      });

      setOrders(orders.map((o) => (o.id === selectedOrder.id ? { ...o, adminNotes } : o)));
      setSelectedOrder({ ...selectedOrder, adminNotes });
      alert("Notes saved successfully");
    } catch (err: any) {
      alert(err.message || "Failed to save notes");
    }
  };

  const openOrderModal = (order: Order) => {
    setSelectedOrder(order);
    setAdminNotes(order.adminNotes || "");
  };

  const closeOrderModal = () => {
    setSelectedOrder(null);
    setAdminNotes("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "#f59e0b";
      case "confirmed":
        return "#3b82f6";
      case "booked":
        return "#10b981";
      case "cancelled":
        return "#ef4444";
      default:
        return "#62686f";
    }
  };

  return (
    <div style={{ padding: "16px", maxWidth: "1200px", margin: "0 auto", boxSizing: "border-box" }}>
      <style>{`
        @media (max-width: 640px) {
          .orders-header {
            flex-direction: column;
            align-items: stretch !important;
            gap: 12px;
          }
          .orders-header select {
            width: 100%;
          }
          .modal-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div
        className="orders-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1 style={{ color: "#111318", margin: 0, fontSize: "clamp(1.5rem, 4vw, 2rem)" }}>
          Orders / Enquiries
        </h1>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #e6e9e5" }}
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="booked">Booked (Completed)</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {error && <div style={{ color: "red", marginBottom: "20px" }}>{error}</div>}

      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e6e9e5", overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>
        ) : orders.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#62686f" }}>No orders found.</div>
        ) : (
          /* Horizontal scroll wrapper for mobile & tablet */
          <div style={{ width: "100%", overflowX: "auto" }}>
            <table style={{ width: "100%", minWidth: "650px", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "#f7f8f5", borderBottom: "1px solid #e6e9e5" }}>
                  <th style={{ padding: "16px", fontWeight: "bold", color: "#111318" }}>ID / Date</th>
                  <th style={{ padding: "16px", fontWeight: "bold", color: "#111318" }}>Customer</th>
                  <th style={{ padding: "16px", fontWeight: "bold", color: "#111318" }}>Requirement</th>
                  <th style={{ padding: "16px", fontWeight: "bold", color: "#111318" }}>Status</th>
                  <th style={{ padding: "16px", fontWeight: "bold", color: "#111318", textAlign: "right" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: "1px solid #e6e9e5" }}>
                    <td style={{ padding: "16px" }}>
                      <div style={{ fontWeight: "bold" }}>#{order.id}</div>
                      <div style={{ fontSize: "0.85rem", color: "#62686f" }}>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td style={{ padding: "16px" }}>
                      <div style={{ fontWeight: "bold" }}>{order.name}</div>
                      <div style={{ fontSize: "0.85rem", color: "#62686f" }}>{order.phone}</div>
                    </td>
                    <td style={{ padding: "16px" }}>
                      <div>{order.product || "General Enquiry"}</div>
                      {order.sheetSynced ? (
                        <span
                          style={{
                            fontSize: "0.75rem",
                            background: "#e0f2fe",
                            color: "#0284c7",
                            padding: "2px 6px",
                            borderRadius: "4px",
                            display: "inline-block",
                            marginTop: "4px",
                          }}
                        >
                          Synced to Sheets
                        </span>
                      ) : null}
                    </td>
                    <td style={{ padding: "16px" }}>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        style={{
                          padding: "6px 10px",
                          borderRadius: "4px",
                          border: `1px solid ${getStatusColor(order.status)}`,
                          color: getStatusColor(order.status),
                          fontWeight: "bold",
                          background: "transparent",
                          cursor: "pointer",
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="booked">Booked</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td style={{ padding: "16px", textAlign: "right" }}>
                      <button
                        onClick={() => openOrderModal(order)}
                        style={{
                          background: "#f3f4f6",
                          border: "1px solid #d1d5db",
                          padding: "6px 12px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontWeight: "500",
                          whiteSpace: "nowrap",
                        }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
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
              padding: "20px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ margin: 0, fontSize: "1.3rem" }}>Order #{selectedOrder.id} Details</h2>
              <button
                onClick={closeOrderModal}
                style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", padding: "4px" }}
              >
                ✕
              </button>
            </div>

            <div
              className="modal-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "20px",
              }}
            >
              <div>
                <strong>Customer Name:</strong>
                <div>{selectedOrder.name}</div>
              </div>
              <div>
                <strong>Phone:</strong>
                <div>{selectedOrder.phone}</div>
              </div>
              <div>
                <strong>Email:</strong>
                <div>{selectedOrder.email || "N/A"}</div>
              </div>
              <div>
                <strong>Date:</strong>
                <div>{new Date(selectedOrder.createdAt).toLocaleString()}</div>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <strong>Requirement:</strong>
                <div>{selectedOrder.product || "General"}</div>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <strong>Message / Details:</strong>
                <div
                  style={{
                    background: "#f8f9fa",
                    padding: "15px",
                    borderRadius: "6px",
                    marginTop: "10px",
                    whiteSpace: "pre-wrap",
                    lineHeight: "1.5",
                  }}
                >
                  {selectedOrder.message}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px" }}>
                Admin Notes
              </label>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add private notes here..."
                rows={4}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #e6e9e5",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <button
                onClick={closeOrderModal}
                style={{
                  padding: "10px 16px",
                  background: "#f3f4f6",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                style={{
                  padding: "10px 16px",
                  background: "#111318",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}