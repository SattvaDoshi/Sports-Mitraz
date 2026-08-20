// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { useCart } from "@/context/CartContext";

// export const Header = () => {
//   const { cart, setIsCartOpen } = useCart();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
//   const closeMenu = () => setIsMobileMenuOpen(false);

//   return (
//     <>
//       <style>{`
//         .header-root {
//           background: #ffffff;
//           border-bottom: 1px solid #e2e8f0;
//           position: sticky;
//           top: 0;
//           z-index: 1000;
//           box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
//         }

//         .nav-container {
//           width: 100%;
//           max-width: 1240px;
//           margin: 0 auto;
//           padding: 0 20px;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           height: 80px;
//         }

//         .header-logo {
//           height: 48px;
//           width: auto;
//           object-fit: contain;
//         }

//         .navlinks-desktop {
//           display: flex;
//           align-items: center;
//           gap: 24px;
//         }

//         .navlinks-desktop a {
//           text-decoration: none;
//           color: #1e293b;
//           font-weight: 600;
//           font-size: 0.9rem;
//           letter-spacing: 0.5px;
//           transition: all 0.3s ease;
//         }

//         .navlinks-desktop a:hover {
//           color: #e91e63;
//         }

//         .top-actions {
//           display: flex;
//           align-items: center;
//           gap: 16px;
//         }

//         .cart-btn {
//           background: none;
//           border: none;
//           cursor: pointer;
//           position: relative;
//           font-size: 1.3rem;
//           padding: 6px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .cart-badge {
//           position: absolute;
//           top: -2px;
//           right: -4px;
//           background-color: #e91e63;
//           color: #ffffff;
//           border-radius: 50%;
//           padding: 2px 6px;
//           font-size: 0.7rem;
//           font-weight: bold;
//           min-width: 18px;
//           text-align: center;
//         }

//         .header-btn-pink {
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           padding: 10px 20px;
//           font-weight: 700;
//           font-size: 0.9rem;
//           border-radius: 8px;
//           text-decoration: none;
//           transition: all 0.3s ease;
//           background-color: #e91e63;
//           color: #ffffff;
//           white-space: nowrap;
//         }

//         .header-btn-pink:hover {
//           background-color: #c2185b;
//         }

//         .phone-link {
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           text-decoration: none;
//           color: #1e293b;
//           font-weight: 600;
//           font-size: 0.88rem;
//         }

//         .hamburger-btn {
//           display: none;
//           background: none;
//           border: none;
//           font-size: 1.6rem;
//           cursor: pointer;
//           padding: 4px;
//           color: #1e293b;
//         }

//         /* Mobile Drawer */
//         .mobile-backdrop {
//           display: none;
//           position: fixed;
//           inset: 0;
//           background: rgba(0, 0, 0, 0.5);
//           z-index: 1001;
//         }

//         .mobile-backdrop.open {
//           display: block;
//         }

//         .mobile-drawer {
//           position: fixed;
//           top: 0;
//           right: -280px;
//           width: 280px;
//           height: 100%;
//           background: #ffffff;
//           z-index: 1002;
//           transition: transform 0.3s ease-in-out;
//           padding: 24px 20px;
//           display: flex;
//           flex-direction: column;
//           justify-content: space-between;
//           box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
//         }

//         .mobile-drawer.open {
//           transform: translateX(-280px);
//         }

//         .drawer-header {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding-bottom: 16px;
//           border-bottom: 1px solid #e2e8f0;
//         }

//         .drawer-close {
//           background: none;
//           border: none;
//           font-size: 1.5rem;
//           cursor: pointer;
//         }

//         .drawer-links {
//           display: flex;
//           flex-direction: column;
//           gap: 18px;
//           margin-top: 24px;
//         }

//         .drawer-links a {
//           text-decoration: none;
//           color: #1e293b;
//           font-weight: 600;
//           font-size: 1rem;
//         }

//         .drawer-footer {
//           display: flex;
//           flex-direction: column;
//           gap: 16px;
//           padding-top: 20px;
//           border-top: 1px solid #e2e8f0;
//         }

//         @media (max-width: 1024px) {
//           .phone-link {
//             display: none;
//           }
//         }

//         @media (max-width: 868px) {
//           .navlinks-desktop, .top-actions .header-btn-pink {
//             display: none;
//           }
//           .hamburger-btn {
//             display: block;
//           }
//         }
//       `}</style>

//       <header className="header-root">
//         <div className="nav-container">
//           <Link href="/">
//             <img className="header-logo" src="/sportzmitra-logo.png" alt="SportzMitra Store" />
//           </Link>

//           <nav className="navlinks-desktop">
//             <Link href="/">HOME</Link>
//             <Link href="/products">PRODUCTS ▾</Link>
//             <Link href="/event-planning">SPORTS EVENT PLANNING</Link>
//             <Link href="/contact">CONTACT US</Link>
//           </nav>

//           <div className="top-actions">
//             <button
//               onClick={() => setIsCartOpen(true)}
//               className="cart-btn"
//               aria-label="View Cart"
//             >
//               🛒
//               {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
//             </button>

//             <Link className="header-btn-pink" href="/contact">
//               GET A QUOTE →
//             </Link>

//             <a href="tel:+919876543210" className="phone-link">
//               <span>◉</span> +91 98765 43210
//             </a>

//             <button
//               className="hamburger-btn"
//               onClick={() => setIsMobileMenuOpen(true)}
//               aria-label="Toggle navigation menu"
//             >
//               ☰
//             </button>
//           </div>
//         </div>

//         <div
//           className={`mobile-backdrop ${isMobileMenuOpen ? "open" : ""}`}
//           onClick={closeMenu}
//         />

//         <div className={`mobile-drawer ${isMobileMenuOpen ? "open" : ""}`}>
//           <div>
//             <div className="drawer-header">
//               <img className="header-logo" src="/sportzmitra-logo.png" alt="SportzMitra Store" />
//               <button className="drawer-close" onClick={closeMenu}>
//                 ✕
//               </button>
//             </div>

//             <nav className="drawer-links">
//               <Link href="/" onClick={closeMenu}>HOME</Link>
//               <Link href="/products" onClick={closeMenu}>PRODUCTS</Link>
//               <Link href="/event-planning" onClick={closeMenu}>SPORTS EVENT PLANNING</Link>
//               <Link href="/contact" onClick={closeMenu}>CONTACT US</Link>
//             </nav>
//           </div>

//           <div className="drawer-footer">
//             <Link className="header-btn-pink" href="/contact" onClick={closeMenu}>
//               GET A QUOTE →
//             </Link>
//             <a href="tel:+919876543210" className="phone-link" style={{ display: "flex" }}>
//               <span>◉</span> +91 98765 43210
//             </a>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// };



"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export const Header: React.FC = () => {
  const { cart, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const closeMenu = () => setIsMobileMenuOpen(false);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <style jsx>{`
        .header-root {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--line);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .nav-container {
          height: 76px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .header-logo {
          height: 42px;
          width: auto;
          object-fit: contain;
        }

        .navlinks-desktop {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .navlinks-desktop a {
          font-weight: 700;
          font-size: 14px;
          color: var(--ink);
          transition: color 0.2s ease;
        }

        .navlinks-desktop a:hover {
          color: var(--pink);
        }

        .top-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .phone-link {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 700;
          font-size: 14px;
          color: var(--ink);
        }

        .phone-icon {
          color: #10b981;
        }

        .cart-btn {
          background: #f1f5f9;
          border: none;
          cursor: pointer;
          position: relative;
          padding: 10px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .cart-btn:hover {
          background: #e2e8f0;
        }

        .cart-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          background-color: var(--pink);
          color: #ffffff;
          border-radius: 999px;
          padding: 2px 6px;
          font-size: 10px;
          font-weight: 800;
        }

        .hamburger-btn {
          display: none;
          background: none;
          border: none;
          font-size: 22px;
          cursor: pointer;
          padding: 6px;
          color: var(--ink);
        }

        /* Mobile Drawer Styles */
        .mobile-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(4px);
          z-index: 1001;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .mobile-backdrop.open {
          opacity: 1;
          pointer-events: auto;
        }

        .mobile-drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: 80%;
          max-width: 320px;
          height: 100%;
          background: #ffffff;
          z-index: 1002;
          transform: translateX(100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.15);
        }

        .mobile-drawer.open {
          transform: translateX(0);
          
        }

        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--line);
        }

        .drawer-close {
          background: #f1f5f9;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          font-size: 16px;
          cursor: pointer;
        }

        .drawer-links {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-top: 24px;
        }

        .drawer-links a {
          font-weight: 700;
          font-size: 16px;
          color: var(--ink);
        }

        .drawer-footer {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-top: 20px;
          border-top: 1px solid var(--line);
        }

        @media (max-width: 900px) {
          .navlinks-desktop,
          .phone-link,
          .desktop-quote-btn {
            display: none;
          }

          .hamburger-btn {
            display: block;
          }
        }
      `}</style>

      <header className="header-root">
        <div className="container nav-container">
          <Link href="/">
            <img className="header-logo" src="/sportzmitra-logo.png" alt="SportzMitra Store" />
          </Link>

          <nav className="navlinks-desktop">
            <Link href="/">HOME</Link>
            <Link href="/products">PRODUCTS ▾</Link>
            <Link href="/event-planning">SPORTS EVENT PLANNING</Link>
            <Link href="/contact">CONTACT US</Link>
          </nav>

          <div className="top-actions">
            <a href="tel:+919876543210" className="phone-link">
              <span className="phone-icon">●</span> +91 98765 43210
            </a>

            {/* Shopping Cart Trigger Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="cart-btn"
              aria-label="View Cart"
            >
              🛒
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>

            <Link className="btn btn-pink desktop-quote-btn" href="/contact">
              GET A QUOTE →
            </Link>

            {/* Mobile View Navigation Toggle */}
            <button
              className="hamburger-btn"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Slide-out Menu Backdrop */}
        <div
          className={`mobile-backdrop ${isMobileMenuOpen ? "open" : ""}`}
          onClick={closeMenu}
        />

        {/* Mobile Slide-out Menu Panel */}
        <div className={`mobile-drawer ${isMobileMenuOpen ? "open" : ""}`}>
          <div>
            <div className="drawer-header">
              <img className="header-logo" src="/sportzmitra-logo.png" alt="SportzMitra" />
              <button className="drawer-close" onClick={closeMenu}>
                ✕
              </button>
            </div>

            <nav className="drawer-links">
              <Link href="/" onClick={closeMenu}>HOME</Link>
              <Link href="/products" onClick={closeMenu}>PRODUCTS</Link>
              <Link href="/event-planning" onClick={closeMenu}>SPORTS EVENT PLANNING</Link>
              <Link href="/contact" onClick={closeMenu}>CONTACT US</Link>
            </nav>
          </div>

          <div className="drawer-footer">
            <Link className="btn btn-pink" href="/contact" onClick={closeMenu}>
              GET A QUOTE →
            </Link>
            <a href="tel:+919876543210" className="phone-link" style={{ justifyContent: "center" }}>
              <span className="phone-icon">●</span> +91 98765 43210
            </a>
          </div>
        </div>
      </header>
    </>
  );
};