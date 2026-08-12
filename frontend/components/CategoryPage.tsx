import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { categories, getCategory, getProductsByCategory } from "@/lib/data";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = getCategory(slug);
  if (!category) return notFound();

  const items = getProductsByCategory(category.slug);

  return (
    <>
      <Navbar />
      <main>
        <div className="sm-container">
          <nav className="cp-catnav" aria-label="Categories">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className={`cp-catnav__pill ${c.slug === category.slug ? "cp-catnav__pill--active" : ""}`}
              >
                {c.name}
              </Link>
            ))}
          </nav>
        </div>

        <section className="cp-grid-section" id="products-grid">
          <div className="sm-container">
            <div className="cp-toolbar">
              <p className="cp-toolbar__count">
                Showing <strong>{items.length}</strong> {items.length === 1 ? "product" : "products"}
              </p>
              <label className="cp-toolbar__sort">
                Sort by
                <select defaultValue="popular">
                  <option value="popular">Most Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="discount">Biggest Discount</option>
                </select>
              </label>
            </div>

            <div className="cp-grid">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .cp-catnav {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 16px 0;
          border-bottom: 1px solid #dcf3e4;
          scrollbar-width: none;
        }
        .cp-catnav::-webkit-scrollbar { display: none; }
        .cp-catnav__pill {
          flex: 0 0 auto;
          font-size: 13px;
          font-weight: 600;
          color: #447657;
          background: #ecfdf3;
          padding: 8px 16px;
          border-radius: 20px;
          white-space: nowrap;
          border: 1px solid transparent;
          transition: background-color 0.15s ease, color 0.15s ease;
        }
        .cp-catnav__pill:hover {
          background: #d1fae5;
        }
        .cp-catnav__pill--active {
          background: #447657;
          color: #fff;
        }

        .cp-grid-section {
          padding: 28px 0 80px;
          background: #fafdf9;
        }
        .cp-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 18px;
          flex-wrap: wrap;
        }
        .cp-toolbar__count {
          font-size: 13px;
          color: #6b7280;
          margin: 0;
        }
        .cp-toolbar__count strong {
          color: #166534;
        }
        .cp-toolbar__sort {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
          color: #374151;
        }
        .cp-toolbar__sort select {
          font-size: 13px;
          font-weight: 500;
          color: #14532d;
          background: #fff;
          border: 1px solid #bbf0cc;
          border-radius: 8px;
          padding: 6px 10px;
        }

        .cp-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        @media (min-width: 640px) {
          .cp-grid { grid-template-columns: repeat(3, 1fr); gap: 18px; }
        }
        @media (min-width: 1000px) {
          .cp-grid { grid-template-columns: repeat(4, 1fr); }
        }
        @media (max-width: 480px) {
          .cp-grid { gap: 12px; }
        }
      `}</style>
    </>
  );
}