import type { Metadata } from "next";
import Link from "next/link";
import "@/styles/cf-blog.css";
import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";
import { sanityFetch } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { isConfigured } from "@/sanity/env";
import { POSTS_LIST_QUERY, ALL_CATEGORIES_QUERY } from "@/sanity/queries";
import type { BlogPostSummary, BlogCategory } from "@/lib/blog/types";
import { formatPublishedAt } from "@/lib/blog/format";

export const metadata: Metadata = {
  title: "Field Notes",
  description:
    "Engineering writeups, application notes, and what we learned solving real fastener problems for Bay Area shops, EPCs, and OEMs.",
};

export const revalidate = 60;

export default async function BlogIndexPage() {
  const [posts, categories] = await Promise.all([
    sanityFetch<BlogPostSummary[]>({
      query: POSTS_LIST_QUERY,
      tags: ["post"],
      fallback: [],
    }),
    sanityFetch<BlogCategory[]>({
      query: ALL_CATEGORIES_QUERY,
      tags: ["category"],
      fallback: [],
    }),
  ]);

  const [featured, ...rest] = posts;

  return (
    <>
      <CfNav active="blog" />

      <section className="bl-hero">
        <div className="bl-wrap">
          <div className="bl-hero-top">
            <div>
              <div className="bl-kicker">Field Notes</div>
              <h1 className="bl-h1">
                Notes from the<br />shop <i>floor.</i>
              </h1>
            </div>
            <div className="bl-hero-meta">
              <p>
                Technical articles, industry insights, and hard-won knowledge from our team —
                written for engineers and buyers.
              </p>
              <div className="bl-hero-count">
                {posts.length} {posts.length === 1 ? "article" : "articles"} · Updated weekly
              </div>
            </div>
          </div>

          {categories.length > 0 && (
            <div className="bl-filters">
              <Link href="/blog" className="bl-chip is-active">All</Link>
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/blog/category/${cat.slug}`}
                  className="bl-chip"
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {posts.length === 0 ? (
        <section className="bl-wrap">
          <div className="bl-empty">
            <div className="bl-empty-icon">
              {isConfigured ? "No posts published yet" : "Studio not connected"}
            </div>
            <h2 className="bl-empty-title">
              {isConfigured
                ? "Field Notes is being set up."
                : "Connect the Studio to publish posts."}
            </h2>
            <p className="bl-empty-sub">
              {isConfigured ? (
                <>
                  Once a post is published in the Studio at <code>/studio</code>, it will appear
                  here. Set <code>publishedAt</code> to a date in the past to make a post visible.
                </>
              ) : (
                <>
                  Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{" "}
                  <code>NEXT_PUBLIC_SANITY_DATASET</code> in the environment, then visit{" "}
                  <code>/studio</code> to start writing.
                </>
              )}
            </p>
          </div>
        </section>
      ) : (
        <>
          {featured && (
            <section className="bl-featured-section">
              <div className="bl-wrap">
                <div className="bl-featured">
                  <div className="bl-featured-media">
                    {featured.heroImage?.asset ? (
                      <img
                        src={urlFor(featured.heroImage)
                          .width(1200)
                          .height(960)
                          .fit("crop")
                          .auto("format")
                          .url()}
                        alt={featured.heroImage.alt ?? featured.title}
                      />
                    ) : (
                      <div className="bl-placeholder">No image</div>
                    )}
                  </div>
                  <div>
                    <div className="bl-featured-cat">
                      Featured
                      {featured.categories?.[0] && ` · ${featured.categories[0].title}`}
                    </div>
                    <h2 className="bl-featured-title">
                      <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                    </h2>
                    <p className="bl-featured-sub">{featured.summary}</p>
                    <div className="bl-featured-meta">
                      {featured.author && <>By {featured.author.name} · </>}
                      {formatPublishedAt(featured.publishedAt)}
                    </div>
                    <Link href={`/blog/${featured.slug}`} className="cf-link">
                      Read article
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}

          {rest.length > 0 && (
            <section className="bl-list">
              <div className="bl-wrap">
                <div className="bl-list-head">
                  <h3 className="bl-list-title">Latest articles</h3>
                  <div className="bl-list-sort">Sort: Most recent</div>
                </div>
                <div className="bl-grid">
                  {rest.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className="bl-newsletter">
            <div className="bl-wrap bl-newsletter-inner">
              <div>
                <h3 className="bl-newsletter-title">Get Field Notes in your inbox.</h3>
                <p className="bl-newsletter-sub">
                  Two technical articles a month. No marketing. Unsubscribe anytime.
                </p>
              </div>
              <form
                className="bl-newsletter-form"
                action="https://formspree.io/f/placeholder"
                method="post"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  aria-label="Email address"
                  required
                />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </section>
        </>
      )}

      <CfFooter />
    </>
  );
}

function PostCard({ post }: { post: BlogPostSummary }) {
  const cat = post.categories?.[0];
  return (
    <Link href={`/blog/${post.slug}`} className="bl-card">
      <div className="bl-card-media">
        {post.heroImage?.asset ? (
          <img
            src={urlFor(post.heroImage).width(900).height(675).fit("crop").auto("format").url()}
            alt={post.heroImage.alt ?? post.title}
          />
        ) : (
          <div className="bl-placeholder">No image</div>
        )}
      </div>
      {cat && <div className="bl-card-cat">{cat.title}</div>}
      <h4 className="bl-card-title">{post.title}</h4>
      <p className="bl-card-sub">{post.summary}</p>
      <div className="bl-card-meta">{formatPublishedAt(post.publishedAt)}</div>
    </Link>
  );
}
