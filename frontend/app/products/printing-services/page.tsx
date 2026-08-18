"use client";

import React from "react";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { ProductCatalogGrid, CatalogItem } from "@/components/ProductCatalogGrid";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";

const items: CatalogItem[] = [
  { title: "Event Banners", img: "/auction.jpg", desc: "Custom tournament banners for entry, stage, sponsor and ground branding.", tags: ["Custom size", "Sponsor logos", "Event theme"] },
  { title: "Flex Printing", img: "/trophies.jpg", desc: "Large-format flex prints for outdoor and indoor sports event use.", tags: ["Large format", "Fast turnaround", "Multiple sizes"] },
  { title: "Backdrops", img: "/jerseys.jpg", desc: "Sponsor walls and stage backdrops for award ceremonies, auctions and launches.", tags: ["Sponsor wall", "Photo zone", "Stage branding"] },
  { title: "Standees", img: "/printing.jpg", desc: "Portable branding standees for schedules, sponsors and directional information.", tags: ["Portable", "Custom artwork", "Event use"] },
  { title: "Posters & Signage", img: "/sports-accessories.jpg", desc: "Fixtures, rules, directional boards and promotional sports-event prints.", tags: ["Indoor/outdoor", "Custom layout", "Quick print"] },
  { title: "Certificates", img: "/hero-slide-1.jpg", desc: "Branded participation, appreciation and award certificates.", tags: ["Names", "Logos", "Event details"] }
];

export default function PrintingServicesPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          bgImage="/printing.jpg"
          breadcrumb="Home / Products / Printing Services"
          title={<>Printing <span>Services</span></>}
          description="Sports-event printing and branding materials that give your venue, stage and tournament a professional identity."
        />
        <ProductCatalogGrid
          sectionTitle="Explore Printing Services"
          description="Every item is quote-based and can be customised by quantity, artwork, size, name, logo and event theme."
          items={items}
        />
      </main>
      <CtaBand />
      <Footer />
    </>
  );
}