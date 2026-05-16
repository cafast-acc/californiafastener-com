import Link from "next/link";

import type { PostCard } from "@/sanity/types";
import { urlForImage } from "@/sanity/lib/image";

function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function ArticleCard({ post }: { post: PostCard }) {
  const accent = post.category?.accent ?? "blue";
  const imgUrl = post.coverImage?.asset
    ? urlForImage(post.coverImage).width(720).height(540).url()
    : null;
  const placeholderLabel = post.category?.title?.toLowerCase() ?? "field notes";

  return (
    <Link href={`/blog/${post.slug}`} className="bl-card">
      <div className={imgUrl ? "bl-card-img" : "bl-card-img bl-card-img--placeholder"}>
        {imgUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imgUrl} alt={post.coverImage?.alt ?? ""} loading="lazy" />
        ) : (
          <span>[ {placeholderLabel} ]</span>
        )}
      </div>
      <div className={`bl-card-cat bl-card-cat--${accent}`}>
        {post.category?.title ?? "Field Notes"}
      </div>
      <h4 className="bl-card-title">{post.title}</h4>
      <p className="bl-card-excerpt">{post.excerpt}</p>
      <div className="bl-card-meta">
        <span>{fmtDate(post.publishedAt)}</span>
        {post.readingMinutes ? <span>{post.readingMinutes} min</span> : null}
      </div>
    </Link>
  );
}
