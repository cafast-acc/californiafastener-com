import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import "@/styles/cf-blog.css";
import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";
import { sanityFetch } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import {
  CATEGORY_BY_SLUG_QUERY,
  CATEGORY_SLUGS_QUERY,
  POSTS_BY_CATEGORY_QUERY,
} from "@/sanity/queries";
import type { BlogCategory, BlogPostSummary } from "@/lib/blog/types";
import { formatPublishedAt } from "@/lib/blog/format";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({
    query: CATEGORY_SLUGS_QUERY,
    tags: ["category"],
    fallback: [],
  });
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await sanityFetch<BlogCategory | null>({
    query: CATEGORY_BY_SLUG_QUERY,
    params: { slug },
    tags: ["category", `category:${slug}`],
    fallback: null,
  });
  if (!category) return { title: "Category not found" };
  return {
    title: `${category.title} · Field Notes`,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await sanityFetch<BlogCategory | null>({
    query: CATEGORY_BY_SLUG_QUERY,
    params: { slug },
    tags: ["category", `category:${slug}`],
    fallback: null,
  });
  if (!category) notFound();

  const posts = await sanityFetch<BlogPostSummary[]>({
    query: POSTS_BY_CATEGORY_QUERY,
    params: { categoryId: category._id },
    tags: ["post", `category:${slug}`],
    fallback: [],
  });

  return (
    <>
      <CfNav active="blog" />

      <section className="bl-hero">
        <div className="bl-wrap">
          <div className="bl-crumbs">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/blog">Field Notes</Link>
            <span className="sep">/</span>
            <span className="here">{category.title}</span>
          </div>
          <div className="bl-kicker">Category</div>
          <h1 className="bl-h1">{category.title}</h1>
          {category.description && <p className="bl-lede">{category.description}</p>}
        </div>
      </section>

      <section className="bl-list">
        <div className="bl-wrap">
          <div className="bl-list-head">
            <div className="bl-list-title">Posts in {category.title}</div>
            <div className="bl-list-count">
              {posts.length} {posts.length === 1 ? "post" : "posts"}
            </div>
          </div>
          {posts.length === 0 ? (
            <div className="bl-empty">
              <div className="bl-empty-icon">Empty category</div>
              <h2 className="bl-empty-title">Nothing here yet.</h2>
              <p className="bl-empty-sub">
                <Link href="/blog">Back to all Field Notes →</Link>
              </p>
            </div>
          ) : (
            <div className="bl-grid">
              {posts.map((post) => (
                <Link key={post._id} href={`/blog/${post.slug}`} className="bl-card">
                  <div className="bl-card-media">
                    {post.heroImage?.asset ? (
                      <img
                        src={urlFor(post.heroImage)
                          .width(900)
                          .height(675)
                          .fit("crop")
                          .auto("format")
                          .url()}
                        alt={post.heroImage.alt ?? post.title}
                      />
                    ) : (
                      <div className="bl-placeholder">No image</div>
                    )}
                  </div>
                  <div className="bl-card-meta">
                    <span>{formatPublishedAt(post.publishedAt)}</span>
                  </div>
                  <h3 className="bl-card-title">{post.title}</h3>
                  <p className="bl-card-sub">{post.summary}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CfFooter />
    </>
  );
}
