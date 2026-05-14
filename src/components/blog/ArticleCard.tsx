import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import type { PostCard } from "@/sanity/lib/types";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function ArticleCard({
  post,
  featured = false,
}: {
  post: PostCard;
  featured?: boolean;
}) {
  const cover = post.coverImage;
  const coverUrl = cover
    ? urlFor(cover).width(featured ? 1200 : 800).quality(75).url()
    : null;

  return (
    <article className={"bl-card" + (featured ? " bl-card-featured" : "")}>
      <Link href={`/blog/${post.slug}`} className="bl-card-link">
        {coverUrl ? (
          <div className="bl-card-cover">
            <Image
              src={coverUrl}
              alt={cover?.alt ?? post.title}
              width={featured ? 1200 : 800}
              height={featured ? 750 : 500}
              sizes={featured ? "(max-width: 980px) 100vw, 600px" : "(max-width: 640px) 100vw, (max-width: 980px) 50vw, 360px"}
              quality={75}
              placeholder={cover?.lqip ? "blur" : "empty"}
              blurDataURL={cover?.lqip}
            />
          </div>
        ) : null}
        <div>
          {post.categories && post.categories.length > 0 ? (
            <div className="bl-card-cats">
              {post.categories.map((c) => (
                <span key={c.slug} className="bl-card-cat">
                  {c.title}
                </span>
              ))}
            </div>
          ) : null}
          <h3 className="bl-card-title">{post.title}</h3>
          {post.excerpt ? <p className="bl-card-excerpt">{post.excerpt}</p> : null}
          <div className="bl-card-meta">
            {post.author?.name ? <span>{post.author.name}</span> : null}
            {post.author?.name ? <span className="dot">·</span> : null}
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          </div>
        </div>
      </Link>
    </article>
  );
}
