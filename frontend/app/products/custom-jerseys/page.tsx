"use client";

import React from "react";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { JerseyGrid } from "@/components/JerseyGrid";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";

export default function CustomJerseysPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          bgImage="/jerseys.jpg"
          breadcrumb="Home / Products / Custom Jerseys"
          title={<>Custom <span>Jerseys</span></>}
          description="Flexible custom teamwear for leagues, academies and sports communities with multiple sublimation and branding options."
        />
        <JerseyGrid />
      </main>
      <CtaBand />
      <Footer />
    </>
  );
}