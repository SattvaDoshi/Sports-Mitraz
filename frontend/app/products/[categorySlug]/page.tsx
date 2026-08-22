"use client";

import React, { use } from "react";
import { DynamicCategoryPage } from "@/components/DynamicCategoryPage";

interface PageProps {
  params: Promise<{
    categorySlug: string;
  }>;
}

const CATEGORY_IMAGES: Record<string, string> = {
  "auction-accessories": "/auction.jpg",
  "trophies-medals": "/trophies.jpg",
  "custom-jerseys": "/jerseys.jpg",
  "printing-services": "/printing.jpg",
  "sports-accessories": "/sports-accessories.jpg",
};

export default function CategoryDynamicPage({ params }: PageProps) {
  const { categorySlug } = use(params);

  // Format title parts (split last word for styling if multi-word)
  const words = categorySlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1));
  
  let firstPart = words.join(" ");
  let lastPart = "";

  if (words.length > 1) {
    lastPart = words[words.length - 1];
    firstPart = words.slice(0, -1).join(" ");
  }

  const heroImage = CATEGORY_IMAGES[categorySlug] || "/hero-slide-1.jpg";

  return (
    <DynamicCategoryPage
      categorySlug={categorySlug}
      heroImage={heroImage}
      breadcrumb={`Home / Products / ${words.join(" ")}`}
      titleParts={[firstPart, lastPart]}
    />
  );
}
