"use client"

import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="ft">
      <div className="sm-container ft__grid">
        <div className="ft__brand">
          <Image src="/logo.png" alt="Sportz Mitraz" width={170} height={44} style={{ height: 36, width: "auto" }} />
          <p className="ft__about">
            Your mitra for match day. Premium sports gear across football, tennis, badminton,
            cricket and more — delivered across India.
          </p>
          <div className="ft__socials">
            <a href="https://instagram.com/sportzmitraz" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              📸
            </a>
            <a href="https://wa.me/917021668726" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
              💬
            </a>
            <a href="mailto:support@sportzmitraz.in" aria-label="Email">
              ✉️
            </a>
          </div>
        </div>

        <div className="ft__col">
          <h4>Shop</h4>
          {categories.slice(0, 5).map((c) => (
            <Link key={c.slug} href={`/products/${c.slug}`}>
              {c.name}
            </Link>
          ))}
        </div>

        <div className="ft__col">
          <h4>Company</h4>
          <a href="#products">Shop All</a>
          <a href="#contact">Contact Us</a>
          <a href="#">Shipping Policy</a>
          <a href="#">Return &amp; Refund Policy</a>
        </div>

        <div className="ft__col">
          <h4>Get In Touch</h4>
          <a href="tel:+917021668726">+91 70216 68726</a>
          <a href="mailto:support@sportzmitraz.in">support@sportzmitraz.in</a>
          <span>Mon–Sat, 11am–5pm IST</span>
        </div>
      </div>

      <div className="sm-container ft__bottom">
        <span>© {new Date().getFullYear()} Sportz Mitraz. All rights reserved.</span>
        <span>Made for every mitra, on every field.</span>
      </div>

      <style jsx>{`
        .ft {
          background: #101010;
          color: rgba(255, 255, 255, 0.75);
          padding: 56px 0 0;
        }
        .ft__grid {
          display: grid;
          gap: 36px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .ft__brand {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .ft__about {
          font-size: 14px;
          line-height: 1.6;
          max-width: 34ch;
          color: rgba(255, 255, 255, 0.55);
        }
        .ft__socials {
          display: flex;
          gap: 10px;
        }
        .ft__socials a {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .ft__socials a:hover {
          background: var(--sm-pink);
          transform: translateY(-2px);
        }
        .ft__col {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ft__col h4 {
          margin: 0 0 4px;
          color: var(--sm-white);
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .ft__col a,
        .ft__col span {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          transition: color 0.15s ease;
        }
        .ft__col a:hover {
          color: var(--sm-green);
        }
        .ft__bottom {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 20px;
          justify-content: space-between;
          padding: 20px 24px 26px;
          font-size: 12.5px;
          color: rgba(255, 255, 255, 0.4);
        }

        @media (min-width: 800px) {
          .ft__grid {
            grid-template-columns: 1.4fr 1fr 1fr 1fr;
          }
        }
      `}</style>
    </footer>
  );
}