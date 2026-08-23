"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { Header } from "@/components/Header";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    requirement: "Select category",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Connect this to your backend, WhatsApp API, or email service
    toast.success(`Thank you, ${formData.name}! Your enquiry has been submitted.`);
  };

  return (
    <>
      <Header />
      <main>
        <section
          className="page-hero"
          style={{ "--hero": "url('/hero-slide-1.jpg')" } as React.CSSProperties}
        >
          <div className="container inner">
            <div className="page-copy">
              <div className="breadcrumb">
                <Link href="/">Home</Link> / Contact
              </div>
              <h1>
                Tell Us What <span>You Need</span>
              </h1>
              <p>
                Send the product, quantity, logo/design requirement and event date. For custom orders, a reference image is especially helpful.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="container contact-wrap">
            <div className="info-box">
              <h3>Quick Enquiry</h3>
              <p>
                <b>WhatsApp:</b> +91 98765 43210
                <br />
                <b>Email:</b> info@sportzmitra.com
                <br />
                <b>Location:</b> Mumbai, Maharashtra, India
              </p>
              <p>
                For a faster quotation, include quantity, custom names/numbers, logo, approximate budget and delivery date.
              </p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label htmlFor="mobile">Mobile</label>
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  required
                  placeholder="+91"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label htmlFor="requirement">Requirement</label>
                <select
                  id="requirement"
                  name="requirement"
                  value={formData.requirement}
                  onChange={handleChange}
                >
                  <option value="Select category">Select category</option>
                  <option value="Auction Accessories">Auction Accessories</option>
                  <option value="Trophies & Medals">Trophies & Medals</option>
                  <option value="Custom Jerseys">Custom Jerseys</option>
                  <option value="Printing Services">Printing Services</option>
                  <option value="Sports Accessories">Sports Accessories</option>
                  <option value="Sports Event Planning">Sports Event Planning</option>
                </select>
              </div>

              <div className="field full">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Quantity, size, customisation, event date, budget or reference details..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <div className="field full">
                <button className="btn btn-pink" type="submit">
                  SUBMIT ENQUIRY →
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <CtaBand />
      <Footer />
    </>
  );
}