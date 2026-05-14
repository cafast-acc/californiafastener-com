import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { homeQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import type { BlogIndexData, PostCard } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Field Notes",
  description:
    "Technical guides on fasteners, anchors, coatings, and installation — written by the California Fastener applications team.",
};

// One-hour safety net behind webhook-driven invalidation.
export const revalidate = 3600;

async function fetchIndex(): Promise<BlogIndexData> {
  // Be resilient to a missing/misconfigured Sanity project so the build and
  // first deploy succeed before the project is wired up.
  try {
    return await sanityFetch<BlogIndexData>(homeQuery, {}, {
      tags: ["posts", "categories"],
    });
  } catch {
    return { posts: [], categories: [], total: 0 };
  }
}

function formatLongDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function estimateFeaturedMinutes(post: PostCard): number {
  if (!post.excerpt) return 6;
  const words = post.excerpt.trim().split(/\s+/).length;
  return Math.min(15, Math.max(3, Math.round((words * 5) / 225)));
}

function FeaturedArticle({ post }: { post: PostCard }) {
  const cover = post.coverImage;
  const coverUrl = cover ? urlFor(cover).width(1200).quality(75).url() : null;
  const primaryCat = post.categories?.[0];
  const minutes = estimateFeaturedMinutes(post);

  return (
    <section className="bl-featured">
      <Link href={`/blog/${post.slug}`} className="bl-featured-link">
        <div className="bl-featured-grid">
          <div className="bl-featured-img">
            {coverUrl ? (
              <Image
                src={coverUrl}
                alt={cover?.alt ?? post.title}
                width={1200}
                height={960}
                sizes="(max-width: 900px) 100vw, 720px"
                quality={75}
                priority
                placeholder={cover?.lqip ? "blur" : "empty"}
                blurDataURL={cover?.lqip}
              />
            ) : null}
          </div>
          <div>
            <div className="bl-featured-cat">
              Featured{primaryCat ? ` · ${primaryCat.title}` : ""}
            </div>
            <h2>{post.title}</h2>
            {post.excerpt ? <p>{post.excerpt}</p> : null}
            <div className="bl-featured-meta">
              {post.author?.name ? `By ${post.author.name} · ` : ""}
              {formatLongDate(post.publishedAt)} · {minutes} min read
            </div>
            <span className="cf-link">Read article</span>
          </div>
        </div>
      </Link>
    </section>
  );
}

export default async function BlogIndex() {
  const { posts, categories, total } = await fetchIndex();
  const [featured, ...rest] = posts;
  const totalLabel =
    total === 0
      ? "Updated weekly"
      : `${total} ${total === 1 ? "article" : "articles"} · Updated weekly`;

  return (
    <>
      <CfNav />
      <main>
        <section className="bl-hero">
          <div className="bl-hero-top">
            <div>
              <div className="bl-hero-eyebrow">Field Notes</div>
              <h1>
                Notes from the
                <br />
                shop <i>floor.</i>
              </h1>
            </div>
            <div className="bl-hero-meta">
              <p>
                Technical articles, industry insights, and hard-won knowledge
                from our team — written for engineers and buyers.
              </p>
              <div className="bl-count">{totalLabel}</div>
            </div>
          </div>
          {/* Category pills. Functional filtering ships in v2; for now the
              "All" pill is the active state, others are visual only — matches
              the design template. */}
          <div className="bl-cat-bar" role="list" aria-label="Categories">
            <button type="button" className="bl-cat-pill is-active">
              All
            </button>
            {categories.map((c) => (
              <button key={c.slug} type="button" className="bl-cat-pill">
                {c.title}
              </button>
            ))}
          </div>
        </section>

        {posts.length === 0 ? (
          <div className="bl-empty">No posts yet — check back soon.</div>
        ) : (
          <>
            {featured ? <FeaturedArticle post={featured} /> : null}

            {rest.length > 0 ? (
              <section className="bl-articles">
                <div className="bl-articles-head">
                  <h3>Latest articles</h3>
                  <div className="bl-sort">Sort: Most recent</div>
                </div>
                <div className="bl-article-grid">
                  {rest.map((post) => (
                    <ArticleCard key={post._id} post={post} />
                  ))}
                </div>
              </section>
            ) : null}
          </>
        )}
      </main>
      <CfFooter />
    </>
  );
}
