import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import "@/styles/cf-blog.css";
import { CfNav } from "@/components/CfNav";
import { CfFooter } from "@/components/CfFooter";
import { PortableBody } from "@/components/blog/PortableBody";
import { sanityFetch } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import {
  POST_DETAIL_QUERY,
  POST_SLUGS_QUERY,
  RELATED_POSTS_QUERY,
} from "@/sanity/queries";
import type { BlogPost, BlogPostSummary } from "@/lib/blog/types";
import { estimateReadingMinutes, formatPublishedAt } from "@/lib/blog/format";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({
    query: POST_SLUGS_QUERY,
    tags: ["post"],
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
  const post = await sanityFetch<BlogPost | null>({
    query: POST_DETAIL_QUERY,
    params: { slug },
    tags: ["post", `post:${slug}`],
    fallback: null,
  });
  if (!post) return { title: "Post not found" };
  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.summary,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await sanityFetch<BlogPost | null>({
    query: POST_DETAIL_QUERY,
    params: { slug },
    tags: ["post", `post:${slug}`],
    fallback: null,
  });
  if (!post) notFound();

  const categoryIds = post.categories?.map((c) => c._id) ?? [];
  const related =
    categoryIds.length > 0
      ? await sanityFetch<BlogPostSummary[]>({
          query: RELATED_POSTS_QUERY,
          params: { slug, categoryIds },
          tags: ["post"],
          fallback: [],
        })
      : [];

  const readMins = estimateReadingMinutes(post.body);

  return (
    <>
      <CfNav active="blog" />

      <main className="bp-wrap">
        <div className="bp-crumbs">
          <Link href="/blog" className="bp-back">
            <svg
              className="bp-back-arrow"
              viewBox="0 0 16 16"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M10 4l-4 4 4 4" />
            </svg>
            Back to Field Notes
          </Link>
        </div>

        <header className="bp-header">
          {post.categories?.map((c) => (
            <Link key={c._id} href={`/blog/category/${c.slug}`} className="bp-tag">
              {c.title}
            </Link>
          ))}
          <h1 className="bp-title">{post.title}</h1>
          <p className="bp-dek">{post.summary}</p>
          <div className="bp-byline">
            {post.author?.photo?.asset && (
              <div className="bp-byline-photo">
                <img
                  src={urlFor(post.author.photo).width(80).height(80).fit("crop").url()}
                  alt={post.author.name}
                />
              </div>
            )}
            <div className="bp-byline-meta">
              {post.author && (
                <span>
                  By <b>{post.author.name}</b>
                  {post.author.role ? ` · ${post.author.role}` : ""}
                </span>
              )}
              <span>
                {formatPublishedAt(post.publishedAt)} · {readMins} min read
              </span>
            </div>
          </div>
        </header>

        {post.heroImage?.asset && (
          <>
            <figure className="bp-hero-media">
              <img
                src={urlFor(post.heroImage).width(2000).fit("max").auto("format").url()}
                alt={post.heroImage.alt ?? post.title}
              />
            </figure>
            {post.heroImage.caption && (
              <div className="bp-hero-caption">{post.heroImage.caption}</div>
            )}
          </>
        )}

        <article className="bp-body">
          <PortableBody value={post.body} />
        </article>

        {post.author && (post.author.role || post.author.photo) && (
          <aside className="bp-author">
            {post.author.photo?.asset && (
              <div className="bp-author-photo">
                <img
                  src={urlFor(post.author.photo).width(160).height(160).fit("crop").url()}
                  alt={post.author.name}
                />
              </div>
            )}
            <div>
              <div className="bp-author-kicker">Written by</div>
              <div className="bp-author-name">{post.author.name}</div>
              {post.author.role && <div className="bp-author-role">{post.author.role}</div>}
            </div>
          </aside>
        )}

        {related.length > 0 && (
          <section className="bp-related">
            <div className="bp-related-title">Related notes</div>
            <div className="bp-related-grid">
              {related.map((r) => (
                <Link key={r._id} href={`/blog/${r.slug}`} className="bl-card">
                  <div className="bl-card-media">
                    {r.heroImage?.asset ? (
                      <img
                        src={urlFor(r.heroImage).width(900).height(675).fit("crop").auto("format").url()}
                        alt={r.heroImage.alt ?? r.title}
                      />
                    ) : (
                      <div className="bl-placeholder">No image</div>
                    )}
                  </div>
                  <div className="bl-card-meta">
                    {r.categories?.[0] && <b>{r.categories[0].title}</b>}
                    <span>{formatPublishedAt(r.publishedAt)}</span>
                  </div>
                  <h3 className="bl-card-title">{r.title}</h3>
                  <p className="bl-card-sub">{r.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <section className="bp-quote-band">
        <div className="bp-quote-inner">
          <div>
            <div className="bp-quote-kicker">§ Need this part?</div>
            <h2 className="bp-quote-head">Send us your spec. We&apos;ll quote it.</h2>
            <p className="bp-quote-sub">
              California Fastener stocks every spec we write about — with mill certificates
              traceable to heat number. Drawings, BOMs, or a sketch on a napkin all work.
            </p>
          </div>
          <div className="bp-quote-actions">
            <Link href="/quote" className="cf-pill cf-pill--blue-light">
              Request a Quote →
            </Link>
            <a href="mailto:info@californiafastener.com" className="bp-quote-email">
              info@californiafastener.com
            </a>
          </div>
        </div>
      </section>

      <CfFooter />
    </>
  );
}
