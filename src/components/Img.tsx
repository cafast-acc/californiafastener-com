"use client";

/**
 * Plain <img> with an onError fallback that hides the element on failure.
 * Mirrors the design's pattern: cream-bg image beds (--cf-bg-cream) show through
 * when an image fails, so a broken icon never appears.
 *
 * This is a client component so onError can run in the browser; we'll swap to
 * next/image when we replace placeholder URLs with owned, licensed assets.
 */
type Props = React.ImgHTMLAttributes<HTMLImageElement>;

export function Img(props: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt=""
      {...props}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.display = "none";
        props.onError?.(e);
      }}
    />
  );
}
