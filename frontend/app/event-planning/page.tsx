import React from "react";
import Link from "next/link";
import { Header } from "../../components/Header";
import { CtaBand } from "../../components/CtaBand";
import { Footer } from "../../components/Footer";

const workflowSteps = [
  {
    icon: "👥",
    title: "1 CONSULTATION",
    desc: "Sport, teams, venue, date and requirements.",
    bgColor: "#8bc34a",
    badge: "1",
  },
  {
    icon: "≡",
    title: "2 PLANNING",
    desc: "Budget, schedule, branding and products.",
    bgColor: "#e91e63",
    badge: "2",
  },
  {
    icon: "⚙",
    title: "3 EXECUTION",
    desc: "Design approvals, production and coordination.",
    bgColor: "#8bc34a",
    badge: "3",
  },
  {
    icon: "🏆",
    title: "4 EVENT DAY",
    desc: "Awards, branding, auction and operations support.",
    bgColor: "#e91e63",
    badge: "4",
  },
  {
    icon: "🤝",
    title: "5 POST-EVENT",
    desc: "Handover, feedback and next-edition planning.",
    bgColor: "#8bc34a",
    badge: "5",
  },
];

export default function EventPlanningPage() {
  return (
    <div style={{ backgroundColor: "#ffffff", color: "#1e293b", fontFamily: "sans-serif" }}>
      <Header />
      <main>
        {/* HERO SECTION */}
        <section
          style={{
            position: "relative",
            backgroundColor: "#ffffff",
            backgroundImage: "url('/hero-stadium.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right center",
            backgroundSize: "contain",
            padding: "80px 20px 60px",
            overflow: "hidden",
          }}
        >
          {/* White gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, #ffffff 0%, #ffffff 40%, rgba(255, 255, 255, 0.85) 55%, transparent 75%)",
              zIndex: 1,
            }}
          />

          <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2 }}>
            <div style={{ maxWidth: "500px" }}>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 800,
                  letterSpacing: "0.05em",
                  color: "#e91e63",
                  marginBottom: "16px",
                  textTransform: "uppercase",
                }}
              >
                HOME <span style={{ color: "#94a3b8", margin: "0 4px" }}>/</span> SPORTS EVENT PLANNING
              </div>
              <h1
                style={{
                  fontSize: "44px",
                  fontWeight: 900,
                  color: "#0f172a",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  marginBottom: "16px",
                }}
              >
                Sports Event{" "}
                <span style={{ color: "#e91e63", display: "block" }}>
                  Planning & Support
                </span>
              </h1>
              <p
                style={{
                  fontSize: "15px",
                  color: "#475569",
                  lineHeight: 1.6,
                  marginBottom: "24px",
                }}
              >
                Use SportzMitra for the full event or only selected components — auction,
                products, branding, trophies, teamwear, printing and event-day support.
              </p>
              <Link
                href="/contact"
                style={{
                  display: "inline-block",
                  backgroundColor: "#e91e63",
                  color: "#ffffff",
                  fontSize: "12px",
                  fontWeight: 800,
                  letterSpacing: "0.05em",
                  padding: "12px 24px",
                  borderRadius: "4px",
                  textDecoration: "none",
                  boxShadow: "0 4px 12px rgba(233, 30, 99, 0.25)",
                }}
              >
                PLAN YOUR EVENT →
              </Link>
            </div>
          </div>
        </section>

        {/* WORKFLOW SECTION */}
        <section style={{ padding: "60px 20px", backgroundColor: "#ffffff" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2 style={{ fontSize: "28px", fontWeight: 900, color: "#0f172a", margin: 0 }}>
                HOW WE WORK
              </h2>
              <p style={{ fontSize: "14px", color: "#64748b", marginTop: "8px", marginBottom: 0 }}>
                A clear five-step workflow for organised sports-event delivery.
              </p>
              <div
                style={{
                  width: "40px",
                  height: "4px",
                  backgroundColor: "#e91e63",
                  borderRadius: "2px",
                  margin: "12px auto 0",
                }}
              />
            </div>

            {/* Steps Container */}
            <div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                maxWidth: "960px",
                margin: "0 auto",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              {/* Dashed line */}
              <div
                style={{
                  position: "absolute",
                  top: "32px",
                  left: "40px",
                  right: "40px",
                  borderTop: "2px dashed #e2e8f0",
                  zIndex: 0,
                }}
              />

              {workflowSteps.map((step, idx) => (
                <div
                  key={idx}
                  style={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    flex: "1 1 150px",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      backgroundColor: step.bgColor,
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                      marginBottom: "16px",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
                    }}
                  >
                    <span>{step.icon}</span>
                    <span
                      style={{
                        position: "absolute",
                        top: 0,
                        right: "-4px",
                        backgroundColor: "#e91e63",
                        color: "#ffffff",
                        fontSize: "10px",
                        fontWeight: "bold",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid #ffffff",
                      }}
                    >
                      {step.badge}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "13px", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: "11px", color: "#64748b", margin: 0, lineHeight: 1.4, maxWidth: "150px" }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MODULAR SUPPORT SECTION */}
        <section style={{ padding: "60px 20px", backgroundColor: "#ffffff", borderTop: "1px solid #f1f5f9" }}>
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "40px",
            }}
          >
            <div style={{ flex: "1 1 400px" }}>
              <h2 style={{ fontSize: "28px", fontWeight: 900, color: "#0f172a", margin: 0 }}>
                Full Event or Modular Support
              </h2>
              <div
                style={{
                  width: "40px",
                  height: "4px",
                  backgroundColor: "#e91e63",
                  borderRadius: "2px",
                  margin: "12px 0 16px",
                }}
              />
              <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.6, margin: 0 }}>
                Choose complete management or only what you need — trophies, jerseys,
                auction accessories, printing, sports event-day support and more.
              </p>
            </div>

            <div style={{ flex: "1 1 400px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div style={{ borderRadius: "8px", overflow: "hidden", height: "180px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                <img
                  src="/banner-champions.jpg"
                  alt="Champions Banner"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ borderRadius: "8px", overflow: "hidden", height: "180px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                <img
                  src="/trophies-display.jpg"
                  alt="Trophies Display"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
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