"use client"

const contacts = [
  {
    label: "Call Us",
    value: "+91 70216 68726",
    href: "tel:+917021668726",
    icon: "📞",
  },
  {
    label: "WhatsApp",
    value: "Chat with a Mitra",
    href: "https://wa.me/917021668726",
    icon: "💬",
  },
  {
    label: "Email",
    value: "support@sportzmitraz.in",
    href: "mailto:support@sportzmitraz.in",
    icon: "✉️",
  },
  {
    label: "Instagram",
    value: "@sportzmitraz",
    href: "https://instagram.com/sportzmitraz",
    icon: "📸",
  },
  {
    label: "Find A Store",
    value: "20+ locations across India",
    href: "#",
    icon: "📍",
  },
];

export default function ContactDetails() {
  return (
    <section id="contact" className="cd">
      <div className="sm-container">
        <p className="sm-eyebrow cd__eyebrow">Talk to us</p>
        <h2 className="sm-heading cd__title">We&apos;re Here For You</h2>
        <p className="cd__intro">
          Questions on sizing, orders, or your nearest store? Reach the Sportz Mitraz team any way
          that&apos;s easiest for you.
        </p>

        <div className="cd__grid">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="cd__card"
            >
              <span className="cd__icon" aria-hidden>
                {c.icon}
              </span>
              <span className="cd__label">{c.label}</span>
              <span className="cd__value">{c.value}</span>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .cd {
          padding: 72px 0;
          background: var(--sm-ink);
          color: var(--sm-white);
        }
        .cd__eyebrow {
          color: var(--sm-green);
        }
        .cd__title {
          color: var(--sm-white);
          font-size: clamp(32px, 5vw, 48px);
          margin: 10px 0 12px;
        }
        .cd__intro {
          max-width: 56ch;
          color: rgba(255, 255, 255, 0.65);
          font-size: 16px;
          line-height: 1.6;
          margin: 0 0 36px;
        }
        .cd__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }
        .cd__card {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 22px;
          border-radius: var(--sm-radius-md);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
        }
        .cd__card:hover {
          transform: translateY(-4px);
          border-color: var(--sm-green);
          background: rgba(124, 185, 40, 0.08);
        }
        .cd__icon {
          font-size: 22px;
          margin-bottom: 6px;
        }
        .cd__label {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.03em;
          color: rgba(255, 255, 255, 0.55);
        }
        .cd__value {
          font-size: 15.5px;
          font-weight: 600;
        }

        @media (min-width: 640px) {
          .cd__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1000px) {
          .cd__grid {
            grid-template-columns: repeat(5, 1fr);
          }
        }
      `}</style>
    </section>
  );
}