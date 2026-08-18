"use client";

import React from "react";
import { ProductCatalogGrid, CatalogItem } from "./ProductCatalogGrid";

const jerseyItems: CatalogItem[] = [
  { title: "Front Sublimation Jersey", img: "/auction.jpg", desc: "Custom printed front with team graphics, logo and sponsor marks.", tags: ["Team logo", "Sponsors", "Player details"] },
  { title: "Both-Side Sublimation", img: "/trophies.jpg", desc: "Front and back sublimation with player name, number and sponsor visibility.", tags: ["Front/back design", "Name", "Number"] },
  { title: "Full Sublimation Jersey", img: "/jerseys.jpg", desc: "Complete all-over customised jersey with full creative freedom.", tags: ["Full design", "Multiple colours", "Team kit"] },
  { title: "Plain Jersey + Logo", img: "/printing.jpg", desc: "Simple team jersey with printed logo, sponsor and player details.", tags: ["Fast option", "Logo print", "Bulk team order"] },
  { title: "Tournament T-Shirts", img: "/sports-accessories.jpg", desc: "Dry-fit or round-neck tees for teams, volunteers and event staff.", tags: ["Logo", "Event theme", "Staff/team use"] },
  { title: "Tracksuits & Teamwear", img: "/hero-slide-1.jpg", desc: "Matching travel and training apparel for teams and academies.", tags: ["Team identity", "Custom branding", "Bulk sizing"] }
];

export const JerseyGrid: React.FC = () => {
  return (
    <ProductCatalogGrid
      sectionTitle="Explore Custom Jerseys"
      description="Every item is quote-based and can be customised by quantity, artwork, size, name, logo and event theme."
      items={jerseyItems}
    />
  );
};