"use client";

import React from "react";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { ProductCatalogGrid, CatalogItem } from "@/components/ProductCatalogGrid";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";

const items: CatalogItem[] = [
  { title: "Team Caps", img: "/auction.jpg", desc: "Branded caps for players, organisers, volunteers and support staff.", tags: ["Logo branding", "Team colours", "Bulk order"] },
  { title: "Sports Bags", img: "/trophies.jpg", desc: "Team and player bags for kits, travel and tournament use.", tags: ["Logo print", "Multiple sizes", "Team use"] },
  { title: "Water Bottles", img: "/jerseys.jpg", desc: "Custom-branded bottles for teams, academies and event giveaways.", tags: ["Logo", "Names", "Event branding"] },
  { title: "Training Accessories", img: "/printing.jpg", desc: "Cones, markers and selected training equipment for sports groups.", tags: ["Academy use", "Bulk order", "Event supply"] },
  { title: "Sports Balls", img: "/sports-accessories.jpg", desc: "Selected cricket, football and other sports balls for event and prize kits.", tags: ["Event use", "Team packs", "Selected brands"] },
  { title: "Custom Event Kits", img: "/hero-slide-1.jpg", desc: "Curated combinations for players, volunteers, organisers and participants.", tags: ["Custom bundle", "Logo branding", "Event-ready"] }
];

export default function SportsAccessoriesPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          bgImage="/sports-accessories.jpg"
          breadcrumb="Home / Products / Sports Accessories"
          title={<>Sports <span>Accessories</span></>}
          description="Useful sports and tournament accessories for teams, academies, organisers and corporate sports events."
        />
        <ProductCatalogGrid
          sectionTitle="Explore Sports Accessories"
          description="Every item is quote-based and can be customised by quantity, artwork, size, name, logo and event theme."
          items={items}
        />
      </main>
      <CtaBand />
      <Footer />
    </>
  );
}