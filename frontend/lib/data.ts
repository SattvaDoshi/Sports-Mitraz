// import { Category, Product, CarouselSlide } from "./types";

// export const categories: Category[] = [
//   { slug: "football", name: "Football", tagline: "Turf & studs for every pitch", accent: "green", emoji: "⚽" },
//   { slug: "tennis", name: "Tennis", tagline: "Rackets strung for match day", accent: "pink", emoji: "🎾" },
//   { slug: "badminton", name: "Badminton", tagline: "Feather-light, tournament ready", accent: "green", emoji: "🏸" },
//   { slug: "cricket", name: "Cricket", tagline: "Bats, kits & protective gear", accent: "pink", emoji: "🏏" },
//   { slug: "basketball", name: "Basketball", tagline: "Built for the hardwood", accent: "green", emoji: "🏀" },
//   { slug: "running", name: "Running", tagline: "Miles made comfortable", accent: "pink", emoji: "🏃" },
// ];

// export const heroSlides: CarouselSlide[] = [
//   {
//     id: "s1",
//     title: "Every Sport. One Sportz Mitraz.",
//     subtitle: "Premium gear for football, tennis, badminton, cricket & more.",
//     bg: "linear-gradient(135deg, #16321a 0%, #2f5c1c 55%, #7cb928 100%)",
//   },
//   {
//     id: "s2",
//     title: "Gear Up For Match Day",
//     subtitle: "Studs, rackets & kits trusted by weekend warriors and pros alike.",
//     bg: "linear-gradient(135deg, #3a0d1f 0%, #8c1245 55%, #e21c63 100%)",
//   },
//   {
//     id: "s3",
//     title: "Your Mitra On Every Field",
//     subtitle: "20+ stores across India. Fast delivery. Real support.",
//     bg: "linear-gradient(135deg, #101010 0%, #333333 55%, #7cb928 100%)",
//   },
// ];

// export const products: Product[] = [
//   // football
//   { id: "f1", categorySlug: "football", name: "Aura Turf Football Shoe", mrp: 5499, price: 4699, colors: ["#38bdf8", "#7cb928"], badge: "New arrival", emiFrom: 1566 },
//   { id: "f2", categorySlug: "football", name: "Encounter Retro Turf Boot", mrp: 2149, price: 1612, colors: ["#166534", "#ffffff"], emiFrom: 537 },
//   { id: "f3", categorySlug: "football", name: "Ashtang 3.0 Turf Shoe", mrp: 2949, price: 2212, colors: ["#111111", "#e5e7eb"], emiFrom: 737 },
//   { id: "f4", categorySlug: "football", name: "Rabona 2.0 Kids Turf Shoe", mrp: 1079, price: 971, colors: ["#f97316"], badge: "Best seller", emiFrom: 324 },
//   { id: "f5", categorySlug: "football", name: "Volt Pro Match Ball", mrp: 1899, price: 1399, colors: ["#e21c63", "#ffffff"], emiFrom: 466 },
//   { id: "f6", categorySlug: "football", name: "Guardian Shin Pads", mrp: 799, price: 599, colors: ["#111111"], emiFrom: 200 },
//   // tennis
//   { id: "t1", categorySlug: "tennis", name: "Smash Pro 100 Racket", mrp: 6499, price: 4999, colors: ["#e21c63", "#111111"], badge: "New arrival", emiFrom: 1666 },
//   { id: "t2", categorySlug: "tennis", name: "AeroSpin Racket", mrp: 3999, price: 2999, colors: ["#7cb928"], emiFrom: 1000 },
//   { id: "t3", categorySlug: "tennis", name: "Championship Tennis Balls (3pk)", mrp: 399, price: 299, colors: ["#dff05a"], emiFrom: 100 },
//   { id: "t4", categorySlug: "tennis", name: "CourtGrip Tennis Shoe", mrp: 3299, price: 2499, colors: ["#ffffff", "#e21c63"], badge: "Best seller", emiFrom: 833 },
//   // badminton
//   { id: "b1", categorySlug: "badminton", name: "Featherlite Racket", mrp: 2999, price: 2199, colors: ["#111111", "#7cb928"], emiFrom: 733 },
//   { id: "b2", categorySlug: "badminton", name: "Tourney Nylon Shuttlecocks", mrp: 899, price: 649, colors: ["#ffffff"], emiFrom: 217 },
//   { id: "b3", categorySlug: "badminton", name: "CourtFlex Badminton Shoe", mrp: 2799, price: 2099, colors: ["#e21c63"], badge: "New arrival", emiFrom: 700 },
//   { id: "b4", categorySlug: "badminton", name: "Pro Feather Shuttlecocks", mrp: 1499, price: 1099, colors: ["#f5f5f5"], emiFrom: 366 },
//   // cricket
//   { id: "c1", categorySlug: "cricket", name: "English Willow Bat", mrp: 8999, price: 6999, colors: ["#deb887"], badge: "Best seller", emiFrom: 2333 },
//   { id: "c2", categorySlug: "cricket", name: "Kashmir Willow Bat", mrp: 2499, price: 1899, colors: ["#deb887"], emiFrom: 633 },
//   { id: "c3", categorySlug: "cricket", name: "Pro Batting Pads", mrp: 2199, price: 1699, colors: ["#ffffff"], emiFrom: 566 },
//   { id: "c4", categorySlug: "cricket", name: "Guardian Helmet", mrp: 1899, price: 1399, colors: ["#111111", "#e21c63"], emiFrom: 466 },
//   // basketball
//   { id: "k1", categorySlug: "basketball", name: "Streetball Grip Ball", mrp: 1599, price: 1199, colors: ["#f97316", "#111111"], emiFrom: 400 },
//   { id: "k2", categorySlug: "basketball", name: "Hardwood High-Top Shoe", mrp: 5999, price: 4499, colors: ["#7cb928", "#111111"], badge: "New arrival", emiFrom: 1500 },
//   { id: "k3", categorySlug: "basketball", name: "Court Vision Jersey", mrp: 1299, price: 949, colors: ["#e21c63"], emiFrom: 316 },
//   // running
//   { id: "r1", categorySlug: "running", name: "Nimbus Fly Running Shoe", mrp: 4499, price: 3499, colors: ["#7cb928", "#ffffff"], badge: "Best seller", emiFrom: 1166 },
//   { id: "r2", categorySlug: "running", name: "Marathon Dri-Fit Tee", mrp: 999, price: 749, colors: ["#111111", "#e21c63"], emiFrom: 250 },
//   { id: "r3", categorySlug: "running", name: "TrailBlazer Shoe", mrp: 3999, price: 2999, colors: ["#f97316"], emiFrom: 1000 },
// ];

// export function getCategory(slug: string): Category | undefined {
//   return categories.find((c) => c.slug === slug);
// }

// export function getProductsByCategory(slug: string): Product[] {
//   return products.filter((p) => p.categorySlug === slug);
// }


// Example categories array for /lib/data.js
// Each item now supports: image, price, originalPrice, discount (optional badge text)
// accent stays "pink" | "green" to alternate the theme, same as before.
//
// Swap `image` for your own product photography whenever you have it —
// these are verified, freely-licensed Unsplash photos (Unsplash License:
// free for commercial use, no attribution required) used here as realistic
// placeholders so the grid renders real product shots instead of emoji.
// --- Products, mapped to the current `categories` slugs above ---
export const products = [
  // football
  { id: "f1", categorySlug: "football", name: "Aura Turf Football Shoe", price: 4699, mrp: 5499, colors: ["#38bdf8", "#7cb928"], badge: "New arrival", emiFrom: 1566, image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80&auto=format&fit=crop" },
  { id: "f2", categorySlug: "football", name: "Volt Pro Match Ball", price: 1399, mrp: 1899, colors: ["#e21c63", "#ffffff"], emiFrom: 466, image: "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=800&q=80&auto=format&fit=crop" },

  // basketball
  { id: "k1", categorySlug: "basketball", name: "Streetball Grip Ball", price: 1199, mrp: 1599, colors: ["#f97316", "#111111"], emiFrom: 400, image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800&q=80&auto=format&fit=crop" },
  { id: "k2", categorySlug: "basketball", name: "Hardwood High-Top Shoe", price: 4499, mrp: 5999, colors: ["#7cb928", "#111111"], badge: "New arrival", emiFrom: 1500, image: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=800&q=80&auto=format&fit=crop" },

  // running
  { id: "r1", categorySlug: "running", name: "Nimbus Fly Running Shoe", price: 3499, mrp: 4499, colors: ["#7cb928", "#ffffff"], badge: "Best seller", emiFrom: 1166, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80&auto=format&fit=crop" },
  { id: "r2", categorySlug: "running", name: "TrailBlazer Shoe", price: 2999, mrp: 3999, colors: ["#f97316"], emiFrom: 1000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&auto=format&fit=crop" },

  // tennis
  { id: "t1", categorySlug: "tennis", name: "Smash Pro 100 Racket", price: 4999, mrp: 6499, colors: ["#e21c63", "#111111"], badge: "New arrival", emiFrom: 1666, image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&q=80&auto=format&fit=crop" },
  { id: "t2", categorySlug: "tennis", name: "Championship Tennis Balls (3pk)", price: 299, mrp: 399, colors: ["#dff05a"], emiFrom: 100, image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&q=80&auto=format&fit=crop" },

  // bags
  { id: "bg1", categorySlug: "bags", name: "Gym Duffel Bag", price: 1499, mrp: 1999, colors: ["#111111", "#e21c63"], emiFrom: 500, image: "https://images.unsplash.com/photo-1594299447935-e5b840f54b9b?w=800&q=80&auto=format&fit=crop" },
];
export const categories = [
  {
    slug: "football",
    name: "Football Gear",
    tagline: "Match balls, boots & training kits",
    accent: "pink",
    image:
      "https://images.unsplash.com/photo-1663683181863-7bd34db211d0?w=800&q=80&auto=format&fit=crop",
    price: 89.99,
    originalPrice: 129.99,
    discount: "30% OFF",
  },
  {
    slug: "basketball",
    name: "Basketball",
    tagline: "Court-ready balls & performance shoes",
    accent: "green",
    image:
      "https://images.unsplash.com/photo-1625038627556-966ed84eaa97?w=800&q=80&auto=format&fit=crop",
    price: 74.5,
    originalPrice: null,
    discount: "New",
  },
  {
    slug: "running",
    name: "Running Shoes",
    tagline: "Lightweight trainers for every mile",
    accent: "pink",
    image:
      "https://images.unsplash.com/photo-1615743472612-93b21e520fad?w=800&q=80&auto=format&fit=crop",
    price: 109.99,
    originalPrice: 149.99,
    discount: "25% OFF",
  },
  {
    slug: "tennis",
    name: "Tennis & Racket Sports",
    tagline: "Rackets, balls & court apparel",
    accent: "green",
    image:
      "https://images.unsplash.com/photo-1615326882458-e0d45b097f55?w=800&q=80&auto=format&fit=crop",
    price: 64.0,
    originalPrice: null,
    discount: "Shop",
  },
  {
    slug: "bags",
    name: "Backpacks & Bags",
    tagline: "Gym duffels & everyday carry",
    accent: "pink",
    image:
      "https://images.unsplash.com/photo-1594299447935-e5b840f54b9b?w=800&q=80&auto=format&fit=crop",
    price: 54.99,
    originalPrice: 74.99,
    discount: "20% OFF",
  },
];

// add at the bottom of lib/data.js, after the products/categories exports
export function getProductById(id) {
  return products.find((p) => p.id === id) || null;
}

export function getCategory(slug) {
  return categories.find((c) => c.slug === slug) || null;
}

export function getProductsByCategory(slug) {
  return products.filter((p) => p.categorySlug === slug);
}

