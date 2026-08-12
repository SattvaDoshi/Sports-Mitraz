"use client";

import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="ft">
      <div className="ft__container">
        <div className="ft__grid">
          {/* Brand Column */}
          <div className="ft__brand">
            <Link href="/" className="ft__logo-wrapper">
              <Image
                src="/logo.png"
                alt="Sportz Mitraz"
                width={180}
                height={46}
                style={{
                  width: "auto",
                  height: "38px",
                  objectFit: "contain",
                }}
                priority
              />
            </Link>
            <p className="ft__about">
              Your mitra for match day. Premium sports gear across football,
              tennis, badminton, cricket, and more — delivered across India.
            </p>
            <div className="ft__socials">
              <a
                href="https://instagram.com/sportzmitraz"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://wa.me/917021668726"
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
              <a
                href="mailto:support@sportzmitraz.in"
                aria-label="Email support"
                className="social-btn"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Company Column */}
          <div className="ft__col">
            <h4 className="ft__heading">Company</h4>
            <ul className="ft__links">
              <li>
                <Link href="/products"  className="footer-link">Shop All</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/shipping-policy">Shipping Policy</Link>
              </li>
              <li>
                <Link href="/refund-policy">Return &amp; Refund Policy</Link>
              </li>
            </ul>
          </div>

          {/* Get In Touch Column */}
          <div className="ft__col">
            <h4 className="ft__heading">Get In Touch</h4>
            <div className="ft__contact-details">
              <a href="tel:+917021668726" className="ft__contact-item">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+91 70216 68726</span>
              </a>
              <a href="mailto:support@sportzmitraz.in" className="ft__contact-item">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>support@sportzmitraz.in</span>
              </a>
              <div className="ft__contact-item time-badge">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Mon–Sat, 11am–5pm IST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="ft__bottom">
          <p>© {currentYear} Sportz Mitraz. All rights reserved.</p>
          <p className="ft__motto">Made for every mitra, on every field.</p>
        </div>
      </div>

      <style jsx>{`
        .ft {
          background-color: #0d0d0d;
          color: rgba(255, 255, 255, 0.75);
          padding: 60px 0 0;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-family: inherit;
        }

        .ft__container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .ft__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          padding-bottom: 48px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* Brand Column */
        .ft__brand {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .ft__logo-wrapper {
          display: inline-block;
          line-height: 0;
        }

        .ft__about {
          font-size: 14px;
          line-height: 1.6;
          max-width: 340px;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
        }

        .ft__socials {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 4px;
        }

        .social-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .social-btn:hover {
          background: var(--sm-pink, #e91e63);
          border-color: var(--sm-pink, #e91e63);
          color: #ffffff;
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(233, 30, 99, 0.25);
        }

        /* Links Columns */
        .ft__col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .ft__heading {
          margin: 0;
          color: #ffffff;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          position: relative;
        }

        .ft__links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        // /* Explicitly style link pseudo-classes to override browser defaults */
        // .ft__links a,
        // .ft__links a:link,
        // .ft__links a:visited {
        //   font-size: 14px;
        //   color: #ffffff;  !important;
        //   text-decoration: none;    !important;
        //   transition: color 0.2s ease, transform 0.2s ease;
        //   display: inline-block;
        // }

        // .ft__links a:hover {
        //   color: var(--sm-green, #10b981);
        //   text-decoration: none;
        //   transform: translateX(2px);
        // }

        /* Contact Details */
        .ft__contact-details {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .ft__contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .ft__contact-item svg {
          flex-shrink: 0;
          color: rgba(255, 255, 255, 0.4);
          transition: color 0.2s ease;
        }

        a.ft__contact-item:hover {
          color: #ffffff;
        }

        a.ft__contact-item:hover svg {
          color: var(--sm-green, #10b981);
        }

        .time-badge {
          cursor: default;
        }

        /* Bottom Section */
        .ft__bottom {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: center;
          text-align: center;
          padding: 24px 0 32px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.45);
        }

        .ft__bottom p {
          margin: 0;
        }

        .ft__motto {
          color: rgba(255, 255, 255, 0.3);
        }

        /* Tablet Responsive (640px and up) */
        @media (min-width: 640px) {
          .ft__grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px 32px;
          }

          .ft__brand {
            grid-column: span 2;
          }

          .ft__bottom {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
          }
        }

        /* Laptop/Desktop Responsive (1024px and up) */
        @media (min-width: 1024px) {
          .ft__grid {
            grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
            gap: 40px;
          }

          .ft__brand {
            grid-column: span 1;
          }
        }
      `}</style>
    </footer>
  );
}