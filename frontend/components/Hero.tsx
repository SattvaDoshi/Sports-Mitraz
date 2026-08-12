// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { heroSlides } from "@/lib/data";

// export default function Hero() {
//   const [active, setActive] = useState(0);

//   useEffect(() => {
//     const id = setInterval(() => {
//       setActive((v) => (v + 1) % heroSlides.length);
//     }, 5000);
//     return () => clearInterval(id);
//   }, []);

//   const slide = heroSlides[active];

//   return (
//     <section className="sm-hero" style={{ background: slide.bg }}>
//       <div className="sm-hero__noise" aria-hidden />
//       <div className="sm-container sm-hero__row">
//         <div className="sm-hero__copy">
//           <p className="sm-eyebrow sm-hero__eyebrow">Because every sport matters</p>
//           <h1 className="sm-heading sm-hero__title">{slide.title}</h1>
//           <p className="sm-hero__subtitle">{slide.subtitle}</p>
//           <div className="sm-hero__actions">
//             <a href="#products" className="sm-btn sm-btn--green">
//               Shop The Range
//             </a>
//             <a href="#contact" className="sm-btn sm-btn--outline sm-hero__outline">
//               Find A Store
//             </a>
//           </div>

//           <div className="sm-hero__dots">
//             {heroSlides.map((s, i) => (
//               <button
//                 key={s.id}
//                 type="button"
//                 aria-label={`Show slide ${i + 1}`}
//                 className={`sm-hero__dot ${i === active ? "sm-hero__dot--active" : ""}`}
//                 onClick={() => setActive(i)}
//               />
//             ))}
//           </div>
//         </div>

//         <div className="sm-hero__art">
//           <div className="sm-hero__card">
//             {heroSlides.map((s, i) => (
//               <div
//                 key={s.id}
//                 className={`sm-hero__slide ${i === active ? "sm-hero__slide--active" : ""}`}
//               >
//                 <div className="sm-hero__slide-glow" />
//                 <span className="sm-hero__slide-tag">0{i + 1}</span>
//                 <p className="sm-hero__slide-caption">{s.title}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .sm-hero {
//           position: relative;
//           overflow: hidden;
//           color: var(--sm-white);
//           padding: 56px 0 64px;
//           transition: background 0.8s ease;
//         }
//         .sm-hero__noise {
//           position: absolute;
//           inset: 0;
//           background-image: radial-gradient(circle at 15% 20%, rgba(255, 255, 255, 0.08), transparent 45%),
//             radial-gradient(circle at 85% 80%, rgba(255, 255, 255, 0.08), transparent 45%);
//           pointer-events: none;
//         }
//         .sm-hero__row {
//           position: relative;
//           display: grid;
//           gap: 40px;
//           align-items: center;
//         }
//         .sm-hero__eyebrow {
//           color: rgba(255, 255, 255, 0.85);
//         }
//         .sm-hero__title {
//           font-size: clamp(40px, 7vw, 68px);
//           margin: 14px 0 18px;
//           color: var(--sm-white);
//         }
//         .sm-hero__subtitle {
//           font-size: 17px;
//           line-height: 1.6;
//           max-width: 46ch;
//           color: rgba(255, 255, 255, 0.85);
//           margin: 0 0 28px;
//         }
//         .sm-hero__actions {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 14px;
//         }
//         .sm-hero__outline {
//           border-color: rgba(255, 255, 255, 0.7);
//           color: var(--sm-white);
//         }
//         .sm-hero__outline:hover {
//           background: var(--sm-white);
//           color: var(--sm-ink);
//         }
//         .sm-hero__dots {
//           display: flex;
//           gap: 8px;
//           margin-top: 34px;
//         }
//         .sm-hero__dot {
//           width: 28px;
//           height: 4px;
//           border-radius: 4px;
//           background: rgba(255, 255, 255, 0.35);
//           border: none;
//           transition: background 0.2s ease, width 0.2s ease;
//         }
//         .sm-hero__dot--active {
//           background: var(--sm-white);
//           width: 44px;
//         }
//         .sm-hero__art {
//           display: flex;
//           justify-content: center;
//         }
//         .sm-hero__card {
//           position: relative;
//           width: 100%;
//           max-width: 420px;
//           aspect-ratio: 4 / 5;
//           border-radius: var(--sm-radius-lg);
//           background: rgba(255, 255, 255, 0.08);
//           border: 1px solid rgba(255, 255, 255, 0.25);
//           backdrop-filter: blur(6px);
//           overflow: hidden;
//         }
//         .sm-hero__slide {
//           position: absolute;
//           inset: 0;
//           display: flex;
//           flex-direction: column;
//           justify-content: flex-end;
//           padding: 28px;
//           opacity: 0;
//           transform: scale(1.04);
//           transition: opacity 0.7s ease, transform 0.9s ease;
//         }
//         .sm-hero__slide--active {
//           opacity: 1;
//           transform: scale(1);
//         }
//         .sm-hero__slide-glow {
//           position: absolute;
//           inset: 0;
//           background: radial-gradient(circle at 70% 20%, rgba(255, 255, 255, 0.25), transparent 55%);
//         }
//         .sm-hero__slide-tag {
//           font-family: var(--font-display);
//           font-size: 64px;
//           color: rgba(255, 255, 255, 0.35);
//           line-height: 1;
//         }
//         .sm-hero__slide-caption {
//           font-weight: 600;
//           font-size: 18px;
//           margin: 10px 0 0;
//         }

//         @media (min-width: 900px) {
//           .sm-hero {
//             padding: 80px 0 96px;
//           }
//           .sm-hero__row {
//             grid-template-columns: 1.1fr 0.9fr;
//           }
//           .sm-hero__copy {
//             padding-right: 20px;
//           }
//         }
//       `}</style>
//     </section>
//   );
// }



"use client";

import { useEffect, useState } from "react";

/**
 * heroSlides now needs an `image` field (used for BOTH the blurred
 * full-bleed background AND the right-hand carousel card).
 *
 * Move this into "@/lib/data" and import it as before — it's inlined
 * here only so the component is drop-in runnable. Swap the Unsplash
 * URLs for your real photography whenever you have it.
 *
 * Shape:
 * {
 *   id: string,
 *   eyebrow: string,
 *   title: string,
 *   subtitle: string,
 *   tag: string,          // e.g. "We cover Judo"
 *   image: string,        // photo URL
 *   date: string,         // small date label on the card, e.g. "31 Jul 2026"
 *   caption: string,      // headline shown on the card
 *   events: [{ name: string, date: string }] // the two chips under the CTAs
 * }
 */
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

  useEffect(() => {
    const id = setInterval(() => {
      setActive((v) => (v + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const slide = heroSlides[active];

  return (
    <section className="sm-hero">
      {/* Crossfading full-bleed background photos */}
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

      <div className="sm-container sm-hero__row">
        <div className="sm-hero__copy">
          <p className="sm-eyebrow sm-hero__eyebrow">{slide.eyebrow}</p>
          <h1 className="sm-heading sm-hero__title">{slide.title}</h1>
          <p className="sm-hero__subtitle-italic">Because Every Sport Matters.</p>
          <p className="sm-hero__subtitle">{slide.subtitle}</p>
          <p className="sm-hero__cover">
            <strong>{slide.tag}</strong>
          </p>

          <div className="sm-hero__events">
            {slide.events.map((ev) => (
              <div className="sm-hero__event-card" key={ev.name}>
                <p className="sm-hero__event-name">{ev.name}</p>
                <p className="sm-hero__event-date">{ev.date}</p>
              </div>
            ))}
          </div>

          <div className="sm-hero__dots">
            {heroSlides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Show slide ${i + 1}`}
                className={`sm-hero__dot ${i === active ? "sm-hero__dot--active" : ""}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>

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

            <div className="sm-hero__card-nav">
              <button
                type="button"
                aria-label="Previous slide"
                className="sm-hero__nav-btn"
                onClick={() =>
                  setActive((v) => (v - 1 + heroSlides.length) % heroSlides.length)
                }
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next slide"
                className="sm-hero__nav-btn"
                onClick={() => setActive((v) => (v + 1) % heroSlides.length)}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .sm-hero {
          position: relative;
          overflow: hidden;
          color: var(--sm-white, #fff);
          padding: 40px 0 48px;
        }

        /* ---------- Crossfading background ---------- */
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
          filter: blur(6px) brightness(0.55);
          transform: scale(1.08);
          opacity: 0;
          transition: opacity 1.2s ease;
        }
        .sm-hero__bg--active {
          opacity: 1;
        }
        .sm-hero__scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            rgba(10, 10, 20, 0.85) 0%,
            rgba(10, 10, 20, 0.55) 45%,
            rgba(10, 10, 20, 0.25) 100%
          );
        }

        .sm-hero__row {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 32px;
          align-items: center;
        }

        .sm-hero__eyebrow {
          color: rgba(255, 255, 255, 0.85);
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 700;
        }
        .sm-hero__title {
          font-size: clamp(30px, 8vw, 64px);
          line-height: 1.05;
          margin: 12px 0 16px;
          color: #fff;
        }
        .sm-hero__subtitle-italic {
          font-style: italic;
          font-weight: 600;
          margin: 0 0 10px;
          font-size: clamp(15px, 2.5vw, 18px);
        }
        .sm-hero__subtitle {
          font-size: clamp(14px, 2.2vw, 17px);
          line-height: 1.6;
          max-width: 46ch;
          color: rgba(255, 255, 255, 0.85);
          margin: 0 0 18px;
        }
        .sm-hero__cover {
          font-size: 15px;
          margin: 0 0 20px;
        }

        .sm-hero__events {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 24px;
        }
        .sm-hero__event-card {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 14px;
          padding: 14px 18px;
          backdrop-filter: blur(6px);
          min-width: 200px;
        }
        .sm-hero__event-name {
          font-weight: 700;
          margin: 0 0 4px;
          font-size: 14px;
        }
        .sm-hero__event-date {
          margin: 0;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.75);
        }

        .sm-hero__dots {
          display: flex;
          gap: 8px;
        }
        .sm-hero__dot {
          width: 24px;
          height: 4px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.35);
          border: none;
          cursor: pointer;
          transition: background 0.2s ease, width 0.2s ease;
        }
        .sm-hero__dot--active {
          background: #fff;
          width: 40px;
        }

        /* ---------- Right-hand carousel card ---------- */
        .sm-hero__art {
          display: flex;
          justify-content: center;
        }
        .sm-hero__card {
          position: relative;
          width: 100%;
          max-width: 420px;
          aspect-ratio: 4 / 5;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.25);
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.35);
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
          transform: scale(1.04);
          transition: opacity 0.9s ease, transform 1.1s ease;
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
            rgba(0, 0, 0, 0.85) 0%,
            rgba(0, 0, 0, 0.15) 55%,
            rgba(0, 0, 0, 0) 100%
          );
        }
        .sm-hero__slide-info {
          position: relative;
        }
        .sm-hero__slide-date {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.8);
          display: block;
          margin-bottom: 6px;
        }
        .sm-hero__slide-caption {
          font-weight: 700;
          font-size: 17px;
          line-height: 1.35;
          margin: 0;
        }

        .sm-hero__card-nav {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          transform: translateY(-50%);
          padding: 0 10px;
          z-index: 2;
        }
        .sm-hero__nav-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.4);
          background: rgba(0, 0, 0, 0.35);
          color: #fff;
          font-size: 18px;
          line-height: 1;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease;
        }
        .sm-hero__nav-btn:hover {
          background: rgba(0, 0, 0, 0.6);
        }

        /* ---------- Responsive breakpoints ---------- */
        /* Mobile default: single column, card below copy, smaller paddings */

        /* Tablet */
        @media (min-width: 640px) {
          .sm-hero {
            padding: 56px 0 64px;
          }
          .sm-hero__events {
            gap: 16px;
          }
        }

        /* Laptop / desktop */
        @media (min-width: 900px) {
          .sm-hero {
            padding: 80px 0 96px;
          }
          .sm-hero__row {
            grid-template-columns: 1.1fr 0.9fr;
            gap: 40px;
          }
          .sm-hero__copy {
            padding-right: 20px;
          }
        }
      `}</style>
    </section>
  );
}