import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { AuthorBio } from "@/components/blog/AuthorBio";
import { LinkedProductCard } from "@/components/blog/LinkedProductCard";
import { PortableText } from "@/components/blog/PortableText";
import { urlForImage } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postBySlugQuery, postSlugsQuery } from "@/sanity/lib/queries";
import type { PostFull } from "@/sanity/types";

export const revalidate = 3600;
export const dynamicParams = true;

type Params = Promise<{ slug: string }>;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await sanityFetch<{ slug: string }[]>({
    query: postSlugsQuery,
    tags: ["post:slugs"],
  });
  if (!slugs) return [];
  return slugs.filter((s) => Boolean(s.slug)).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) {
    return { title: "Article not found" };
  }
  const title = post.seo?.title ?? post.title;
  const description = post.seo?.description ?? post.excerpt;
  const ogSource = post.seo?.ogImage?.asset ? post.seo.ogImage : post.coverImage;
  const ogUrl = ogSource?.asset
    ? urlForImage(ogSource).width(1200).height(630).url()
    : undefined;
  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    robots: post.seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      type: "article",
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: ogUrl ? [{ url: ogUrl, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogUrl ? [ogUrl] : undefined,
    },
  };
}

async function fetchPost(slug: string): Promise<PostFull | null> {
  return sanityFetch<PostFull>({
    query: postBySlugQuery,
    params: { slug },
    tags: [`post:${slug}`, "post"],
  });
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) {
    notFound();
  }

  return (
    <>
      <CfNav active="blog" />

      <article className="bl-article">
        <ArticleHeader post={post} />

        <div className="bl-article-body">
          {post.body && post.body.length > 0 ? (
            <PortableText value={post.body} />
          ) : (
            <p className="bl-prose-p bl-prose-empty">No content yet.</p>
          )}
        </div>

        {post.author ? (
          <div className="bl-article-bio">
            <AuthorBio author={post.author} />
          </div>
        ) : null}

        {post.relatedProducts && post.relatedProducts.length > 0 ? (
          <section className="bl-shop">
            <div className="bl-shop-head">
              <h3>Shop the article</h3>
              <Link href="/products" className="cf-link">
                All products
              </Link>
            </div>
            <div className="bl-shop-rail">
              {post.relatedProducts.map((product, i) => (
                <LinkedProductCard key={`${product.href}-${i}`} product={product} />
              ))}
            </div>
          </section>
        ) : null}

        {post.related && post.related.length > 0 ? (
          <section className="bl-related">
            <div className="bl-articles-head">
              <h3>Keep reading</h3>
            </div>
            <div className="bl-grid">
              {post.related.map((p) => (
                <ArticleCard key={p._id} post={p} />
              ))}
            </div>
          </section>
        ) : null}
      </article>

      <CfFooter />
    </>
  );
}
