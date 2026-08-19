"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();

  const handleFinalSubmit = () => {
    alert("Your final quote request has been submitted successfully! We will contact you shortly.");
    clearCart();
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

                    <div style={{ marginTop: "10px", background: "#f9f9f9", padding: "10px", borderRadius: "4px" }}>
                      <strong>Custom Details:</strong>
                      <p style={{ margin: "2px 0", fontSize: "0.9rem" }}><b>Name:</b> {item.customization.name}</p>
                      <p style={{ margin: "2px 0", fontSize: "0.9rem" }}><b>Mobile:</b> {item.customization.mobile}</p>
                      <p style={{ margin: "2px 0", fontSize: "0.9rem" }}><b>Email:</b> {item.customization.email}</p>
                      <p style={{ margin: "2px 0", fontSize: "0.9rem" }}><b>Message:</b> {item.customization.message}</p>
                    </div>
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