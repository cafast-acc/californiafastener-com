import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";
import type { AuthorFull } from "@/sanity/lib/types";

export function AuthorBio({ author }: { author?: AuthorFull }) {
  if (!author) return null;
  const avatarUrl = author.image
    ? urlFor(author.image).width(112).height(112).quality(75).url()
    : null;
  return (
    <aside className="bl-author-bio">
      <div className="bl-author-avatar">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={author.image?.alt ?? author.name}
            width={56}
            height={56}
            quality={75}
          />
        ) : null}
      </div>
      <div>
        <div className="bl-author-name">{author.name}</div>
        {author.role ? <div className="bl-author-role">{author.role}</div> : null}
        {author.bio ? <p className="bl-author-bio-text">{author.bio}</p> : null}
      </div>
    </aside>
  );
}
