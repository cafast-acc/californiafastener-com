import { defineQuery } from "next-sanity";

// Index page: every published post + the category list for the pill bar.
export const homeQuery = defineQuery(`{
  "posts": *[_type == "post" && defined(publishedAt) && !(_id in path('drafts.**'))] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    readingMinutes,
    coverImage,
    "category": category->{ _id, title, "slug": slug.current, accent },
    "author": author->{ _id, name, role, image }
  },
  "categories": *[_type == "category"] | order(order asc, title asc){
    _id, title, "slug": slug.current, accent
  }
}`);

export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug && !(_id in path('drafts.**'))][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    updatedAt,
    readingMinutes,
    coverImage,
    body,
    seo,
    "category": category->{ _id, title, "slug": slug.current, accent },
    "author": author->{ _id, name, role, bio, image },
    "relatedProducts": relatedProducts[]{ title, kicker, blurb, href, image },
    "related": *[_type == "post" && slug.current != $slug && category._ref == ^.category._ref && !(_id in path('drafts.**'))] | order(publishedAt desc)[0...3]{
      _id, title, "slug": slug.current, publishedAt, readingMinutes, coverImage
    }
  }
`);

export const postSlugsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current) && !(_id in path('drafts.**'))]{ "slug": slug.current }
`);

export const allPostsForSitemapQuery = defineQuery(`
  *[_type == "post" && defined(slug.current) && !(_id in path('drafts.**'))]{
    "slug": slug.current,
    publishedAt,
    updatedAt
  }
`);
