import React from "react";
import { ProductDetailPageClient } from "./ProductDetailPageClient";

interface PageProps {
  params: Promise<{
    categorySlug: string;
    productSlug: string;
  }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { categorySlug, productSlug } = await params;

  return (
    <ProductDetailPageClient
      categorySlug={categorySlug}
      productSlug={productSlug}
    />
  );
}
