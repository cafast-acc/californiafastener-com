import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import type { LinkedProduct } from "@/sanity/lib/types";

export function LinkedProductCard({ product }: { product: LinkedProduct }) {
  // Only same-origin paths — the schema validates this, but defend in depth.
  const href = product.path.startsWith("/") ? product.path : null;
  const thumb = product.image
    ? urlFor(product.image).width(128).height(128).quality(75).url()
    : null;

  const inner = (
    <>
      <div className="bl-product-thumb">
        {thumb ? (
          <Image
            src={thumb}
            alt={product.image?.alt ?? product.name}
            width={64}
            height={64}
            quality={75}
          />
        ) : null}
      </div>
      <div className="bl-product-info">
        <span className="bl-product-name">{product.name}</span>
        {product.shortDescription ? (
          <span className="bl-product-desc">{product.shortDescription}</span>
        ) : null}
      </div>
    </>
  );

  if (!href) {
    return <div className="bl-product-card">{inner}</div>;
  }
  return (
    <Link href={href} className="bl-product-card">
      {inner}
    </Link>
  );
}
