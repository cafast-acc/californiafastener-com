/**
 * GROQ queries for the Field Notes blog.
 *
 * Projections are explicit (no `...`) so the TypeScript types in
 * `src/lib/blog/types.ts` and the queries stay in lockstep.
 */

const POST_FIELDS = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  summary,
  publishedAt,
  featured,
  heroImage { ..., asset-> },
  "author": author-> { _id, name, "slug": slug.current, role, photo { ..., asset-> } },
  "categories": categories[]-> { _id, title, "slug": slug.current }
`;

export const POSTS_LIST_QUERY = /* groq */ `
  *[_type == "post" && defined(slug.current) && publishedAt <= now()]
  | order(featured desc, publishedAt desc) {
    ${POST_FIELDS}
  }
`;

export const POST_SLUGS_QUERY = /* groq */ `
  *[_type == "post" && defined(slug.current) && publishedAt <= now()].slug.current
`;

export const POST_DETAIL_QUERY = /* groq */ `
  *[_type == "post" && slug.current == $slug && publishedAt <= now()][0] {
    ${POST_FIELDS},
    body,
    seoTitle,
    seoDescription
  }
`;

export const RELATED_POSTS_QUERY = /* groq */ `
  *[_type == "post"
    && slug.current != $slug
    && publishedAt <= now()
    && count(categories[@._ref in $categoryIds]) > 0]
  | order(publishedAt desc)[0...3] {
    ${POST_FIELDS}
  }
`;

export const CATEGORY_BY_SLUG_QUERY = /* groq */ `
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description
  }
`;

export const CATEGORY_SLUGS_QUERY = /* groq */ `
  *[_type == "category" && defined(slug.current)].slug.current
`;

export const POSTS_BY_CATEGORY_QUERY = /* groq */ `
  *[_type == "post"
    && defined(slug.current)
    && publishedAt <= now()
    && $categoryId in categories[]._ref]
  | order(publishedAt desc) {
    ${POST_FIELDS}
  }
`;
