import Link from "next/link";

export const Header = () => {
  return (
    <header>
      <div className="container nav">
        <Link href="/">
          <img className="logo" src="/sportzmitra-logo.png" alt="SportzMitra Store" />
        </Link>
        <nav className="navlinks">
          <Link href="/">HOME</Link>
          <Link href="/products">PRODUCTS ⌄</Link>
          <Link href="/event-planning">SPORTS EVENT PLANNING</Link>
          <Link href="/contact">CONTACT US</Link>
        </nav>
        <div className="top-actions">
          <Link className="btn btn-pink" href="/contact">
            GET A QUOTE →
          </Link>
          <div className="phone">
            <span className="phone-icon">◉</span> +91 98765 43210
          </div>
        </div>
      </div>
    </header>
  );
};