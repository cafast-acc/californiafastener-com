import Image from "next/image";
import Link from "next/link";
import {
  PortableText as Renderer,
  type PortableTextComponents,
  type PortableTextBlock,
} from "@portabletext/react";

import { urlFor } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/lib/types";

// Reject any href that isn't an http(s) URL, a mailto, or a same-origin path.
// Editors enter these by hand, and @portabletext/react does NOT pre-sanitize.
function safeHref(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (
    trimmed.startsWith("https://") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("/") ||
    trimmed.startsWith("#")
  ) {
    return trimmed;
  }
  return null;
}

type InlineImageValue = SanityImage & { caption?: string };

type CtaValue = {
  heading: string;
  body?: string;
  variant?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

type InternalLinkValue = {
  reference?: {
    _ref?: string;
    slug?: { current?: string };
  };
};

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: InlineImageValue }) => {
      if (!value?.asset) return null;
      const src = urlFor(value).width(1600).quality(75).url();
      return (
        <figure>
          <Image
            src={src}
            alt={value.alt ?? ""}
            width={1600}
            height={900}
            sizes="(max-width: 720px) 100vw, 720px"
            quality={75}
            placeholder={value.lqip ? "blur" : "empty"}
            blurDataURL={value.lqip}
          />
          {value.caption ? <figcaption>{value.caption}</figcaption> : null}
        </figure>
      );
    },
    callToAction: ({ value }: { value: CtaValue }) => {
      const href = safeHref(value.buttonHref);
      const label = value.buttonLabel?.trim() || "Request a quote";
      return (
        <div className="bl-cta">
          <div>
            <p className="bl-cta-heading">{value.heading}</p>
            {value.body ? <p className="bl-cta-body">{value.body}</p> : null}
          </div>
          {href ? (
            href.startsWith("/") || href.startsWith("#") ? (
              <Link href={href} className="bl-cta-btn">
                {label}
              </Link>
            ) : (
              <a
                href={href}
                className="bl-cta-btn"
                rel="noopener"
                target={href.startsWith("mailto:") ? undefined : "_blank"}
              >
                {label}
              </a>
            )
          ) : null}
        </div>
      );
    },
  },
  marks: {
    link: ({ value, children }) => {
      const href = safeHref(value?.href);
      if (!href) return <>{children}</>;
      const rel = value?.noFollow ? "nofollow noopener" : "noopener";
      return (
        <a href={href} rel={rel} target="_blank">
          {children}
        </a>
      );
    },
    internalLink: ({ value, children }) => {
      const slug = (value as InternalLinkValue | undefined)?.reference?.slug?.current;
      if (!slug) return <>{children}</>;
      return <Link href={`/blog/${slug}`}>{children}</Link>;
    },
  },
};

export function PortableText({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="bl-body">
      <Renderer value={value} components={components} />
    </div>
  );
}
