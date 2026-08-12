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
        <section className={`cp-hero cp-hero--${category.accent}`}>
          <div className="sm-container">
            <Link href="/#products" className="cp-hero__back">
              ← All Sports
            </Link>
            <p className="cp-hero__eyebrow">{items.length} products</p>
            <h1 className="sm-heading cp-hero__title">
              {category.name} {category.name} Range
            </h1>
            <p className="cp-hero__tagline">{category.tagline}</p>
          </div>
        </section>

        <section className="cp-grid-section">
          <div className="sm-container">
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
        .cp-hero {
          padding: 40px 0 44px;
          color: #fff;
        }
        .cp-hero--green {
          background: linear-gradient(135deg,#16321a,#3f6f13,#7cb928);
        }
        .cp-hero--pink {
          background: linear-gradient(135deg,#3a0d1f,#8c1245,#e21c63);
        }
        .cp-hero__back {
          display: inline-block;
          font-size: 13px;
          font-weight: 600;
          opacity: 0.85;
          margin-bottom: 18px;
        }
        .cp-hero__back:hover { opacity: 1; }
        .cp-hero__eyebrow {
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 12px;
          font-weight: 700;
          opacity: 0.75;
          margin: 0 0 8px;
        }
        .cp-hero__title {
          font-size: clamp(30px, 5vw, 46px);
          margin: 0 0 10px;
          color: #fff;
        }
        .cp-hero__tagline {
          margin: 0;
          font-size: 15px;
          opacity: 0.85;
        }
        .cp-grid-section {
          padding: 44px 0 80px;
        }
        .cp-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }
        @media (min-width: 640px) {
          .cp-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 1000px) {
          .cp-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
    </>
  );
}