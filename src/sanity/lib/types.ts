// TypeScript shapes mirroring the GROQ projections in ./queries.ts.
// Hand-maintained; keep these in sync with the projections when fields change.

import type { PortableTextBlock } from "@portabletext/react";

export type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
  caption?: string;
  lqip?: string;
};

export type CategoryRef = {
  title: string;
  slug: string;
};

export type AuthorRef = {
  name: string;
  slug: string;
  role?: string;
};

export type AuthorFull = AuthorRef & {
  bio?: string;
  image?: SanityImage;
  expertise?: string[];
  linkedinUrl?: string;
};

export type PostCard = {
  _id: string;
  _updatedAt: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  coverImage?: SanityImage;
  author?: AuthorRef;
  categories?: CategoryRef[];
  tags?: string[];
};

export type SeoFields = {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
  canonicalUrl?: string;
  noIndex?: boolean;
  focusKeyword?: string;
};

export type LinkedProduct = {
  name: string;
  path: string;
  image?: SanityImage;
  shortDescription?: string;
};

export type PostDetail = Omit<PostCard, "author"> & {
  body?: PortableTextBlock[];
  seo?: SeoFields;
  author?: AuthorFull;
  relatedProducts?: LinkedProduct[];
};

export type SitemapPost = {
  slug: string;
  publishedAt: string;
  _updatedAt: string;
};
