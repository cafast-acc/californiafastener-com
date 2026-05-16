"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useMemo } from "react";

import { urlForImage } from "@/sanity/lib/image";
import type { CategoryRef, PostCard } from "@/sanity/types";

import { ArticleCard } from "./ArticleCard";

type Props = {
  posts: PostCard[];
  categories: CategoryRef[];
  featured: PostCard | null;
};

export function BlogContent({ posts, categories, featured }: Props) {
  const params = useSearchParams();
  const active = params.get("category") ?? "all";

  const visible = useMemo(() => {
    if (active === "all") return posts;
    return posts.filter((p) => p.category?.slug === active);
  }, [posts, active]);

  return (
    <>
      <div className="bl-cat-bar" role="tablist" aria-label="Article categories">
        <CategoryPill href="/blog" label="All" active={active === "all"} />
        {categories.map((cat) => (
          <CategoryPill
            key={cat._id}
            href={`/blog?category=${cat.slug}`}
            label={cat.title}
            active={active === cat.slug}
          />
        ))}
      </div>

      {featured && active === "all" ? <Featured post={featured} /> : null}

      <section className="bl-articles">
        <div className="bl-articles-head">
          <h3>{active === "all" ? "Latest articles" : labelFor(active, categories)}</h3>
          <div className="bl-sort">Sort: Most recent ›</div>
        </div>
        {visible.length === 0 ? (
          <div className="bl-empty">No articles in this category yet.</div>
        ) : (
          <div className="bl-grid">
            {visible.map((post) => (
              <ArticleCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function CategoryPill({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={active ? "bl-pill bl-pill--active" : "bl-pill"}
      role="tab"
      aria-selected={active}
      scroll={false}
    >
      {label}
    </Link>
  );
}

function labelFor(slug: string, categories: CategoryRef[]) {
  return categories.find((c) => c.slug === slug)?.title ?? "Latest articles";
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function Featured({ post }: { post: PostCard }) {
  const img = post.coverImage;
  const imgUrl = img?.asset ? urlForImage(img).width(1200).height(960).url() : null;
  return (
    <section className="bl-featured">
      <div className="bl-featured-grid">
        {imgUrl ? (
          <div className="bl-featured-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imgUrl} alt={img?.alt ?? post.title} />
          </div>
        ) : (
          <div className="bl-featured-img bl-featured-img--placeholder">
            <span>[ {post.category?.title?.toLowerCase() ?? "feature photo"} ]</span>
          </div>
        )}
        <div>
          <div className="bl-featured-kicker">
            Featured · {post.category?.title ?? "Field Notes"}
          </div>
          <h2 className="bl-featured-title">{post.title}</h2>
          <p className="bl-featured-dek">{post.excerpt}</p>
          <div className="bl-featured-meta">
            {post.author?.name ? `By ${post.author.name} · ` : null}
            {fmtDate(post.publishedAt)}
            {post.readingMinutes ? ` · ${post.readingMinutes} min read` : null}
          </div>
          <Link href={`/blog/${post.slug}`} className="cf-link">
            Read article
          </Link>
        </div>
      </div>
    </section>
  );
}
