"use client";

import React from "react";

export const EventSteps: React.FC = () => {
  return (
    <section className="event-band" id="event-planning">
      <div className="container event-grid">
        <div>
          <div className="section-title left">
            <h2>SPORTS EVENT PLANNING</h2>
            <p>We manage everything — You enjoy the game!</p>
            <div className="underline"></div>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-icon">👥</div>
              <div><b>1 CONSULTATION</b><small>Understanding your requirements</small></div>
            </div>
            <div className="step">
              <div className="step-icon">☷</div>
              <div><b>2 PLANNING</b><small>Budgeting, Scheduling & Strategy</small></div>
            </div>
            <div className="step">
              <div className="step-icon">⚙</div>
              <div><b>3 EXECUTION</b><small>Venue, Players, Branding, Accessories & more</small></div>
            </div>
            <div className="step">
              <div className="step-icon">🏆</div>
              <div><b>4 EVENT DAY</b><small>Smooth Management & Operations</small></div>
            </div>
            <div className="step">
              <div className="step-icon">🤝</div>
              <div><b>5 POST-EVENT</b><small>Reporting, Feedback & Future Planning</small></div>
            </div>
          </div>
        </div>
        <div className="event-visual">
          <img src="/printing.jpg" alt="Event Visual Main" />
          <div className="stack">
            <img src="/trophies.jpg" alt="Trophies Visual" />
            <img src="/auction.jpg" alt="Auction Visual" />
          </div>
        </div>
      </div>
    </section>
  );
};