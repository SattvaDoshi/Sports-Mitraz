"use client";

import { useEffect, useState } from "react";

const heroSlides = [
  {
    id: "judo",
    eyebrow: "Home for Indian Olympic & Para Sports",
    title: "India Sports News – Live Scores, Athletes & Olympic Updates",
    subtitle:
      "Your go-to destination for the latest news, insights, and updates across Olympic and emerging sports.",
    tag: "We cover Judo",
    image:
      "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=1600&auto=format&fit=crop",
    date: "31 Jul 2026",
    caption: "Commonwealth Games 2026: Asmita Dey Creates History, Wins India's First-Ever Judo Gold",
    events: [
      { name: "Asian Games", date: "Saturday, 19 September 2026" },
      { name: "BWF World Championships", date: "Monday, 17 August 2026" },
    ],
  },
  {
    id: "athletics",
    eyebrow: "Home for Indian Olympic & Para Sports",
    title: "Track & Field – Records Falling Every Season",
    subtitle:
      "From the 100m to the javelin circle, follow every Indian athlete chasing a podium finish.",
    tag: "We cover Athletics",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1600&auto=format&fit=crop",
    date: "12 Jul 2026",
    caption: "National Athletics Meet: Three New National Records Set in Bhubaneswar",
    events: [
      { name: "Asian Games", date: "Saturday, 19 September 2026" },
      { name: "World Athletics Champs", date: "Sunday, 6 September 2026" },
    ],
  },
  {
    id: "badminton",
    eyebrow: "Home for Indian Olympic & Para Sports",
    title: "Badminton – Smashing Into A New Era",
    subtitle:
      "Live scores, rankings and behind-the-scenes stories from India's badminton stars.",
    tag: "We cover Badminton",
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1600&auto=format&fit=crop",
    date: "17 Aug 2026",
    caption: "BWF World Championships: India Sends Its Strongest Squad Yet",
    events: [
      { name: "BWF World Championships", date: "Monday, 17 August 2026" },
      { name: "Asian Games", date: "Saturday, 19 September 2026" },
    ],
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((v) => (v + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [paused]);

  const slide = heroSlides[active];

  const handlePrev = () => {
    setActive((v) => (v - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNext = () => {
    setActive((v) => (v + 1) % heroSlides.length);
  };

  return (
    <section
      className="sm-hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background Images Crossfade — always mirrors the active carousel image */}
      <div className="sm-hero__bgs" aria-hidden>
        {heroSlides.map((s, i) => (
          <div
            key={s.id}
            className={`sm-hero__bg ${i === active ? "sm-hero__bg--active" : ""}`}
            style={{ backgroundImage: `url(${s.image})` }}
          />
        ))}
        <div className="sm-hero__scrim" />
      </div>

      {/* Main Grid Content Layout */}
      <div className="sm-container sm-hero__layout">
        <div className="sm-hero__copy">
          <p className="sm-hero__eyebrow">{slide.eyebrow}</p>
          <h1 className="sm-hero__title">{slide.title}</h1>
          <p className="sm-hero__subtitle-italic">Because Every Sport Matters.</p>
          <p className="sm-hero__subtitle">{slide.subtitle}</p>
          <p className="sm-hero__cover">
            <strong>{slide.tag}</strong>
            <span className="sm-hero__cursor">|</span>
          </p>

          <div className="sm-hero__events">
            {slide.events.map((ev) => (
              <div className="sm-hero__event-card" key={ev.name}>
                <p className="sm-hero__event-name">{ev.name}</p>
                <p className="sm-hero__event-date">{ev.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="sm-hero__art-wrapper">
          <div className="sm-hero__art">
            <div className="sm-hero__card">
              {heroSlides.map((s, i) => (
                <div
                  key={s.id}
                  className={`sm-hero__slide ${i === active ? "sm-hero__slide--active" : ""}`}
                  style={{ backgroundImage: `url(${s.image})` }}
                >
                  <div className="sm-hero__slide-glow" />
                  <div className="sm-hero__slide-info">
                    <span className="sm-hero__slide-date">{s.date}</span>
                    <p className="sm-hero__slide-caption">{s.caption}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile / tablet controls sit under the card, horizontal */}
            <div className="sm-hero__controls sm-hero__controls--inline">
              <button
                type="button"
                aria-label="Previous slide"
                className="sm-hero__nav-arrow"
                onClick={handlePrev}
              >
                ‹
              </button>
              <div className="sm-hero__dots-horizontal">
                {heroSlides.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-label={`Show slide ${i + 1}`}
                    className={`sm-hero__dot-h ${i === active ? "sm-hero__dot-h--active" : ""}`}
                    onClick={() => setActive(i)}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next slide"
                className="sm-hero__nav-arrow"
                onClick={handleNext}
              >
                ›
              </button>
            </div>
          </div>

          {/* Desktop vertical control sidebar, matching reference layout */}
          <div className="sm-hero__controls sm-hero__controls--vertical">
            <button
              type="button"
              aria-label="Previous slide"
              className="sm-hero__nav-arrow"
              onClick={handlePrev}
            >
              ⌃
            </button>
            <div className="sm-hero__dots-vertical">
              {heroSlides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  aria-label={`Show slide ${i + 1}`}
                  className={`sm-hero__dot-v ${i === active ? "sm-hero__dot-v--active" : ""}`}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next slide"
              className="sm-hero__nav-arrow"
              onClick={handleNext}
            >
              ⌄
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .sm-hero {
          position: relative;
          overflow: hidden;
          color: #fff;
          padding: 48px 16px;
          min-height: 100svh;
          display: flex;
          align-items: center;
        }

        .sm-container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
        }

        /* Background crossfade, always the same image as the active card */
        .sm-hero__bgs {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .sm-hero__bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          filter: blur(32px) brightness(0.38) saturate(1.1);
          transform: scale(1.15);
          opacity: 0;
          transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .sm-hero__bg--active {
          opacity: 1;
        }
        .sm-hero__scrim {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 82% 18%,
            rgba(20, 12, 36, 0.4) 0%,
            rgba(5, 5, 10, 0.94) 72%
          );
        }

        /* Layout Grid */
        .sm-hero__layout {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: center;
        }

        /* Left copy column */
        .sm-hero__eyebrow {
          color: rgba(255, 255, 255, 0.78);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 700;
          margin: 0 0 16px 0;
        }
        .sm-hero__title {
          font-size: clamp(28px, 6vw, 52px);
          line-height: 1.14;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 0 0 20px 0;
          color: #ffffff;
          max-width: 22ch;
        }
        .sm-hero__subtitle-italic {
          font-style: italic;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(16px, 2.2vw, 20px);
          color: rgba(255, 255, 255, 0.92);
          margin: 0 0 18px 0;
        }
        .sm-hero__subtitle {
          font-size: clamp(14px, 1.8vw, 16px);
          line-height: 1.65;
          max-width: 52ch;
          color: rgba(255, 255, 255, 0.68);
          margin: 0 0 22px 0;
        }
        .sm-hero__cover {
          font-size: 15px;
          font-weight: 600;
          color: #ffffff;
          margin: 0 0 32px 0;
          display: flex;
          align-items: center;
          gap: 3px;
        }
        .sm-hero__cursor {
          animation: blink 1s step-end infinite;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.7);
        }
        @media (prefers-reduced-motion: reduce) {
          .sm-hero__cursor {
            animation: none;
          }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* Event cards row (no countdown blocks) */
        .sm-hero__events {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          max-width: 480px;
        }
        .sm-hero__event-card {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 14px;
          padding: 16px 18px;
          backdrop-filter: blur(12px);
          transition: background 0.25s ease, border-color 0.25s ease;
        }
        .sm-hero__event-card:hover {
          background: rgba(255, 255, 255, 0.09);
          border-color: rgba(255, 255, 255, 0.2);
        }
        .sm-hero__event-name {
          font-weight: 700;
          margin: 0 0 6px 0;
          font-size: 14px;
          color: #ffffff;
        }
        .sm-hero__event-date {
          margin: 0;
          font-size: 12.5px;
          color: rgba(255, 255, 255, 0.58);
        }

        /* Right side: horizontally-rectangular carousel + controls */
        .sm-hero__art-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          width: 100%;
        }
        .sm-hero__art {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          width: 100%;
          max-width: 520px;
        }
        .sm-hero__card {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 2;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }
        .sm-hero__slide {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 22px;
          opacity: 0;
          background-size: cover;
          background-position: center;
          transform: scale(1.02);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .sm-hero__slide--active {
          opacity: 1;
          transform: scale(1);
        }
        .sm-hero__slide-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.88) 0%,
            rgba(0, 0, 0, 0.28) 52%,
            rgba(0, 0, 0, 0) 100%
          );
        }
        .sm-hero__slide-info {
          position: relative;
          z-index: 1;
          max-width: 92%;
        }
        .sm-hero__slide-date {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.65);
          display: block;
          margin-bottom: 6px;
          letter-spacing: 0.02em;
        }
        .sm-hero__slide-caption {
          font-weight: 700;
          font-size: clamp(14px, 2vw, 17px);
          line-height: 1.4;
          margin: 0;
          color: #ffffff;
        }

        /* Controls: shared arrow styling */
        .sm-hero__nav-arrow {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.45);
          font-size: 22px;
          cursor: pointer;
          transition: color 0.2s;
          line-height: 1;
          padding: 6px;
        }
        .sm-hero__nav-arrow:hover,
        .sm-hero__nav-arrow:focus-visible {
          color: #ffffff;
        }
        .sm-hero__nav-arrow:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
          border-radius: 6px;
        }

        /* Inline (mobile/tablet) controls — horizontal row under the card */
        .sm-hero__controls--inline {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
        }
        .sm-hero__dots-horizontal {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .sm-hero__dot-h {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: background 0.3s, width 0.3s;
        }
        .sm-hero__dot-h--active {
          background: #3b82f6;
          width: 18px;
          border-radius: 4px;
        }

        /* Vertical (desktop) sidebar controls — hidden until desktop breakpoint */
        .sm-hero__controls--vertical {
          display: none;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
        }
        .sm-hero__dots-vertical {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .sm-hero__dot-v {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: background 0.3s, height 0.3s, transform 0.3s;
        }
        .sm-hero__dot-v--active {
          background: #3b82f6;
          height: 18px;
          border-radius: 4px;
          transform: scale(1.1);
        }

        /* Tablet breakpoint */
        @media (min-width: 640px) {
          .sm-hero {
            padding: 64px 32px;
          }
        }

        /* Laptop / Desktop breakpoint */
        @media (min-width: 960px) {
          .sm-hero {
            padding: 40px 32px;
            min-height: auto;
          }
          .sm-hero__layout {
            grid-template-columns: 1.1fr 0.9fr;
            gap: 32px;
          }
          .sm-hero__copy {
            padding-right: 0;
          }
          .sm-hero__art-wrapper {
            justify-content: flex-end;
          }
          .sm-hero__art {
            max-width: 100%;
          }
          .sm-hero__controls--inline {
            display: none;
          }
          .sm-hero__controls--vertical {
            display: flex;
          }
        }
      `}</style>
    </section>
  );
}