import Link from "next/link";
import { PortableText as PT, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";

import { urlForImage } from "@/sanity/lib/image";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const url = urlForImage(value).width(1400).url();
      return (
        <figure className="bl-prose-figure">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={value.alt ?? ""} loading="lazy" />
          {value.caption ? <figcaption>{value.caption}</figcaption> : null}
        </figure>
      );
    },
    callToAction: ({ value }) => {
      const variant = value?.variant ?? "light";
      return (
        <aside className={`bl-cta bl-cta--${variant}`}>
          <div>
            <h4>{value.heading}</h4>
            {value.body ? <p>{value.body}</p> : null}
          </div>
          {value.ctaLabel && value.ctaHref ? (
            <Link href={value.ctaHref} className="cf-pill cf-pill--blue">
              {value.ctaLabel}
            </Link>
          ) : null}
        </aside>
      );
    },
    linkedProduct: ({ value }) => {
      if (!value?.href || !value?.title) return null;
      const img = value.image;
      const url = img?.asset ? urlForImage(img).width(720).height(540).url() : null;
      return (
        <Link href={value.href} className="bl-prose-product">
          {url ? (
            <div className="bl-prose-product-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={img?.alt ?? value.title} />
            </div>
          ) : null}
          <div>
            {value.kicker ? <div className="bl-prose-product-kicker">{value.kicker}</div> : null}
            <div className="bl-prose-product-title">{value.title}</div>
            {value.blurb ? <p>{value.blurb}</p> : null}
          </div>
        </Link>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href ?? "#";
      const isExternal = /^https?:\/\//.test(href);
      const target = value?.newTab ? "_blank" : undefined;
      if (isExternal) {
        return (
          <a href={href} target={target} rel={target ? "noopener noreferrer" : undefined}>
            {children}
          </a>
        );
      }
      return (
        <Link href={href} target={target}>
          {children}
        </Link>
      );
    },
    code: ({ children }) => <code className="bl-prose-code">{children}</code>,
  },
  block: {
    h2: ({ children }) => <h2 className="bl-prose-h2">{children}</h2>,
    h3: ({ children }) => <h3 className="bl-prose-h3">{children}</h3>,
    blockquote: ({ children }) => <blockquote className="bl-prose-quote">{children}</blockquote>,
    normal: ({ children }) => <p className="bl-prose-p">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="bl-prose-ul">{children}</ul>,
    number: ({ children }) => <ol className="bl-prose-ol">{children}</ol>,
  },
};

export function PortableText({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="bl-prose">
      <PT value={value} components={components} />
    </div>
  );
}
