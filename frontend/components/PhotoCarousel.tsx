"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface Photo {
  id: string;
  category: string;
  title: string;
  alt: string;
  src: string;
}

const photos: Photo[] = [
  {
    id: "p1",
    category: "Football",
    title: "Pitch Passion",
    alt: "Football player in action on the pitch",
    src: "https://images.unsplash.com/flagged/photo-1568105631375-d992b82a905b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p2",
    category: "Tennis",
    title: "Court Mastery",
    alt: "Tennis player in action on the court",
    src: "https://images.unsplash.com/photo-1709403552725-97e0ba206cb8?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p3",
    category: "Badminton",
    title: "Smash Precision",
    alt: "Badminton player mid-smash",
    src: "https://images.unsplash.com/photo-1723074832950-9fb031b0f4ec?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p4",
    category: "Cricket",
    title: "Crease Focus",
    alt: "Cricket batter facing a bowler",
    src: "https://images.unsplash.com/photo-1723274566738-8e480482a83f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p5",
    category: "Basketball",
    title: "Rim Drive",
    alt: "Basketball player driving to the hoop",
    src: "https://images.unsplash.com/photo-1594768928363-26cbe4cc86af?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p6",
    category: "Athletics",
    title: "Sprint Finish",
    alt: "Runner sprinting across a field",
    src: "https://images.unsplash.com/photo-1634492859027-11de47469325?auto=format&fit=crop&w=900&q=80",
  },
];

export default function PhotoCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollBounds = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    checkScrollBounds();
    track.addEventListener("scroll", checkScrollBounds, { passive: true });
    window.addEventListener("resize", checkScrollBounds);

    return () => {
      track.removeEventListener("scroll", checkScrollBounds);
      window.removeEventListener("resize", checkScrollBounds);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!trackRef.current) return;
    const { clientWidth } = trackRef.current;
    const scrollAmount = clientWidth * 0.75;

    trackRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="pcx">
      <div className="pcx__head">
        <div>
          <span className="pcx__eyebrow">In Action</span>
          <h2 className="pcx__title">Sportz Mitraz Moments</h2>
        </div>
        <div className="pcx__controls">
          <button
            type="button"
            aria-label="Previous photos"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="pcx__btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next photos"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="pcx__btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>

      <div className="pcx__track" ref={trackRef}>
        {photos.map((p, i) => (
          <article key={p.id} className="pcx__slide">
            {/* <span className="pcx__badge">{p.category}</span> */}
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 280px, 340px"
              className="pcx__slide-img"
              style={{ objectFit: "cover" }}
              priority={i < 2}
            />
            <div className="pcx__overlay">
              <h3 className="pcx__slide-title">{p.title}</h3>
            </div>
          </article>
        ))}
      </div>

      <style jsx>{`
        .pcx {
          padding: 48px 0 64px;
          width: 100%;
          max-width: 1360px;
          margin: 0 auto;
          overflow: hidden;
        }

        .pcx__head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
          padding: 0 24px;
          margin-bottom: 24px;
        }

        .pcx__eyebrow {
          display: inline-block;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #E6317D;
          margin-bottom: 4px;
        }

        .pcx__title {
          font-size: clamp(24px, 4vw, 38px);
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #0f172a;
          margin: 0;
          line-height: 1.15;
        }

        .pcx__controls {
          display: flex;
          gap: 10px;
        }

        .pcx__btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: 1px solid rgba(15, 23, 42, 0.12);
          background: rgba(255, 255, 255, 0.85);
          color: #0f172a;
          backdrop-filter: blur(8px);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
        }

        .pcx__btn:hover:not(:disabled) {
          background: #0f172a;
          color: #ffffff;
          border-color: #0f172a;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.18);
        }

        .pcx__btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
          box-shadow: none;
        }

        .pcx__track {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 12px 24px 24px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .pcx__track::-webkit-scrollbar {
          display: none;
        }

        .pcx__slide {
          position: relative;
          flex: 0 0 auto;
          width: 80vw;
          aspect-ratio: 3 / 4;
          border-radius: 20px;
          overflow: hidden;
          scroll-snap-align: start;
          box-shadow: 0 12px 30px -4px rgba(0, 0, 0, 0.12);
          background-color: #e2e8f0;
          isolation: isolate;
        }

        .pcx__badge {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 3;
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.55);
          backdrop-filter: blur(10px);
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .pcx__overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          align-items: flex-end;
          padding: 20px;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 45%,
            rgba(0, 0, 0, 0.75) 100%
          );
          pointer-events: none;
        }

        .pcx__slide-title {
          color: #ffffff;
          font-size: 1.15rem;
          font-weight: 700;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          transform: translateY(0);
          transition: transform 0.3s ease;
        }

        :global(.pcx__slide-img) {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pcx__slide:hover :global(.pcx__slide-img) {
          transform: scale(1.06);
        }

        .pcx__slide:hover .pcx__slide-title {
          transform: translateY(-2px);
        }

        @media (min-width: 640px) {
          .pcx {
            padding: 64px 0 80px;
          }
          .pcx__slide {
            width: 280px;
            aspect-ratio: 3 / 4;
          }
        }

        @media (min-width: 1024px) {
          .pcx__slide {
            width: 330px;
          }
          .pcx__head {
            padding: 0 32px;
          }
          .pcx__track {
            padding: 12px 32px 28px;
          }
        }
      `}</style>
    </section>
  );
}