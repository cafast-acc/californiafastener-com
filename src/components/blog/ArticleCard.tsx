import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import type { PostCard } from "@/sanity/lib/types";

// Category → color modifier. Per design/blog.html + design handoff README:
// only Spec & Compliance gets purple, only Case Studies gets mid; everything
// else (including CNC Machining) uses the default steel-blue. Match on slug.
const CAT_COLOR_BY_SLUG: Record<string, "purple" | "mid"> = {
  "spec-compliance": "purple",
  "spec-and-compliance": "purple",
  "case-studies": "mid",
  "case-study": "mid",
};

function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function estimateMinutes(post: PostCard): number | null {
  // No body in the listing projection; fall back to excerpt length as a
  // very rough proxy so we can show something. Returns null if we have
  // nothing to estimate from.
  if (!post.excerpt) return null;
  const words = post.excerpt.trim().split(/\s+/).length;
  // Listings show *post* read time, but we only have excerpt here — assume
  // articles are ~5x the excerpt length on average. Clamped 3-15 min.
  return Math.min(15, Math.max(3, Math.round((words * 5) / 225)));
}

export function ArticleCard({ post }: { post: PostCard }) {
  const cover = post.coverImage;
  const coverUrl = cover?.asset?._ref ? urlFor(cover).width(800).quality(75).url() : null;
  const primaryCat = post.categories?.[0];
  const catColor = primaryCat ? CAT_COLOR_BY_SLUG[primaryCat.slug] : undefined;
  const minutes = estimateMinutes(post);

  return (
    <Link href={`/blog/${post.slug}`} className="bl-article-card">
      {coverUrl ? (
        <div className="bl-article-img">
          <Image
            src={coverUrl}
            alt={cover?.alt ?? post.title}
            width={800}
            height={600}
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
            quality={75}
            placeholder={cover?.lqip ? "blur" : "empty"}
            blurDataURL={cover?.lqip}
          />
        </div>
      ) : (
        <div className="bl-article-img is-placeholder">[ no image ]</div>
      )}
      {primaryCat ? (
        <div className={"bl-article-cat" + (catColor ? " is-" + catColor : "")}>
          {primaryCat.title}
        </div>
      ) : null}
      <h4>{post.title}</h4>
      {post.excerpt ? <p>{post.excerpt}</p> : null}
      <div className="bl-article-meta">
        <span>{formatShortDate(post.publishedAt)}</span>
        {minutes ? <span>{minutes} min</span> : null}
      </div>
    </Link>
  );
}
