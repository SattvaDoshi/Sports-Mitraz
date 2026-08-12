// Types interface reference for TypeScript (if using lib/types.ts):
/*
export interface Product {
  id: string;
  categorySlug: string;
  name: string;
  price: number;
  mrp: number;
  description: string;
  colors?: string[];
  sizes?: string[];
  badge?: string;
  emiFrom: number;
  image: string;
  images?: string[];
  highlights?: string[];
}
*/

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

export const heroSlides = [
  {
    id: "s1",
    title: "Every Sport. One Sportz Mitraz.",
    subtitle: "Premium gear for football, tennis, badminton, cricket & more.",
    bg: "linear-gradient(135deg, #16321a 0%, #2f5c1c 55%, #7cb928 100%)",
  },
  {
    id: "s2",
    title: "Gear Up For Match Day",
    subtitle: "Studs, rackets & kits trusted by weekend warriors and pros alike.",
    bg: "linear-gradient(135deg, #3a0d1f 0%, #8c1245 55%, #e21c63 100%)",
  },
  {
    id: "s3",
    title: "Your Mitra On Every Field",
    subtitle: "20+ stores across India. Fast delivery. Real support.",
    bg: "linear-gradient(135deg, #101010 0%, #333333 55%, #7cb928 100%)",
  },
];

export const products = [
  // ---------- FOOTBALL ----------
  {
    id: "f1",
    categorySlug: "football",
    name: "Aura Turf Football Shoe",
    price: 4699,
    mrp: 5499,
    colors: ["#38bdf8", "#7cb928"],
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"],
    badge: "New arrival",
    emiFrom: 1566,
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80&auto=format&fit=crop",
    description: "Engineered for high-speed traction on synthetic turf pitches. Features a lightweight textured upper for precise ball control and a responsive cushioned midsole.",
    highlights: ["Non-marking rubber turf studs", "Textured synthetic upper for control", "Cushioned EVA inner sole"]
  },
  {
    id: "f2",
    categorySlug: "football",
    name: "Volt Pro Match Ball",
    price: 1399,
    mrp: 1899,
    colors: ["#e21c63", "#ffffff"],
    badge: "Best seller",
    emiFrom: 466,
    image: "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=800&q=80&auto=format&fit=crop",
    description: "Match-grade football crafted with thermally bonded panels for minimal water absorption and true aerodynamic flight on natural grass or turf.",
    highlights: ["Thermally-bonded seamless construction", "High-rebound butyl bladder", "FIFA Quality performance standards"]
  },

  // ---------- BASKETBALL ----------
  {
    id: "k1",
    categorySlug: "basketball",
    name: "Streetball Grip Ball",
    price: 1199,
    mrp: 1599,
    colors: ["#f97316", "#111111"],
    emiFrom: 400,
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800&q=80&auto=format&fit=crop",
    description: "Deep-channel composite ball designed specifically for rough concrete and asphalt courts. Offers superior grip retention in dry or humid conditions.",
    highlights: ["Deep-channel pebble texture", "Heavy-duty rubber composite exterior", "Official Size 7 standard"]
  },
  {
    id: "k2",
    categorySlug: "basketball",
    name: "Hardwood High-Top Shoe",
    price: 4499,
    mrp: 5999,
    colors: ["#7cb928", "#111111"],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    badge: "New arrival",
    emiFrom: 1500,
    image: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=800&q=80&auto=format&fit=crop",
    description: "High-top basketball sneakers featuring padded collar ankle support, high-rebound heel cushioning, and multi-directional herringbone traction patterns.",
    highlights: ["High-cut ankle lock design", "Herringbone pattern rubber outsole", "Impact-absorbing foam midsole"]
  },

  // ---------- RUNNING ----------
  {
    id: "r1",
    categorySlug: "running",
    name: "Nimbus Fly Running Shoe",
    price: 3499,
    mrp: 4499,
    colors: ["#7cb928", "#ffffff"],
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"],
    badge: "Best seller",
    emiFrom: 1166,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80&auto=format&fit=crop",
    description: "Ultra-breathable engineered knit running shoe built for high-mileage training. Delivers a responsive springy stride with lightweight shock absorption.",
    highlights: ["Seamless engineered mesh upper", "Responsive double-density foam", "Breathable antimicrobial liner"]
  },
  {
    id: "r2",
    categorySlug: "running",
    name: "TrailBlazer Shoe",
    price: 2999,
    mrp: 3999,
    colors: ["#f97316"],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10"],
    emiFrom: 1000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&auto=format&fit=crop",
    description: "Rugged trail running shoes built with aggressive outsole lugs for dirt, mud, and uneven mountain paths. Includes reinforced mudguards and toe protection.",
    highlights: ["Deep 5mm directional trail lugs", "Reinforced rubber toe bumper", "Water-resistant mesh coating"]
  },

  // ---------- TENNIS ----------
  {
    id: "t1",
    categorySlug: "tennis",
    name: "Smash Pro 100 Racket",
    price: 4999,
    mrp: 6499,
    colors: ["#e21c63", "#111111"],
    sizes: ["G2 (4 1/4)", "G3 (4 3/8)"],
    badge: "New arrival",
    emiFrom: 1666,
    image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&q=80&auto=format&fit=crop",
    description: "100 sq inch head size offering an ideal sweet spot for spin and power. Graphite frame construction minimizes arm vibration on heavy impact shots.",
    highlights: ["Full graphite frame construction", "16x19 open string pattern", "Pre-strung with monofilament line"]
  },
  {
    id: "t2",
    categorySlug: "tennis",
    name: "Championship Tennis Balls (3pk)",
    price: 299,
    mrp: 399,
    colors: ["#dff05a"],
    emiFrom: 100,
    image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&q=80&auto=format&fit=crop",
    description: "Pressurized championship tennis balls made with high-density woven felt for consistent bounce and maximum wear resistance on hard courts.",
    highlights: ["Extra-duty felt coating", "Pressurized inner core", "ITF approved for tournament play"]
  },

  // ---------- BAGS ----------
  {
    id: "bg1",
    categorySlug: "bags",
    name: "Gym Duffel Bag",
    price: 1499,
    mrp: 1999,
    colors: ["#111111", "#e21c63"],
    emiFrom: 500,
    image: "https://images.unsplash.com/photo-1594299447935-e5b840f54b9b?w=800&q=80&auto=format&fit=crop",
    description: "45-liter all-purpose sport duffel with a separate side-zip ventilated shoe tunnel, waterproof base panel, and padded detachable shoulder strap.",
    highlights: ["Ventilated laundry/shoe tunnel", "Water-resistant 600D polyester", "Padded shoulder strap included"]
  }
];

// Helper Functions
export function getProductById(id) {
  return products.find((p) => p.id === id) || null;
}

export function getCategory(slug) {
  return categories.find((c) => c.slug === slug) || null;
}

export function getProductsByCategory(slug) {
  return products.filter((p) => p.categorySlug === slug);
}