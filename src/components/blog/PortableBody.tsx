import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";
import { urlFor } from "@/sanity/image";
import type { SanityImage } from "@/lib/blog/types";

type CalloutValue = {
  _type: "callout";
  tone?: "note" | "spec" | "warning";
  title?: string;
  body?: string;
};

type LinkMark = { _type: "link"; href: string };

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImage }) => {
      if (!value?.asset) return null;
      const url = urlFor(value).width(1400).fit("max").auto("format").url();
      return (
        <figure>
          <img src={url} alt={value.alt ?? ""} loading="lazy" />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      );
    },
    callout: ({ value }: { value: CalloutValue }) => {
      const tone = value.tone ?? "note";
      const label = tone === "warning" ? "Warning" : tone === "spec" ? "Spec note" : "Note";
      return (
        <aside className={`bp-callout bp-callout--${tone}`}>
          <div className="bp-callout-label">{label}</div>
          {value.title && <div className="bp-callout-title">{value.title}</div>}
          {value.body && <p className="bp-callout-body">{value.body}</p>}
        </aside>
      );
    },
  },
  marks: {
    link: ({ value, children }: { value?: LinkMark; children: React.ReactNode }) => {
      if (!value?.href) return <>{children}</>;
      const external = /^https?:\/\//.test(value.href);
      return (
        <a
          href={value.href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
    code: ({ children }) => <code>{children}</code>,
  },
};

export function PortableBody({ value }: { value: PortableTextBlock[] | undefined }) {
  if (!value || value.length === 0) return null;
  return <PortableText value={value} components={components} />;
}
