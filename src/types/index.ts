// ─── Category & Subcategory definitions ───────────────────────────────────────

export interface Subcategory {
  slug: string;
  name: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  image?: string;
  subcategories?: Subcategory[];
}

export const CATEGORIES: Category[] = [
  {
    slug: "jewellery",
    name: "Jewellery",
    description: "Handcrafted jewellery made with love and healing crystals.",
    image: "/categories/jewellery.jpg",
    subcategories: [
      { slug: "necklaces-pendants", name: "Necklaces & Pendants" },
      { slug: "bracelets", name: "Bracelets" },
      { slug: "earrings", name: "Earrings" },
      { slug: "rings", name: "Rings" },
      { slug: "goddess-clips", name: "Goddess Clips" },
    ],
  },
  {
    slug: "crystals",
    name: "Crystals",
    description: "Beautiful crystals and minerals for healing, decor, and collection.",
    image: "/categories/crystals.jpg",
    subcategories: [
      { slug: "hearts", name: "Hearts" },
      { slug: "towers-pyramids", name: "Towers & Pyramids" },
      { slug: "spheres-free-forms", name: "Spheres & Free Forms" },
      { slug: "fossils", name: "Fossils" },
      { slug: "palm-stones", name: "Palm Stones" },
      { slug: "carvings", name: "Carvings" },
      { slug: "clusters-geodes", name: "Clusters & Geodes" },
    ],
  },
  {
    slug: "selenite-lamps",
    name: "Selenite Lamps",
    description: "Stunning selenite lamps that cleanse and illuminate your space.",
    image: "/categories/selenite-lamps.jpg",
  },
  {
    slug: "reiki",
    name: "Reiki",
    description: "Reiki stone sets for energy healing and spiritual practice.",
    image: "/categories/reiki.jpg",
  },
  {
    slug: "magnets",
    name: "Magnets",
    description: "Crystal and goddess-themed fridge magnets.",
    image: "/categories/magnets.jpg",
  },
  {
    slug: "mugs",
    name: "Mugs",
    description: "Mystical mugs for your morning ritual.",
    image: "/categories/mugs.jpg",
  },
];

// ─── Product types ─────────────────────────────────────────────────────────────

export interface ProductImage {
  id: string;
  url: string;
  caption?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number; // in cents
  currency: string;
  inventoryCount?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  categorySlug: string;
  subcategorySlug?: string;
  images: ProductImage[];
  variants: ProductVariant[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  tags?: string[];
}

// ─── Cart types ────────────────────────────────────────────────────────────────

export interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  variantName: string;
  price: number;
  currency: string;
  quantity: number;
  imageUrl?: string;
}

export interface Cart {
  items: CartItem[];
}

// ─── Custom piece request ──────────────────────────────────────────────────────

export interface CustomPieceRequest {
  name: string;
  email: string;
  description: string;
  budget: string;
}
