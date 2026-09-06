"use client";

import React from "react";
import { Medal, PenTool, Truck, Headset, ShieldCheck } from "lucide-react";

const items = [
  {
    icon: Medal,
    title: "PREMIUM QUALITY",
    text: "We use the best materials for the best performance.",
  },
  {
    icon: PenTool,
    title: "CUSTOMIZATION",
    text: "Your ideas, your logo, your identity.",
  },
  {
    icon: Truck,
    title: "ON-TIME DELIVERY",
    text: "We value your time as much as you do.",
  },
  {
    icon: Headset,
    title: "EXPERT SUPPORT",
    text: "Friendly support & guidance at every step.",
  },
  {
    icon: ShieldCheck,
    title: "SECURE PAYMENT",
    text: "Safe, secure & hassle-free transactions.",
  },
];

export function Benefits() {
  return (
    <div className="benefits-wrapper">
      <div className="benefits-container">
        <div className="benefits-grid">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="benefit-item">
                <Icon
                  size={36}
                  color="#8cc63f"
                  strokeWidth={1.5}
                  className="benefit-icon"
                />
                <div className="benefit-content">
                  <span className="benefit-title">{item.title}</span>
                  <span className="benefit-text">{item.text}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .benefits-wrapper {
          width: 100%;
          margin-top: 40px;
          margin-bottom: 40px;
          box-sizing: border-box;
        }

        .benefits-container {
          width: 100%;
          background-color: #111111;
          padding: 32px 5%;
          font-family: system-ui, -apple-system, sans-serif;
          box-sizing: border-box;
        }

        /* Responsive Grid Strategy */
        .benefits-grid {
          display: grid;
          width: 100%;
          gap: 24px;
          align-items: center;
          /* Default (Desktop/Laptop): 5 columns */
          grid-template-columns: repeat(5, 1fr);
        }

        .benefit-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-right: 16px;
          border-right: 1px solid #262626;
        }

        .benefit-item:last-child {
          border-right: none;
          padding-right: 0;
        }

        .benefit-icon {
          flex-shrink: 0;
        }

        .benefit-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .benefit-title {
          color: #ffffff;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .benefit-text {
          color: #999999;
          font-size: 12.5px;
          line-height: 1.4;
        }

        /* Large Laptops / Small Desktops */
        @media (max-width: 1200px) {
          .benefits-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 28px;
          }

          /* Reset vertical desktop borders for multi-row layout */
          .benefit-item {
            border-right: none;
            padding-right: 0;
          }
        }

        /* Tablets */
        @media (max-width: 768px) {
          .benefits-container {
            padding: 28px 20px;
          }

          .benefits-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }

          .benefit-item {
            border-right: none;
            padding-right: 0;
          }
        }

        /* Mobile Phones */
        @media (max-width: 520px) {
          .benefits-container {
            padding: 24px 16px;
          }

          .benefits-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .benefit-item {
            border-right: none;
            padding-right: 0;
            border-bottom: 1px solid #262626;
            padding-bottom: 16px;
          }

          .benefit-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default Benefits;