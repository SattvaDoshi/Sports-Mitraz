
export interface Category {
  slug: string;
  name: string;
  tagline: string;
  accent: "pink" | "green";
  image: string;
  price: number;
  originalPrice: number | null;
  discount: string;
}

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

  originalPrice?: number;
  discountPercent?: number;
  stock?: number;

  rating?: number;
  reviewCount?: number;
}

export interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  bg: string;
}