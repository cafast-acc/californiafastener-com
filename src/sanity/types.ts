import type { PortableTextBlock } from "@portabletext/react";

export type SanityImage = {
  asset?: { _ref?: string; _id?: string };
  alt?: string;
  caption?: string;
  hotspot?: unknown;
  crop?: unknown;
} | null;

export type AuthorRef = {
  _id: string;
  name: string;
  role?: string;
  bio?: string;
  image?: SanityImage;
};

export type CategoryRef = {
  _id: string;
  title: string;
  slug: string;
  accent?: "blue" | "purple" | "mid";
};

export type LinkedProduct = {
  title: string;
  kicker?: string;
  blurb?: string;
  href: string;
  image?: SanityImage;
};

export type PostCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  readingMinutes?: number;
  coverImage?: SanityImage;
  category?: CategoryRef;
  author?: AuthorRef;
  featured?: boolean;
};

export type PostFull = PostCard & {
  body?: PortableTextBlock[];
  updatedAt?: string;
  relatedProducts?: LinkedProduct[];
  related?: PostCard[];
  seo?: {
    title?: string;
    description?: string;
    ogImage?: SanityImage;
    noIndex?: boolean;
  };
};

export type HomePayload = {
  posts: PostCard[];
  categories: CategoryRef[];
};
