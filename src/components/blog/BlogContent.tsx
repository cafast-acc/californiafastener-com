"use client";

// Interactive parts of /blog, split so the pill bar can live inside .bl-hero
// while the featured article + article grid render as separate full-bleed
// sections below the hero. Both components read ?category=<slug> from the
// URL via useSearchParams, so they stay in sync without prop drilling.
//
// Filtering is client-side — the page already has all posts in memory.
// The featured article is NOT filtered (per design handoff README).

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useTransition } from "react";

import { ArticleCard } from "@/components/blog/ArticleCard";
import { urlFor } from "@/sanity/lib/image";
import type { CategoryRef, PostCard } from "@/sanity/lib/types";

const ALL = "all";

function useActiveCategory(): [string, (slug: string) => void] {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const active = searchParams.get("category") ?? ALL;

  function setActive(slug: string) {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (slug === ALL) params.delete("category");
      else params.set("category", slug);
      const qs = params.toString();
      router.replace(qs ? `/blog?${qs}` : "/blog", { scroll: false });
    });
  }

  return [active, setActive];
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

export function CategoryPills({ categories }: { categories: CategoryRef[] }) {
  const [active, setActive] = useActiveCategory();
  return (
    <div className="bl-cat-bar" role="toolbar" aria-label="Filter by category">
      <button
        type="button"
        className={"bl-cat-pill" + (active === ALL ? " is-active" : "")}
        aria-pressed={active === ALL}
        onClick={() => setActive(ALL)}
      >
        All
      </button>
      {categories.map((c) => (
        <button
          key={c.slug}
          type="button"
          className={"bl-cat-pill" + (active === c.slug ? " is-active" : "")}
          aria-pressed={active === c.slug}
          onClick={() => setActive(c.slug)}
        >
          {c.title}
        </button>
      ))}
    </div>
  );
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

export function PostsList({ posts }: { posts: PostCard[] }) {
  const [active, setActive] = useActiveCategory();

  const [featured, rest] = useMemo(() => {
    if (posts.length === 0) return [undefined, [] as PostCard[]] as const;
    return [posts[0], posts.slice(1)] as const;
  }, [posts]);

  const filteredRest = useMemo(() => {
    if (active === ALL) return rest;
    return rest.filter((p) => p.categories?.some((c) => c.slug === active));
  }, [rest, active]);

  if (posts.length === 0) {
    return <div className="bl-empty">No posts yet — check back soon.</div>;
  }

  return (
    <>
      {featured ? <FeaturedArticle post={featured} /> : null}

      <section className="bl-articles">
        <div className="bl-articles-head">
          <h3>Latest articles</h3>
          <div className="bl-sort">Sort: Most recent</div>
        </div>
        {filteredRest.length === 0 ? (
          <div className="bl-filter-empty">
            <p>No articles in this category yet.</p>
            <button
              type="button"
              className="cf-link"
              onClick={() => setActive(ALL)}
            >
              Show all
            </button>
          </div>
        ) : (
          <div className="bl-article-grid">
            {filteredRest.map((post) => (
              <ArticleCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
