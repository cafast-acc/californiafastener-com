import { SITE_URL } from "@/lib/site";
import { urlFor } from "@/sanity/lib/image";
import type { PostDetail } from "@/sanity/lib/types";

const ORG = {
  "@type": "Organization",
  name: "California Fastener",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/logo.png`,
};

export function articleJsonLd(post: PostDetail) {
  const imageUrl = post.coverImage
    ? urlFor(post.coverImage).width(1200).quality(75).url()
    : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    ...(imageUrl ? { image: [imageUrl] } : {}),
    datePublished: post.publishedAt,
    dateModified: post._updatedAt,
    ...(post.author
      ? {
          author: {
            "@type": "Person",
            name: post.author.name,
            ...(post.author.linkedinUrl ? { url: post.author.linkedinUrl } : {}),
          },
        }
      : {}),
    publisher: ORG,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

export function breadcrumbJsonLd(post: PostDetail) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Blog", item: `${SITE_URL}/blog` },
      {
        "@type": "ListItem",
        position: 2,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };
}
