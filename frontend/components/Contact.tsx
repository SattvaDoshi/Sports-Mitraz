"use client";

import React from "react";

const contacts = [
  {
    label: "Timings",
    value: "Monday to Saturday\n(11am - 5pm IST)",
    href: "#",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        <path d="M8 10h.01"></path>
        <path d="M12 10h.01"></path>
        <path d="M16 10h.01"></path>
      </svg>
    ),
  },
  {
    label: "Call Us",
    value: "+91 7021668726",
    href: "tel:+917021668726",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    ),
  },
  {
    label: "Email",
    value: "support@scssports.in",
    href: "mailto:support@scssports.in",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
    ),
  },
  {
    label: "Find a Store",
    value: "20+ Locations across India",
    href: "#",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    ),
  },
];

export default function ContactDetails() {
  return (
    <section id="contact" className="cd">
      <div className="cd__container">
        <div className="cd__grid">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="cd__card"
            >
              <div className="cd__header">
                <span className="cd__icon" aria-hidden="true">
                  {c.icon}
                </span>
                <span className="cd__label">{c.label}</span>
              </div>
              <span className="cd__value">{c.value}</span>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .cd {
          padding: 40px 16px;
          background: #111111;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          display: flex;
          justify-content: center;
        }

        .cd__container {
          max-width: 1200px;
          width: 100%;
        }

        /* Mobile Layout (1 Column) */
        .cd__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .cd__card {
          display: flex;
          flex-direction: column;
          padding: 20px;
          border-radius: 8px;
          background: #1c1c1c;
          border: 1px solid #2a2a2a;
          text-decoration: none;
          color: inherit;
          transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
          overflow-wrap: break-word;
          word-break: break-word;
        }

        .cd__card:hover {
          background: #252525;
          border-color: #3a3a3a;
        }

        .cd__header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .cd__icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          flex-shrink: 0;
        }

        .cd__label {
          font-size: 15px;
          font-weight: 600;
          color: #ffffff;
        }

        .cd__value {
          font-size: 14px;
          color: #a0a0a0;
          text-decoration: underline;
          text-underline-offset: 4px;
          padding-left: 30px; /* Align under the title text */
          white-space: pre-line;
          line-height: 1.5;
        }

        /* Tablet Layout (2 Columns) */
        @media (min-width: 640px) {
          .cd {
            padding: 50px 24px;
          }

          .cd__grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        /* Desktop Layout (4 Columns) */
        @media (min-width: 1024px) {
          .cd {
            padding: 60px 32px;
          }

          .cd__grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
          }

          .cd__card {
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
}