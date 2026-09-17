'use client';

import React from "react";
import Link from "next/link";
import {
  Users,
  ClipboardList,
  Cog,
  Trophy,
  Handshake,
  ArrowRight,
  ArrowDown,
} from "lucide-react";
import { Header } from "../../components/Header";
import { CtaBand } from "../../components/CtaBand";
import { Footer } from "../../components/Footer";

/* =========================================================
   FONTS + SCOPED STYLES
========================================================= */
function EventPlanningStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

      .sep-display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }
      .sep-body { font-family: 'Inter', ui-sans-serif, sans-serif; }
      .sep-tabular { font-variant-numeric: tabular-nums; }

      .sep-cta:focus-visible,
      .sep-link:focus-visible {
        outline: 2px solid #ec008c;
        outline-offset: 3px;
        border-radius: 4px;
      }

      .sep-cta {
        transition: transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
      }
      .sep-cta:hover {
        transform: translateY(-1px);
        box-shadow: 0 10px 24px rgba(236, 0, 140, 0.28);
      }

      .sep-secondary-link {
        transition: gap 0.15s ease, color 0.15s ease;
      }
      .sep-secondary-link:hover {
        gap: 10px;
        color: #f5f4f0;
      }

      .sep-chip {
        transition: border-color 0.15s ease, background-color 0.15s ease;
      }
      .sep-chip:hover {
        background-color: rgba(3, 37, 27, 0.04);
      }

      .sep-step {
        transition: transform 0.15s ease;
      }
      .sep-step:hover {
        transform: translateY(-3px);
      }

      @media (prefers-reduced-motion: no-preference) {
        .sep-hero-fade {
          animation: sepFadeUp 0.7s ease both;
        }
        .sep-hero-fade--delay1 { animation-delay: 0.08s; }
        .sep-hero-fade--delay2 { animation-delay: 0.16s; }
        .sep-hero-fade--delay3 { animation-delay: 0.24s; }
      }
      @keyframes sepFadeUp {
        from { opacity: 0; transform: translateY(14px); }
        to { opacity: 1; transform: translateY(0); }
      }

      /* ---------- Hero ---------- */
      .sep-hero-grid {
        display: grid;
        grid-template-columns: 1.05fr 0.95fr;
        gap: 48px;
        align-items: center;
      }
      .sep-hero-stats {
        display: grid;
        grid-template-columns: repeat(3, auto);
        gap: 32px;
      }
      @media (max-width: 860px) {
        .sep-hero-grid { 
          grid-template-columns: 1fr; 
          gap: 32px; 
        }
        .sep-hero-visual { 
          order: -1; 
          width: 100%; 
          max-width: 100%; 
          margin: 0; 
        }
        .sep-hero-stats { 
          grid-template-columns: repeat(3, 1fr); 
          gap: 18px; 
        }
      }
      @media (max-width: 480px) {
        .sep-hero-stats { grid-template-columns: 1fr 1fr; }
      }

      /* ---------- Workflow ---------- */
      .sep-steps-row {
        display: flex;
        gap: 0;
        position: relative;
      }
      .sep-steps-row::before {
        content: "";
        position: absolute;
        top: 26px;
        left: 26px;
        right: 26px;
        height: 1px;
        background: #d7dbd2;
        z-index: 0;
      }
      .sep-step {
        flex: 1 1 0;
        min-width: 0;
        padding: 0 14px;
      }
      @media (max-width: 760px) {
        .sep-steps-row { flex-wrap: wrap; row-gap: 32px; }
        .sep-steps-row::before { display: none; }
        .sep-step { flex: 1 1 45%; }
      }
      @media (max-width: 480px) {
        .sep-step { flex: 1 1 100%; }
      }

      /* ---------- Modular support ---------- */
      .sep-modular-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 56px;
        align-items: center;
      }
      .sep-collage {
        position: relative;
        height: 320px;
      }
      .sep-collage img:first-child {
        position: absolute;
        top: 0;
        left: 0;
        width: 62%;
        height: 78%;
        object-fit: cover;
        border-radius: 10px;
        box-shadow: 0 16px 32px rgba(15, 23, 22, 0.16);
      }
      .sep-collage img:last-child {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 52%;
        height: 62%;
        object-fit: cover;
        border-radius: 10px;
        border: 6px solid #f5f4f0;
        box-shadow: 0 16px 32px rgba(15, 23, 22, 0.2);
      }
      @media (max-width: 860px) {
        .sep-modular-grid { grid-template-columns: 1fr; gap: 36px; }
        .sep-collage { height: 280px; width: 100%; max-width: 100%; margin: 0 auto; }
      }
    `}</style>
  );
}

const workflowSteps = [
  {
    icon: Users,
    number: "01",
    title: "Consultation",
    desc: "We talk through your sport, teams, venue, dates and must-haves.",
    accent: "#ec008c",
  },
  {
    icon: ClipboardList,
    number: "02",
    title: "Planning",
    desc: "Budget, schedule, branding and product lists get locked in.",
    accent: "#8CC63F",
  },
  {
    icon: Cog,
    number: "03",
    title: "Execution",
    desc: "Designs get approved, production runs, and every vendor stays in sync.",
    accent: "#ec008c",
  },
  {
    icon: Trophy,
    number: "04",
    title: "Event day",
    desc: "Auction, branding, awards and on-ground crew — all live, all coordinated.",
    accent: "#8CC63F",
  },
  {
    icon: Handshake,
    number: "05",
    title: "Post-event",
    desc: "Handover, feedback, and a head start on next year's edition.",
    accent: "#ec008c",
  },
];

const serviceChips = [
  "Trophies & awards",
  "Teamwear & printing",
  "Auction operations",
  "Branding & signage",
  "Event-day crew",
];

const heroStats = [
  { value: "180+", label: "Events delivered" },
  { value: "45+", label: "Cities covered" },
  { value: "12", label: "Sports specialised" },
];

export default function EventPlanningPage() {
  return (
    <div className="sep-body" style={{ backgroundColor: "#f5f4f0", color: "#0f1d17" }}>
      <EventPlanningStyles />
      <Header />
      <main>
        {/* HERO SECTION */}
        <section
          style={{
            position: "relative",
            backgroundColor: "#03251b",
            padding: "40px 20px 56px",
            overflow: "hidden",
          }}
        >
          {/* Background grid pattern */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.05,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.9) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "-120px",
              top: "-80px",
              height: "320px",
              width: "320px",
              borderRadius: "50%",
              background: "rgba(236, 0, 140, 0.12)",
              filter: "blur(70px)",
            }}
          />

          <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
            <div className="sep-hero-grid">
              <div>
                <h1
                  className="sep-display sep-hero-fade sep-hero-fade--delay1"
                  style={{
                    fontSize: "clamp(32px, 4.4vw, 52px)",
                    fontWeight: 800,
                    color: "#ffffff",
                    lineHeight: 1.08,
                    letterSpacing: "-0.01em",
                    margin: "0 0 20px",
                    maxWidth: "560px",
                  }}
                >
                  We run sports events like matchday.
                </h1>
                <p
                  className="sep-hero-fade sep-hero-fade--delay2"
                  style={{
                    fontSize: "16px",
                    color: "rgba(245, 244, 240, 0.7)",
                    lineHeight: 1.65,
                    marginBottom: "32px",
                    maxWidth: "460px",
                  }}
                >
                  Auction operations, teamwear, trophies, branding and event-day
                  crew — book the whole fixture list, or only the pieces you're
                  missing.
                </p>

                <div
                  className="sep-hero-fade sep-hero-fade--delay3"
                  style={{ display: "flex", alignItems: "center", gap: "28px", flexWrap: "wrap", marginBottom: "48px" }}
                >
                  <Link
                    href="/contact"
                    className="sep-cta"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      backgroundColor: "#ec008c",
                      color: "#ffffff",
                      fontSize: "14px",
                      fontWeight: 700,
                      padding: "13px 26px",
                      borderRadius: "8px",
                      textDecoration: "none",
                    }}
                  >
                    Plan your event
                    <ArrowRight size={16} />
                  </Link>
                  
                  <a href="#how-we-work"
                    className="sep-link sep-secondary-link"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "rgba(245, 244, 240, 0.6)",
                      textDecoration: "none",
                    }}
                  >
                    See how it works
                    <ArrowDown size={14} />
                  </a>
                </div>

                <div className="sep-hero-stats sep-hero-fade sep-hero-fade--delay3" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "24px" }}>
                  {heroStats.map((stat) => (
                    <div key={stat.label}>
                      <div
                        className="sep-display sep-tabular"
                        style={{ fontSize: "26px", fontWeight: 700, color: "#ffffff", lineHeight: 1 }}
                      >
                        {stat.value}
                      </div>
                      <div style={{ fontSize: "11px", color: "rgba(245, 244, 240, 0.5)", marginTop: "6px" }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Container */}
              <div className="sep-hero-visual sep-hero-fade sep-hero-fade--delay2" style={{ position: "relative", width: "100%" }}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    aspectRatio: "16 / 10",
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80"
                    alt="Sports event in progress"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    onError={(e) => {
                      // Fallback image if network blocks Unsplash
                      e.currentTarget.src = "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=80";
                    }}
                  />
                  
                  {/* Floating Pill Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "14px",
                      left: "14px",
                      right: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      backgroundColor: "rgba(3, 37, 27, 0.88)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "999px",
                      padding: "8px 14px",
                      width: "fit-content",
                      maxWidth: "calc(100% - 28px)",
                    }}
                  >
                    <span
                      style={{
                        height: "7px",
                        width: "7px",
                        minWidth: "7px",
                        borderRadius: "50%",
                        backgroundColor: "#ec008c",
                      }}
                    />
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#ffffff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Auction, branding & crew on-site
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW WE WORK */}
        <section id="how-we-work" style={{ padding: "72px 20px", backgroundColor: "#f5f4f0" }}>
          <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
            <div style={{ maxWidth: "480px", marginBottom: "48px" }}>
              <h2
                className="sep-display"
                style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, color: "#0f1d17", margin: "0 0 12px" }}
              >
                How we work
              </h2>
              <p style={{ fontSize: "14px", color: "#5c6b63", lineHeight: 1.6, margin: 0 }}>
                Five steps, start to finish — the same runsheet we follow
                whether it's a school tournament or a franchise auction.
              </p>
            </div>

            <div className="sep-steps-row">
              {workflowSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.number} className="sep-step">
                    <div style={{ position: "relative", height: "56px", marginBottom: "18px" }}>
                      <span
                        className="sep-display sep-tabular"
                        style={{
                          position: "absolute",
                          left: 0,
                          top: "-8px",
                          fontSize: "40px",
                          fontWeight: 700,
                          color: "transparent",
                          WebkitTextStroke: "1px #d7dbd2",
                        }}
                      >
                        {step.number}
                      </span>
                      <div
                        style={{
                          position: "relative",
                          zIndex: 1,
                          width: "44px",
                          height: "44px",
                          borderRadius: "12px",
                          backgroundColor: step.accent,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon size={19} color="#ffffff" strokeWidth={2.25} />
                      </div>
                    </div>
                    <h3
                      className="sep-display"
                      style={{ fontSize: "14px", fontWeight: 700, color: "#0f1d17", margin: "0 0 6px" }}
                    >
                      {step.title}
                    </h3>
                    <p style={{ fontSize: "12.5px", color: "#5c6b63", lineHeight: 1.55, margin: 0 }}>
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* MODULAR SUPPORT */}
        <section style={{ padding: "72px 20px", backgroundColor: "#ffffff", borderTop: "1px solid #ece9e2" }}>
          <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
            <div className="sep-modular-grid">
              <div>
                <h2
                  className="sep-display"
                  style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, color: "#0f1d17", margin: "0 0 16px" }}
                >
                  Book the whole event, or just what's missing.
                </h2>
                <p style={{ fontSize: "14px", color: "#5c6b63", lineHeight: 1.65, margin: "0 0 24px", maxWidth: "440px" }}>
                  Some organisers want us end-to-end. Others already have a venue
                  and a sponsor, and just need the auction run properly or the
                  jerseys printed on time. Both work.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {serviceChips.map((chip) => (
                    <span
                      key={chip}
                      className="sep-chip"
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#0f1d17",
                        border: "1px solid #d7dbd2",
                        borderRadius: "999px",
                        padding: "7px 14px",
                      }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              <div className="sep-collage">
                <img 
                  src="https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=800&q=80" 
                  alt="Team jerseys and sports equipment" 
                />
                <img 
                  src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80" 
                  alt="Trophies and awards display" 
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <CtaBand />
      <Footer />
    </div>
  );
}