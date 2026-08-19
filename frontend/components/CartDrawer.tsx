"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: "380px",
        maxWidth: "100%",
        backgroundColor: "#fff",
        boxShadow: "-4px 0 15px rgba(0, 0, 0, 0.15)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justify: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #eee",
          paddingBottom: "15px",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "1.25rem" }}>Your Cart ({cart.length})</h2>
        <button
          onClick={() => setIsCartOpen(false)}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          ✕
        </button>
      </div>

      {/* Cart Items List */}
      <div style={{ flex: 1, padding: "20px 0", overflowY: "auto" }}>
        {cart.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888", marginTop: "40px" }}>
            Your cart is empty.
          </p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                gap: "12px",
                marginBottom: "15px",
                paddingBottom: "15px",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: "0 0 5px 0", fontSize: "0.95rem" }}>
                  {item.title}
                </h4>
                <p style={{ margin: 0, color: "#e91e63", fontWeight: "bold" }}>
                  ₹{item.price}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#999",
                  cursor: "pointer",
                  height: "fit-content",
                }}
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer Controls */}
      <div
        style={{
          borderTop: "1px solid #eee",
          paddingTop: "15px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
            fontSize: "1.1rem",
            marginBottom: "5px",
          }}
        >
          <span>Total:</span>
          <span style={{ color: "#e91e63" }}>₹{total}</span>
        </div>

        {/* Shop More Products Button */}
        <Link
          href="/products"
          onClick={() => setIsCartOpen(false)}
          className="btn btn-lime"
          style={{
            display: "block",
            textAlign: "center",
            textDecoration: "none",
            width: "100%",
            padding: "10px 0",
          }}
        >
          🛍️ SHOP MORE PRODUCTS
        </Link>

        {/* Proceed to Checkout Button */}
        <Link
          href="/checkout"
          onClick={() => setIsCartOpen(false)}
          className="btn btn-pink"
          style={{
            display: "block",
            textAlign: "center",
            textDecoration: "none",
            width: "100%",
            padding: "10px 0",
          }}
        >
          PROCEED TO CHECKOUT →
        </Link>
      </div>
    </div>
  );
};