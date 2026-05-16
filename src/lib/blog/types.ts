import type { PortableTextBlock } from "@portabletext/react";

export type SanityImage = {
  _type?: "image";
  asset?: {
    _ref?: string;
    _id?: string;
    url?: string;
    metadata?: {
      dimensions?: { width: number; height: number };
      lqip?: string;
    };
  };
  alt?: string;
  caption?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

export type BlogAuthor = {
  _id: string;
  name: string;
  slug: string;
  role?: string;
  photo?: SanityImage;
};

export type BlogCategory = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
};

export type BlogPostSummary = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  publishedAt: string;
  featured?: boolean;
  heroImage?: SanityImage;
  author?: BlogAuthor;
  categories?: BlogCategory[];
};

export type BlogPost = BlogPostSummary & {
  body?: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
};
