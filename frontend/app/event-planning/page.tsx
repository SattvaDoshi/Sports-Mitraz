import React from "react";
import Link from "next/link";
import { Header } from "../../components/Header";
import { CtaBand } from "../../components/CtaBand";
import { Footer } from "../../components/Footer";

const workflowSteps = [
  {
    icon: "👥",
    title: "1 CONSULTATION",
    desc: "Sport, teams, venue, date and requirements."
  },
  {
    icon: "☷",
    title: "2 PLANNING",
    desc: "Budget, schedule, branding and products."
  },
  {
    icon: "⚙",
    title: "3 EXECUTION",
    desc: "Design approvals, production and coordination."
  },
  {
    icon: "🏆",
    title: "4 EVENT DAY",
    desc: "Awards, branding, auction and operations support."
  },
  {
    icon: "🤝",
    title: "5 POST-EVENT",
    desc: "Handover, feedback and next-edition planning."
  }
];

export default function EventPlanningPage() {
  return (
    <>
      <Header />
      <main>
        <section
          className="page-hero"
          style={{ "--hero": "url('/printing.jpg')" } as React.CSSProperties}
        >
          <div className="container inner">
            <div className="page-copy">
              <div className="breadcrumb">Home / Sports Event Planning</div>
              <h1>
                Sports Event <span>Planning & Support</span>
              </h1>
              <p>
                Use SportzMitra for the full event or only selected components — auction, products, branding, trophies, teamwear, printing and event-day support.
              </p>
              <Link href="/contact" className="btn btn-pink">
                PLAN YOUR EVENT →
              </Link>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="section-title">
              <h2>HOW WE WORK</h2>
              <p>A clear five-step workflow for organised sports-event delivery.</p>
              <div className="underline"></div>
            </div>

            <div className="steps">
              {workflowSteps.map((step, idx) => (
                <div className="step" key={idx}>
                  <div className="step-icon">{step.icon}</div>
                  <div>
                    <b>{step.title}</b>
                    <small>{step.desc}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="event-band">
          <div className="container event-grid">
            <div>
              <div className="section-title left">
                <h2>Full Event or Modular Support</h2>
                <p>
                  Choose complete management or only what you need — trophies, jerseys, auction accessories, printing, sports products or selected operational support.
                </p>
                <div className="underline"></div>
              </div>
              <div className="actions">
                <Link href="/contact" className="btn btn-pink">
                  DISCUSS YOUR EVENT
                </Link>
                <Link href="/products" className="btn btn-lime">
                  VIEW PRODUCTS
                </Link>
              </div>
            </div>

            <div className="event-visual">
              <img src="/printing.jpg" alt="Printing Support" />
              <div className="stack">
                <img src="/trophies.jpg" alt="Trophies" />
                <img src="/auction.jpg" alt="Auction" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <CtaBand />
      <Footer />
    </>
  );
}