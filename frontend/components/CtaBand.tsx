"use client";

import React from "react";

export const CtaBand: React.FC = () => {
  return (
    <section className="cta" id="contact">
      <div className="container cta-grid">
        <h3>READY TO MAKE YOUR EVENT <span>UNFORGETTABLE?</span></h3>
        <div className="contact-box">
          <div className="contact-icon">☎</div>
          <div><small>CONTACT US</small><b>+91 98765 43210</b></div>
        </div>
        <div className="contact-box">
          <div className="contact-icon">✉</div>
          <div><small>EMAIL US</small><b>info@sportzmitra.com</b></div>
        </div>
      </div>
    </section>
  );
};