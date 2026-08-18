"use client";

import React from "react";
import { Header } from "../components/Header";
import { HeroSlider } from "../components/HeroSlider";
import { Benefits } from "../components/Benefits";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { EventSteps } from "../components/EventSteps";
import { RecentWorkGallery } from "../components/RecentWorkGallery";
import { CtaBand } from "../components/CtaBand";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSlider />
        <Benefits />
        <FeaturedProducts />
        <EventSteps />
        <RecentWorkGallery />
      </main>
      <CtaBand />
      <Footer />
    </>
  );
}