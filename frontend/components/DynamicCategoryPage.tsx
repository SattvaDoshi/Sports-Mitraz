"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
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
  priceType?: "starting" | "fixed";
  images: string[];
  tags: string[];
  averageRating?: number;
  totalRatings?: number;
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
  count?: number;
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
  const [allCategories, setAllCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categorySlug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          const cat: ApiCategory = data.data;
          setCategory(cat);

          const directProducts = cat.products || [];

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
            priceType: p.priceType,
            averageRating: p.averageRating,
            totalRatings: p.totalRatings,
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

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setAllCategories(data.data);
        }
      })
      .catch((err) => console.error("Failed to load category list:", err));
  }, []);

  // Compute display title (normal + highlighted word), used by ProductCatalogGrid's hero
  let heroTitleText = titleParts[0];
  let heroHighlightText = titleParts[1];

  if (category?.name) {
    const words = category.name.split(" ");
    if (words.length > 1) {
      heroTitleText = words.slice(0, -1).join(" ");
      heroHighlightText = words[words.length - 1];
    } else {
      heroTitleText = category.name;
      heroHighlightText = "";
    }
  }

  const activeHeroImage = heroImage;

  const filteredAndSortedItems = React.useMemo(() => {
    let result = [...items];
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerQuery) ||
          (item.tags ?? []).some((t) =>
  t.toLowerCase().includes(lowerQuery)
)
      );
      result.sort((a, b) => {
        const ratingA = a.averageRating || 0;
        const ratingB = b.averageRating || 0;
        return ratingB - ratingA;
      });
    }
    return result;
  }, [items, searchQuery]);

  return (
    <>
      <Header />
      <main>
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

            {/* Products grid — includes its own category hero, search now lives inside it */}
            {filteredAndSortedItems.length > 0 || items.length > 0 ? (
              <ProductCatalogGrid
                heroImage={activeHeroImage}
                breadcrumbs={[
                  { label: "Home", href: "/" },
                  { label: "Products", href: "/products" },
                  { label: breadcrumb },
                ]}
                heroTitle={heroTitleText}
                heroHighlight={heroHighlightText}
                heroDescription={
                  category?.description ||
                  "Browse our customized items and request a fast bulk quote for your sports event."
                }
                sectionTitle={`Explore ${category?.name || titleParts.join(" ")}`}
                description="Every item is quote-based and can be customised by quantity, artwork, size, name, logo and event theme."
                items={filteredAndSortedItems}
                categorySlug={categorySlug}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                activeCategorySlug={categorySlug}
                categories={allCategories.map((c) => ({
                  name: c.name,
                  slug: c.slug,
                  count: c.count || 0,
                }))}
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