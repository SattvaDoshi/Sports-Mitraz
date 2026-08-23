"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleFinalSubmit = async () => {
    try {
      // Extract customer details (prioritize customization, fallback to auth user)
      const firstCustomization = cart.find(c => c.customization)?.customization;
      const customerName = firstCustomization?.name || user?.email?.split('@')[0] || "Customer";
      const customerPhone = firstCustomization?.mobile || user?.phone || "N/A";
      const customerEmail = firstCustomization?.email || user?.email || "";

      // Combine products
      const productSummary = cart.map(item => `${item.title} (x${item.quantity})`).join(", ");
      
      // Combine messages (excluding redundant user details)
      const messageSummary = cart.map(item => {
        if (!item.customization) return `- ${item.title}: Standard (No customization)`;
        return `- ${item.title}:\n  Specs: ${item.customization?.message || "No specs provided"}`;
      }).join("\n\n");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: customerName,
          phone: customerPhone,
          email: customerEmail,
          product: productSummary.substring(0, 300), // Max length in DB is 300
          message: `Order Details:\n${messageSummary}`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Your final order has been placed successfully! It will show up in the admin dashboard.");
        clearCart();
        router.push("/");
      } else {
        alert(data.message || "Failed to submit order.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while placing the order.");
    }
  };

  return (
    <>
      <Header />
      <main className="container" style={{ padding: "60px 20px" }}>
        <h1>Order & Quote Summary</h1>
        <p style={{ marginBottom: "30px", color: "#666" }}>
          Review your items and custom quotation details before final submission.
        </p>

        {cart.length === 0 ? (
          <div>
            <p>No items in your quote cart.</p>
            <Link href="/products" className="btn btn-pink" style={{ display: "inline-block", marginTop: "15px" }}>
              EXPLORE PRODUCTS
            </Link>
          </div>
        ) : (
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    border: "1px solid #ddd",
                    padding: "20px",
                    borderRadius: "8px",
                    display: "flex",
                    gap: "20px",
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "6px" }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3>{item.title}</h3>
                    <p style={{ fontWeight: "bold", color: "#e91e63" }}>Starting from ₹{item.price}</p>

                    {item.customization ? (
                      <div style={{ marginTop: "10px", background: "#f9f9f9", padding: "10px", borderRadius: "4px" }}>
                        <strong>Custom Details:</strong>
                        <p style={{ margin: "2px 0", fontSize: "0.9rem" }}><b>Name:</b> {item.customization?.name || "N/A"}</p>
                        <p style={{ margin: "2px 0", fontSize: "0.9rem" }}><b>Mobile:</b> {item.customization?.mobile || "N/A"}</p>
                        <p style={{ margin: "2px 0", fontSize: "0.9rem" }}><b>Email:</b> {item.customization?.email || "N/A"}</p>
                        <p style={{ margin: "2px 0", fontSize: "0.9rem" }}><b>Message:</b> {item.customization?.message || "N/A"}</p>
                      </div>
                    ) : (
                      <div style={{ marginTop: "10px", background: "#f9f9f9", padding: "10px", borderRadius: "4px" }}>
                        <strong>No custom details provided</strong>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "30px", textAlign: "right" }}>
              <button className="btn btn-pink" onClick={handleFinalSubmit}>
                SUBMIT FINAL QUOTE →
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}