export interface Category {
  slug: string;
  name: string;
  tagline: string;
  accent: "pink" | "green";
  emoji: string;
}

export interface Product {
  id: string;
  categorySlug: string;
  name: string;
  mrp: number;
  price: number;
  colors: string[];
  badge?: string;
  emiFrom: number;
}

export interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  bg: string;
}