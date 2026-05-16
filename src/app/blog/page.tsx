import type { Metadata } from "next";
import Link from "next/link";
import "@/styles/cf-blog.css";
import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";
import { sanityFetch } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { isConfigured } from "@/sanity/env";
import { POSTS_LIST_QUERY } from "@/sanity/queries";
import type { BlogPostSummary } from "@/lib/blog/types";
import { formatPublishedAt } from "@/lib/blog/format";

export const metadata: Metadata = {
  title: "Field Notes",
  description:
    "Engineering writeups, application notes, and what we learned solving real fastener problems for Bay Area shops, EPCs, and OEMs.",
};

export const revalidate = 60;

export default async function BlogIndexPage() {
  const posts = await sanityFetch<BlogPostSummary[]>({
    query: POSTS_LIST_QUERY,
    tags: ["post"],
    fallback: [],
  });

  const [featured, ...rest] = posts;

  return (
    <>
      <CfNav active="blog" />

      <section className="bl-hero">
        <div className="bl-wrap">
          <div className="bl-crumbs">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="here">Field Notes</span>
          </div>
          <div className="bl-kicker">Field Notes</div>
          <h1 className="bl-h1">
            Notes from the <i>shop floor</i>.
          </h1>
          <p className="bl-lede">
            Engineering writeups, application notes, and what we learned solving real fastener
            problems for Bay Area shops, EPCs, and OEMs.
          </p>
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
            <section className="bl-wrap">
              <div className="bl-featured">
                <div className="bl-featured-media">
                  {featured.heroImage?.asset ? (
                    <img
                      src={urlFor(featured.heroImage).width(1400).height(1050).fit("crop").auto("format").url()}
                      alt={featured.heroImage.alt ?? featured.title}
                    />
                  ) : (
                    <div className="bl-placeholder">No image</div>
                  )}
                </div>
                <div>
                  <div className="bl-featured-meta">
                    {featured.featured && <b>Featured</b>}
                    {featured.categories?.[0] && <b>{featured.categories[0].title}</b>}
                    <span>{formatPublishedAt(featured.publishedAt)}</span>
                  </div>
                  <h2 className="bl-featured-title">
                    <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                  </h2>
                  <p className="bl-featured-sub">{featured.summary}</p>
                  {featured.author && (
                    <div className="bl-featured-byline">
                      By <b>{featured.author.name}</b>
                      {featured.author.role && <span> · {featured.author.role}</span>}
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {rest.length > 0 && (
            <section className="bl-list">
              <div className="bl-wrap">
                <div className="bl-list-head">
                  <div className="bl-list-title">More posts</div>
                  <div className="bl-list-count">
                    {rest.length} {rest.length === 1 ? "post" : "posts"}
                  </div>
                </div>
                <div className="bl-grid">
                  {rest.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
              </div>
            </section>
          )}
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
      <div className="bl-card-meta">
        {cat && <b>{cat.title}</b>}
        <span>{formatPublishedAt(post.publishedAt)}</span>
      </div>
      <h3 className="bl-card-title">{post.title}</h3>
      <p className="bl-card-sub">{post.summary}</p>
    </Link>
  );
}
