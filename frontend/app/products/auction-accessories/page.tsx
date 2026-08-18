"use client";

import React from "react";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { ProductCatalogGrid, CatalogItem } from "@/components/ProductCatalogGrid";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";

const items: CatalogItem[] = [
  { title: "Auction Paddles", img: "/auction.jpg", desc: "Team-number, team-name or sponsor-branded paddles for live bidding.", tags: ["Custom logo", "Team name", "Numbering"] },
  { title: "Team Table Tops", img: "/trophies.jpg", desc: "Branded team identifiers for owner desks and auction tables.", tags: ["Acrylic/MDF", "Team logo", "Custom size"] },
  { title: "Custom Cricket Bails", img: "/jerseys.jpg", desc: "Personalised bails with player names, tournament names or branding.", tags: ["Player name", "Tournament logo", "Gift-ready"] },
  { title: "Player Keychains", img: "/printing.jpg", desc: "Cricket, football and pickleball themed personalised keychains.", tags: ["Player name", "Jersey number", "Sport theme"] },
  { title: "Auction Boards", img: "/sports-accessories.jpg", desc: "Reusable or tournament-specific display boards for live auctions.", tags: ["Team branding", "Custom layout", "Large format"] },
  { title: "Auction Combo Sets", img: "/hero-slide-1.jpg", desc: "Complete paddle + board + tabletop packs for professional auction presentation.", tags: ["Bundle", "Event theme", "Custom quantity"] }
];

export default function AuctionAccessoriesPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          bgImage="/auction.jpg"
          breadcrumb="Home / Products / Auction Accessories"
          title={<>Auction <span>Accessories</span></>}
          description="Custom auction products that make your player auction look organised, branded and memorable."
        />
        <ProductCatalogGrid
          sectionTitle="Explore Auction Accessories"
          description="Every item is quote-based and can be customised by quantity, artwork, size, name, logo and event theme."
          items={items}
        />
      </main>
      <CtaBand />
      <Footer />
    </>
  );
}