"use client";

import React from "react";
import { Users, Calendar, Settings, Trophy, Handshake, ArrowRight } from "lucide-react";

export const EventSteps: React.FC = () => {
  const stepsData = [
    {
      num: "01",
      title: "CONSULTATION",
      desc: "Understanding your requirements",
      icon: Users,
    },
    {
      num: "02",
      title: "PLANNING",
      desc: "Budgeting, Scheduling & Strategy",
      icon: Calendar,
    },
    {
      num: "03",
      title: "EXECUTION",
      desc: "Venue, Players, Branding, Accessories & more",
      icon: Settings,
    },
    {
      num: "04",
      title: "EVENT DAY",
      desc: "Smooth Management & Operations",
      icon: Trophy,
    },
    {
      num: "05",
      title: "POST-EVENT",
      desc: "Reporting, Feedback & Future Planning",
      icon: Handshake,
    },
  ];

  return (
    <>
      <style>{`
        .event-section {
          width: 100%;
          background-color: #f7f5f5;
          color: #111111;
          padding: 56px 20px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          box-sizing: border-box;
          overflow: hidden;
        }
        .event-container {
          max-width: 1500px;
          margin: 0 auto;
        }

        /* ---------- Layout grid (areas control ordering per breakpoint) ---------- */
        .event-layout {
          display: grid;
          grid-template-columns: 1fr;
          grid-template-areas:
            "header"
            "steps"
            "visual"
            "footer";
          gap: 32px;
        }

        /* ---------- Header block ---------- */
        .event-header {
          grid-area: header;
          display: flex;
          flex-direction: column;
        }
        .event-subtitle {
          color: #7cb342;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .event-accent-line {
          width: 32px;
          height: 3px;
          background-color: #7cb342;
          margin-bottom: 14px;
        }
        .event-title {
          font-size: 26px;
          font-weight: 900;
          line-height: 1.15;
          text-transform: uppercase;
          color: #111111;
          margin: 0 0 12px 0;
          letter-spacing: -0.3px;
        }
        .event-title span {
          color: #e6005c;
          display: block;
        }
        .event-description {
          font-size: 13px;
          color: #6b6b6b;
          line-height: 1.6;
          margin-bottom: 24px;
          max-width: 480px;
        }
        .event-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background-color: #e6005c;
          color: #ffffff;
          font-size: 11px;
          font-weight: 800;
          padding: 13px 24px;
          border-radius: 26px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          width: fit-content;
          transition: transform 0.2s ease, background-color 0.2s ease;
        }
        .event-cta-btn:hover {
          background-color: #c9004f;
          transform: translateY(-1px);
        }

        /* ---------- Visual block ---------- */
        .event-visual {
          grid-area: visual;
          position: relative;
          width: 100%;
          min-height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .visual-shape-circle {
          position: absolute;
          top: 10%;
          right: 8%;
          width: 55%;
          max-width: 220px;
          aspect-ratio: 1 / 1;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #b7e08a, #8bc34a);
          opacity: 0.55;
          z-index: 0;
        }
        .visual-caption {
          display: none;
        }
        .visual-img-wrapper {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 460px;
          overflow: hidden;
        }
        .visual-img-wrapper img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }

        /* ---------- Steps ---------- */
        .event-steps {
          grid-area: steps;
        }
        .event-steps-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        .step-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 0;
          background: transparent;
          border-radius: 0;
        }
        .step-icon-wrapper {
          flex-shrink: 0;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #fbdce8;
          color: #e6005c;
        }
        .step-icon-wrapper.alt {
          background-color: #e2f0d3;
          color: #7cb342;
        }
        .step-num {
          display: none;
        }
        .step-title {
          font-size: 12.5px;
          font-weight: 800;
          color: #111111;
          margin: 0;
          text-transform: uppercase;
          line-height: 1.2;
        }
        .step-desc {
          font-size: 10.5px;
          color: #7a7a7a;
          margin: 3px 0 0 0;
          line-height: 1.35;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.2px;
        }

        /* ---------- Footer variants ---------- */
        .event-footer {
          grid-area: footer;
        }
        .footer-desktop,
        .footer-tablet,
        .footer-mobile {
          display: none;
        }
        .footer-mobile {
          display: flex;
          justify-content: space-between;
          max-width: 320px;
          margin: 4px auto 0;
        }
        .footer-mobile-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .footer-mobile-item span {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
          color: #333333;
          text-transform: uppercase;
        }
        .footer-mobile-item i {
          width: 22px;
          height: 3px;
          border-radius: 2px;
          background-color: #e6005c;
        }
        .footer-mobile-item:nth-child(2) i {
          background-color: #7cb342;
        }
        .footer-mobile-item:nth-child(3) i {
          background-color: #e6005c;
        }

        /* ===================== TABLET (>=640px) ===================== */
        @media (min-width: 640px) {
          .event-layout {
            grid-template-columns: 1fr 1fr;
            grid-template-areas:
              "header visual"
              "steps steps"
              "footer footer";
            gap: 28px 32px;
          }
          .event-title {
            font-size: 30px;
          }
          .event-steps-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 18px;
          }
          .step-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            padding: 20px;
            border-radius: 14px;
            background-color: #fbdce8;
          }
          .step-item.alt-bg {
            background-color: #e2f0d3;
          }
          .step-icon-wrapper {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            background-color: #ffffff;
          }
          .step-icon-wrapper.alt {
            background-color: #ffffff;
          }
          .step-num {
            display: block;
            font-size: 20px;
            font-weight: 900;
            color: #e6005c;
            margin: 2px 0 0 0;
          }
          .step-item.alt-bg .step-num {
            color: #7cb342;
          }
          .step-title {
            font-size: 13px;
          }
          .step-desc {
            font-size: 11px;
          }
          .visual-shape-circle {
            width: 60%;
            right: 0;
          }
          .footer-mobile {
            display: none;
          }
          .footer-tablet {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            width: 100%;
            min-height: 90px;
            border-radius: 16px;
            background: linear-gradient(180deg, #f8c9d9 0%, #f6a9c4 100%);
            overflow: hidden;
          }
          .footer-tablet span {
            position: relative;
            z-index: 1;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 3px;
            color: #ffffff;
            text-transform: uppercase;
          }
        }

        /* ===================== DESKTOP (>=1024px) ===================== */
        @media (min-width: 1024px) {
          .event-section {
            padding: 80px 24px;
          }
          .event-layout {
            grid-template-columns: 1fr 1.05fr;
            grid-template-areas:
              "header visual"
              "steps steps"
              "footer footer";
            gap: 8px 48px;
          }
          .event-title {
            font-size: 36px;
          }
          .event-description {
            font-size: 14px;
          }
          .event-steps-grid {
            grid-template-columns: repeat(5, 1fr);
            gap: 16px;
          }
          .step-item {
            padding: 18px 14px;
          }
          .step-icon-wrapper {
            width: 36px;
            height: 36px;
          }
          .step-title {
            font-size: 12px;
          }
          .step-desc {
            font-size: 10px;
          }
          .visual-caption {
            display: block;
            position: absolute;
            top: 0;
            right: 4%;
            font-family: "Brush Script MT", cursive;
            font-style: italic;
            color: #f2a0bf;
            font-size: 20px;
            line-height: 1.15;
            text-align: right;
            z-index: 2;
          }
          .footer-tablet {
            display: none;
          }
          .footer-desktop {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-top: 8px;
          }
          .footer-desktop-text {
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 1.5px;
            color: #999999;
            text-transform: uppercase;
            line-height: 1.5;
            white-space: nowrap;
          }
          .footer-desktop-line {
            flex: 1;
            height: 1px;
            background-color: #d9d9d9;
          }
          .footer-desktop-dots {
            display: flex;
            gap: 6px;
          }
          .footer-desktop-dots i {
            width: 14px;
            height: 3px;
            border-radius: 2px;
          }
          .footer-desktop-dots i:nth-child(1) { background-color: #e6005c; }
          .footer-desktop-dots i:nth-child(2) { background-color: #7cb342; }
          .footer-desktop-dots i:nth-child(3) { background-color: #e6005c; }
        }
      `}</style>

      <section className="event-section" id="event-planning">
        <div className="event-container">
          <div className="event-layout">
            {/* Header */}
            <div className="event-header">
              <span className="event-subtitle">WHY CHOOSE SPORTZMITRA?</span>
              <h2 className="event-title">
                SPORTS EVENT PLANNING,
                <span>YOU ENJOY THE GAME.</span>
              </h2>
              <div className="event-accent-line" />
              <p className="event-description">
                We manage everything — from initial concept to post-event reporting.
                Whether you are a school, corporate, or tournament organizer,
                we are your end-to-end sports management partner.
              </p>
              <a href="#contact" className="event-cta-btn">
                KNOW MORE ABOUT US <ArrowRight size={16} />
              </a>
            </div>

            {/* Visual */}
            <div className="event-visual">
              <span className="visual-caption">Built For A Better Game</span>
              <div className="visual-shape-circle" />
              <div className="visual-img-wrapper">
                <img src="/EventsHero.png" alt="Sports Event Management" />
              </div>
            </div>

            {/* Steps */}
            <div className="event-steps">
              <div className="event-steps-grid">
                {stepsData.map((step, idx) => {
                  const Icon = step.icon;
                  const isPink = idx % 2 === 0;
                  return (
                    <div
                      className={`step-item ${isPink ? "" : "alt-bg"}`}
                      key={step.num}
                    >
                      <div className={`step-icon-wrapper ${isPink ? "" : "alt"}`}>
                        <Icon size={20} />
                      </div>
                      <span className="step-num">{step.num}</span>
                      <div>
                        <h4 className="step-title">{step.title}</h4>
                        <p className="step-desc">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer variants (only one visible per breakpoint) */}
            <div className="event-footer">
              <div className="footer-desktop">
                <span className="footer-desktop-text">
                  YOUR VISION
                  <br />
                  OUR GAME PLAN
                </span>
                <div className="footer-desktop-line" />
                <div className="footer-desktop-dots">
                  <i />
                  <i />
                  <i />
                </div>
              </div>

              <div className="footer-tablet">
                <span>MORE THAN A GAME</span>
              </div>

              <div className="footer-mobile">
                <div className="footer-mobile-item">
                  <span>PLAY</span>
                  <i />
                </div>
                <div className="footer-mobile-item">
                  <span>ORGANIZE</span>
                  <i />
                </div>
                <div className="footer-mobile-item">
                  <span>EXCEL</span>
                  <i />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};