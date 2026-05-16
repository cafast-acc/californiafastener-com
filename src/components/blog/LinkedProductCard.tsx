import Link from "next/link";

import { urlForImage } from "@/sanity/lib/image";
import type { LinkedProduct } from "@/sanity/types";

export function LinkedProductCard({ product }: { product: LinkedProduct }) {
  const img = product.image;
  const url = img?.asset ? urlForImage(img).width(560).height(420).url() : null;
  return (
    <Link href={product.href} className="bl-product">
      <div className={url ? "bl-product-img" : "bl-product-img bl-product-img--placeholder"}>
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt={img?.alt ?? product.title} />
        ) : (
          <span>[ {product.title.toLowerCase()} ]</span>
        )}
      </div>
      {product.kicker ? <div className="bl-product-kicker">{product.kicker}</div> : null}
      <div className="bl-product-title">{product.title}</div>
      {product.blurb ? <p className="bl-product-blurb">{product.blurb}</p> : null}
      <span className="bl-product-arrow" aria-hidden="true">
        →
      </span>
    </Link>
  );
}
