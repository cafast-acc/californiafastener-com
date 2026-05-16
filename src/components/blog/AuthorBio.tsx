import { urlForImage } from "@/sanity/lib/image";
import type { AuthorRef } from "@/sanity/types";

export function AuthorBio({ author }: { author: AuthorRef }) {
  const img = author.image;
  const url = img?.asset ? urlForImage(img).width(160).height(160).url() : null;
  return (
    <aside className="bl-bio">
      <div className="bl-bio-avatar">
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt={img?.alt ?? author.name} />
        ) : (
          <span aria-hidden="true">{author.name.charAt(0)}</span>
        )}
      </div>
      <div className="bl-bio-text">
        <div className="bl-bio-name">{author.name}</div>
        {author.role ? <div className="bl-bio-role">{author.role}</div> : null}
        {author.bio ? <p className="bl-bio-blurb">{author.bio}</p> : null}
      </div>
    </aside>
  );
}
