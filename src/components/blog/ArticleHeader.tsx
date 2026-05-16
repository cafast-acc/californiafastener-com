import Link from "next/link";

import { urlForImage } from "@/sanity/lib/image";
import type { PostFull } from "@/sanity/types";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function ArticleHeader({ post }: { post: PostFull }) {
  const cover = post.coverImage;
  const coverUrl = cover?.asset ? urlForImage(cover).width(1800).height(1100).url() : null;

  return (
    <header className="bl-article-header">
      <div className="bl-article-crumbs">
        <Link href="/blog">Field Notes</Link>
        <span aria-hidden="true">›</span>
        {post.category ? (
          <Link href={`/blog?category=${post.category.slug}`}>{post.category.title}</Link>
        ) : null}
      </div>
      <h1 className="bl-article-title">{post.title}</h1>
      <p className="bl-article-dek">{post.excerpt}</p>
      <div className="bl-article-byline">
        {post.author?.name ? <span>By {post.author.name}</span> : null}
        <span>{fmtDate(post.publishedAt)}</span>
        {post.readingMinutes ? <span>{post.readingMinutes} min read</span> : null}
      </div>
      {coverUrl ? (
        <div className="bl-article-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coverUrl} alt={cover?.alt ?? post.title} />
        </div>
      ) : null}
    </header>
  );
}
