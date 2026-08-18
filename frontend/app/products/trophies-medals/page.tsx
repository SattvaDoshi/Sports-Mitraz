"use client";

import React from "react";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { ProductCatalogGrid, CatalogItem } from "@/components/ProductCatalogGrid";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";

const items: CatalogItem[] = [
  { title: "Acrylic Trophies", img: "/auction.jpg", desc: "Modern laser-cut acrylic trophies for Player of the Match, winners and special awards.", tags: ["Custom shape", "Print", "Player name"] },
  { title: "Metal Trophies", img: "/trophies.jpg", desc: "Classic metal trophy options for winners, runners-up and individual categories.", tags: ["Multiple sizes", "Engraving", "Premium finish"] },
  { title: "Fibre Trophies", img: "/jerseys.jpg", desc: "Sports-themed fibre trophies with custom name plates and finishes.", tags: ["Sport themes", "Custom plate", "Bulk order"] },
  { title: "Momentos", img: "/printing.jpg", desc: "Recognition momentos for guests, sponsors, officials, coaches and corporates.", tags: ["Logo", "Name plate", "Custom message"] },
  { title: "Custom Medals", img: "/sports-accessories.jpg", desc: "Tournament medals with custom ribbon, logo, sport icon and finishing.", tags: ["Custom ribbon", "Logo", "Bulk quantity"] },
  { title: "Award Sets", img: "/hero-slide-1.jpg", desc: "Combined trophy + medal + certificate packages for complete events.", tags: ["Matching set", "Event branding", "Bulk package"] }
];

export default function TrophiesMedalsPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          bgImage="/trophies.jpg"
          breadcrumb="Home / Products / Trophies & Medals"
          title={<>Trophies & <span>Medals</span></>}
          description="Awards designed around your event, sport and brand — from economical bulk medals to premium custom trophies."
        />
        <ProductCatalogGrid
          sectionTitle="Explore Trophies & Medals"
          description="Every item is quote-based and can be customised by quantity, artwork, size, name, logo and event theme."
          items={items}
        />
      </main>
      <CtaBand />
      <Footer />
    </>
  );
}