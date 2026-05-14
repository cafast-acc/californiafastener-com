import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";
import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { AuthorBio } from "@/components/blog/AuthorBio";
import { LinkedProductCard } from "@/components/blog/LinkedProductCard";
import { PortableText } from "@/components/blog/PortableText";
import { readingTimeMinutes } from "@/lib/readingTime";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { postBySlugQuery, postSlugsQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import type { PostDetail } from "@/sanity/lib/types";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 3600;

export async function generateStaticParams() {
  // Don't crash the build if Sanity isn't reachable yet (e.g. before the
  // project is wired up). Falls back to on-demand SSR for each slug.
  try {
    const slugs = await sanityFetch<string[]>(postSlugsQuery, {}, { tags: ["posts"] });
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<PostDetail | null>(
    postBySlugQuery,
    { slug },
    { tags: [`post:${slug}`] },
  );
  if (!post) return { title: "Post not found" };

  const title = post.seo?.metaTitle ?? post.title;
  const description = post.seo?.metaDescription ?? post.excerpt ?? undefined;
  const ogImageSource = post.seo?.ogImage ?? post.coverImage;
  const ogImageUrl = ogImageSource
    ? urlFor(ogImageSource).width(1200).height(630).quality(75).url()
    : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: post.seo?.canonicalUrl ?? `/blog/${slug}`,
    },
    robots: post.seo?.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/blog/${slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      ...(ogImageUrl
        ? { images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImageUrl ? { images: [ogImageUrl] } : {}),
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await sanityFetch<PostDetail | null>(
    postBySlugQuery,
    { slug },
    { tags: [`post:${slug}`] },
  );
  if (!post) notFound();

  const minutes = readingTimeMinutes(post.body);

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(post)) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(post)) }}
      />
      <CfNav />
      <main>
        <article className="bl-wrap-narrow">
          <ArticleHeader post={post} readingMinutes={minutes} />
          {post.body ? <PortableText value={post.body} /> : null}
          <AuthorBio author={post.author} />
          {post.relatedProducts && post.relatedProducts.length > 0 ? (
            <section className="bl-products">
              <h2>Shop the article</h2>
              <div className="bl-products-grid">
                {post.relatedProducts.map((p, i) => (
                  <LinkedProductCard key={`${p.path}-${i}`} product={p} />
                ))}
              </div>
            </section>
          ) : null}
        </article>
      </main>
      <CfFooter />
    </>
  );
}
