"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";

export const CtaBand: React.FC = () => {
  return (
    <section className="ctaband-section" id="contact">
      <div className="ctaband-container">
        {/* Left Headline & Subtext */}
        <div className="ctaband-text-content">
          <h2 className="ctaband-title">
            READY TO MAKE YOUR EVENT <br />
            <span className="ctaband-highlight">UNFORGETTABLE?</span>
          </h2>
          <p className="ctaband-description">
            Let's bring your vision to life. Get in touch with our team for
            expert guidance, customized solutions, and the best sports event
            experience.
          </p>
        </div>

        {/* Right Contact Info & CTA Button */}
        <div className="ctaband-action-group">
          <a href="tel:+919876543210" className="ctaband-contact-item">
            <div className="ctaband-icon-circle">
              <Phone size={16} strokeWidth={2} className="ctaband-contact-icon" />
            </div>
            <div className="ctaband-contact-details">
              <small>CONTACT US</small>
              <b>+91 98765 43210</b>
            </div>
          </a>

          <a href="mailto:info@sportzmitra.com" className="ctaband-contact-item">
            <div className="ctaband-icon-circle">
              <Mail size={16} strokeWidth={2} className="ctaband-contact-icon" />
            </div>
            <div className="ctaband-contact-details">
              <small>EMAIL US</small>
              <b>info@sportzmitra.com</b>
            </div>
          </a>

          <Link
  href="#contact"
  style={{
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",

    width: "fit-content",
    minWidth: "170px",
    height: "48px",

    padding: "0 26px",

    boxSizing: "border-box",

    backgroundColor: "#a7d900",
    color: "#111318",

    border: "2px solid #a7d900",
    borderRadius: "8px",

    fontFamily: "inherit",
    fontSize: "13px",
    fontWeight: 900,
    lineHeight: 1,
    letterSpacing: "0.05em",

    textDecoration: "none",
    textTransform: "uppercase",
    whiteSpace: "nowrap",

    cursor: "pointer",

    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",

    transition:
      "background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
  }}
>
  GET IN TOUCH
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "16px",
      lineHeight: 1,
      color: "#111318",
    }}
  >
    →
  </span>
</Link>
        </div>
      </div>

      <style jsx>{`
        .ctaband-section {
          position: relative;
          width: 100%;
          background: url("/CtaBand-bg.png") center center / cover no-repeat;
          padding: 48px 5%;
          color: #ffffff;
          box-sizing: border-box;
          overflow: hidden;
        }

        .ctaband-container {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
        }

        .ctaband-text-content {
          max-width: 500px;
        }

        .ctaband-title {
          font-size: 26px;
          font-weight: 900;
          line-height: 1.2;
          letter-spacing: 0.02em;
          color: #ffffff;
          margin: 0 0 10px 0;
          text-transform: uppercase;
        }

        .ctaband-title .ctaband-highlight {
          color: #8cc63f;
        }

        .ctaband-description {
          font-size: 13px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.85);
          margin: 0;
        }

        .ctaband-action-group {
          display: flex;
          align-items: center;
          gap: 28px;
          flex-wrap: wrap;
        }

        .ctaband-contact-item {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: #ffffff;
          transition: opacity 0.2s ease;
        }

        .ctaband-contact-item:hover {
          opacity: 0.9;
        }

        /* Icon circle — properly centered, smaller icon inside */
        .ctaband-icon-circle {
          width: 42px;
          height: 42px;
          min-width: 42px;
          border-radius: 50%;
          background-color: #8cc63f;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          line-height: 0;
        }

        .ctaband-contact-icon {
          color: #111111;
          display: block;
        }

        .ctaband-contact-details {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .ctaband-contact-details small {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.2;
        }

        .ctaband-contact-details b {
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.02em;
          line-height: 1.3;
          margin-top: 2px;
        }

        /* GET IN TOUCH — solid lime pill, clearly a button */
        .ctaband-get-in-touch-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background-color: #a7d900;
          color: #111318;
          padding: 14px 30px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.05em;
          text-decoration: none;
          white-space: nowrap;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
          transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
        }

        .ctaband-get-in-touch-btn:hover {
          background-color: #8ec000;
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
        }

        .ctaband-arrow {
          font-family: sans-serif;
          font-size: 15px;
          transition: transform 0.2s ease;
        }

        .ctaband-get-in-touch-btn:hover .ctaband-arrow {
          transform: translateX(3px);
        }

        /* Laptop / Small Desktop */
        @media (max-width: 1024px) {
          .ctaband-title {
            font-size: 22px;
          }
          .ctaband-action-group {
            gap: 20px;
          }
        }

        /* Tablet View */
        @media (max-width: 868px) {
          .ctaband-container {
            flex-direction: column;
            text-align: center;
          }

          .ctaband-text-content {
            max-width: 100%;
          }

          .ctaband-action-group {
            justify-content: center;
            gap: 24px;
            width: 100%;
          }
        }

        /* Mobile View */
        @media (max-width: 580px) {
          .ctaband-section {
            padding: 36px 20px;
          }

          .ctaband-title {
            font-size: 20px;
          }

          .ctaband-title br {
            display: none;
          }

          .ctaband-action-group {
            flex-direction: column;
            align-items: stretch;
            width: 100%;
            gap: 16px;
          }

          .ctaband-contact-item {
            justify-content: flex-start;
            background: rgba(255, 255, 255, 0.08);
            padding: 10px 16px;
            border-radius: 12px;
            width: 100%;
            box-sizing: border-box;
          }

          .ctaband-get-in-touch-btn {
            width: 100%;
            padding: 16px 20px;
            margin-top: 4px;
            box-sizing: border-box;
          }
        }
      `}</style>
    </section>
  );
};

export default CtaBand;