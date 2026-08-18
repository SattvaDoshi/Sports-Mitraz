import React from "react";
import Link from "next/link";
import { Header } from "../../components/Header";
import { CtaBand } from "../../components/CtaBand";
import { Footer } from "../../components/Footer";

const categories = [
  {
    title: "Auction Accessories",
    desc: "Paddles, table tops, bails, player keychains, auction boards and custom event pieces.",
    img: "/auction.jpg",
    tags: ["Custom logo", "Names", "Bulk order"],
    link: "/products/auction-accessories",
    btnClass: "btn-pink"
  },
  {
    title: "Trophies & Medals",
    desc: "Acrylic, metal and fibre trophies, momentos and medals for all sports events.",
    img: "/trophies.jpg",
    tags: ["Acrylic", "Metal", "Medals"],
    link: "/products/trophies-medals",
    btnClass: "btn-lime"
  },
  {
    title: "Custom Jerseys",
    desc: "Sports jerseys, sublimation options, plain jerseys with logo and team apparel.",
    img: "/jerseys.jpg",
    tags: ["Sublimation", "Name", "Number"],
    link: "/products/custom-jerseys",
    btnClass: "btn-pink"
  },
  {
    title: "Printing Services",
    desc: "Banners, flex, backdrops, standees, posters and tournament branding requirements.",
    img: "/printing.jpg",
    tags: ["Banners", "Backdrops", "Event print"],
    link: "/products/printing-services",
    btnClass: "btn-lime"
  },
  {
    title: "Sports Accessories",
    desc: "Selected sports equipment and team/event accessories for bulk orders.",
    img: "/sports-accessories.jpg",
    tags: ["Equipment", "Team gear", "Custom items"],
    link: "/products/sports-accessories",
    btnClass: "btn-pink"
  }
];

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main>
        <section 
          className="page-hero" 
          style={{ "--hero": "url('/hero-slide-1.jpg')" } as React.CSSProperties}
        >
          <div className="container inner">
            <div className="page-copy">
              <div className="breadcrumb">Home / Products</div>
              <h1>
                Everything for Your <span>Sports Event</span>
              </h1>
              <p>
                Choose a category and send us your quantity, logo, names, sizes and event date. 
                SportzMitra focuses on custom and bulk requirements rather than fixed-cart checkout.
              </p>
              <Link className="btn btn-pink" href="/contact">
                GET BULK QUOTE →
              </Link>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="catalog">
              {categories.map((cat, idx) => (
                <article className="pcard" key={idx}>
                  <img src={cat.img} alt={cat.title} />
                  <div className="body">
                    <h3>{cat.title}</h3>
                    <p>{cat.desc}</p>
                    <div className="tags">
                      {cat.tags.map((tag, tIdx) => (
                        <span className="tag" key={tIdx}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link className={`btn ${cat.btnClass}`} href={cat.link}>
                      VIEW CATEGORY →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <CtaBand />
      <Footer />
    </>
  );
}