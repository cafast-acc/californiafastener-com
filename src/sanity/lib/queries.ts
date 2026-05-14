import { groq } from "next-sanity";

// Shared post projection used by listings. Excludes `body` (heavy) and `seo`
// (only needed on the detail page).
const postCardFields = groq`
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  coverImage{
    ...,
    "lqip": asset->metadata.lqip,
    "alt": coalesce(alt, "")
  },
  "author": author->{ name, "slug": slug.current, role },
  "categories": categories[]->{ title, "slug": slug.current },
  tags
`;

export const homeQuery = groq`
  *[_type == "post" && defined(slug.current) && defined(publishedAt) && !(seo.noIndex == true)]
    | order(publishedAt desc)[0...20]{
      ${postCardFields}
    }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current) && defined(publishedAt)][].slug.current
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    ${postCardFields},
    body,
    seo,
    "author": author->{
      name,
      "slug": slug.current,
      role,
      bio,
      image,
      expertise,
      linkedinUrl
    },
    relatedProducts[]{
      name,
      path,
      image,
      shortDescription
    }
  }
`;

export const allPostsForSitemapQuery = groq`
  *[_type == "post" && defined(slug.current) && defined(publishedAt) && !(seo.noIndex == true)]{
    "slug": slug.current,
    publishedAt,
    _updatedAt
  }
`;
