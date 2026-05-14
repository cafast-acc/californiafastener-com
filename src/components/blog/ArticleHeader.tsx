import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";
import type { PostDetail } from "@/sanity/lib/types";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function ArticleHeader({
  post,
  readingMinutes,
}: {
  post: PostDetail;
  readingMinutes: number;
}) {
  const author = post.author;
  const avatarUrl = author?.image
    ? urlFor(author.image).width(72).height(72).quality(75).url()
    : null;
  const cover = post.coverImage;
  const coverUrl = cover ? urlFor(cover).width(1600).quality(75).url() : null;

  return (
    <header className="bl-article-hero">
      {post.categories && post.categories.length > 0 ? (
        <div className="bl-article-cats">
          {post.categories.map((c) => (
            <span key={c.slug} className="bl-card-cat">
              {c.title}
            </span>
          ))}
        </div>
      ) : null}

      <h1 className="bl-article-title">{post.title}</h1>
      {post.excerpt ? <p className="bl-article-excerpt">{post.excerpt}</p> : null}

      <div className="bl-article-byline">
        <div className="bl-byline-avatar">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={author?.image?.alt ?? author?.name ?? ""}
              width={36}
              height={36}
              quality={75}
            />
          ) : null}
        </div>
        <div className="bl-byline-meta">
          <span className="bl-byline-name">{author?.name ?? "California Fastener"}</span>
          {author?.role ? <span className="bl-byline-role">{author.role}</span> : null}
        </div>
        <div className="bl-byline-spacer" />
        <time className="bl-byline-date" dateTime={post.publishedAt}>
          {formatDate(post.publishedAt)}
        </time>
        <span className="bl-byline-reading">{readingMinutes} min read</span>
      </div>

      {coverUrl ? (
        <div className="bl-article-cover">
          <Image
            src={coverUrl}
            alt={cover?.alt ?? post.title}
            width={1600}
            height={900}
            sizes="(max-width: 720px) 100vw, 720px"
            quality={75}
            priority
            placeholder={cover?.lqip ? "blur" : "empty"}
            blurDataURL={cover?.lqip}
          />
        </div>
      ) : null}
    </header>
  );
}
