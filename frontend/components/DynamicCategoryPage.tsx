"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { ProductCatalogGrid, CatalogItem } from "@/components/ProductCatalogGrid";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";
import { getDirectImageUrl } from "@/lib/driveImage";

interface ApiProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  startingPrice: number | null;
  images: string[];
  tags: string[];
}

interface ApiSubcategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  products?: ApiProduct[];
}

interface ApiCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  products?: ApiProduct[];
  subcategories?: ApiSubcategory[];
}

interface CategoryPageProps {
  categorySlug: string;
  heroImage: string;
  breadcrumb: string;
  titleParts: [string, string]; // [normal, highlighted]
}

export function DynamicCategoryPage({
  categorySlug,
  heroImage,
  breadcrumb,
  titleParts,
}: CategoryPageProps) {
  const [category, setCategory] = useState<ApiCategory | null>(null);
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [subcategories, setSubcategories] = useState<ApiSubcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categorySlug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          const cat: ApiCategory = data.data;
          setCategory(cat);

          // Collect direct products
          const directProducts = cat.products || [];
          
          // Also collect products from subcategories if any
          const subcatProducts: ApiProduct[] = [];
          if (cat.subcategories && cat.subcategories.length > 0) {
            setSubcategories(cat.subcategories);
            cat.subcategories.forEach((sc) => {
              if (sc.products && sc.products.length > 0) {
                subcatProducts.push(...sc.products);
              }
            });
          }

          const allProducts = directProducts.length > 0 ? directProducts : subcatProducts;

          // Map API products to CatalogItems
          const mapped: CatalogItem[] = allProducts.map((p) => ({
            id: p.slug,
            slug: p.slug,
            categorySlug: categorySlug,
            title: p.name,
            img:
              p.images && p.images.length > 0
                ? getDirectImageUrl(p.images[0])
                : getDirectImageUrl(cat.image || heroImage),
            desc: p.description,
            tags: p.tags || [],
            price: p.startingPrice ? Number(p.startingPrice) : undefined,
          }));
          setItems(mapped);
        } else {
          setNotFound(true);
        }
      })
      .catch((err) => {
        console.error(`Failed to load category ${categorySlug}:`, err);
        setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [categorySlug, heroImage]);

  // Compute dynamic title from API if available
  let displayTitle = (
    <>
      {titleParts[0]} {titleParts[1] && <span>{titleParts[1]}</span>}
    </>
  );

  if (category?.name) {
    const words = category.name.split(" ");
    if (words.length > 1) {
      displayTitle = (
        <>
          {words.slice(0, -1).join(" ")} <span>{words[words.length - 1]}</span>
        </>
      );
    } else {
      displayTitle = <>{category.name}</>;
    }
  }

  const activeHeroImage = category?.image ? getDirectImageUrl(category.image) : heroImage;

  return (
    <>
      <Header />
      <main>
        <PageHero
          bgImage={activeHeroImage}
          breadcrumb={breadcrumb}
          title={displayTitle}
          description={category?.description || "Browse our customized items and request a fast bulk quote for your sports event."}
        />

        {loading ? (
          <div className="container" style={{ padding: "80px 20px", textAlign: "center", color: "#62686f" }}>
            <h2>Loading products...</h2>
          </div>
        ) : notFound ? (
          <div className="container" style={{ padding: "80px 20px", textAlign: "center" }}>
            <h2>Category Not Found</h2>
            <p style={{ color: "#62686f", margin: "16px 0 24px" }}>
              The category you requested could not be found or has been moved.
            </p>
            <Link href="/products" className="btn btn-pink">
              BROWSE ALL CATEGORIES →
            </Link>
          </div>
        ) : (
          <>
            {/* Subcategories list if present */}
            {subcategories.length > 0 && items.length === 0 && (
              <section style={{ padding: "40px 0" }}>
                <div className="container">
                  <div className="section-title left">
                    <h2>Subcategories</h2>
                    <p>Select a subcategory to view available items</p>
                    <div className="underline"></div>
                  </div>
                  <div className="catalog">
                    {subcategories.map((subcat) => (
                      <article className="pcard category-card" key={subcat.id}>
                        <div className="cat-img">
                          <img src={getDirectImageUrl(subcat.image || heroImage)} alt={subcat.name} />
                        </div>
                        <div className="body">
                          <h3>{subcat.name}</h3>
                          <p className="cat-desc">{subcat.description}</p>
                          <div className="card-actions">
                            <Link className="btn btn-pink" href={`/products/${subcat.slug}`}>
                              VIEW SUBCATEGORY →
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Products grid */}
            {items.length > 0 ? (
              <ProductCatalogGrid
                sectionTitle={`Explore ${category?.name || titleParts.join(" ")}`}
                description="Every item is quote-based and can be customised by quantity, artwork, size, name, logo and event theme."
                items={items}
                categorySlug={categorySlug}
              />
            ) : subcategories.length === 0 ? (
              <div className="container" style={{ padding: "60px 20px", textAlign: "center", color: "#62686f" }}>
                <p>No products found in this category yet. Check back soon!</p>
                <Link href="/products" className="btn btn-pink" style={{ marginTop: "16px" }}>
                  VIEW ALL CATEGORIES →
                </Link>
              </div>
            ) : null}
          </>
        )}
      </main>
      <CtaBand />
      <Footer />
    </>
  );
}
