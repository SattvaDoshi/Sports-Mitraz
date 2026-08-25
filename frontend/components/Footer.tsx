"use client";

import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer">
          <div>
            <img src="/sportzmitra-logo.png" className="footer-logo" alt="SportzMitra Logo" />
            <p>SportzMitra is your one-stop solution for sports event needs. We provide custom products and event support with sports-focused execution.</p>
          </div>
          <div>
            <h4>QUICK LINKS</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/event-planning">Sports Event Planning</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4>OUR PRODUCTS</h4>
            <ul>
              <li><a href="/products/auction-accessories">Auction Accessories</a></li>
              <li><a href="/products/trophies-medals">Trophies & Medals</a></li>
              <li><a href="/products/custom-jerseys">Custom Jerseys</a></li>
              <li><a href="/products/printing-services">Printing Services</a></li>
              <li><a href="/products/sports-accessories">Sports Accessories</a></li>
            </ul>
          </div>
          <div>
            <h4>CONTACT INFO</h4>
            <ul>
              <li>☎ +91 98765 43210</li>
              <li>✉ info@sportzmitra.com</li>
              <li>⌖ Mumbai, Maharashtra, India</li>
            </ul>
          </div>
        </div>
        <div className="copy">© 2026 SportzMitra Store. All Rights Reserved.</div>
      </div>
    </footer>
  );
};