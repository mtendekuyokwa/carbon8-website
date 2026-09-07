import type { ImgHTMLAttributes } from "react";

type ResponsivePictureProps = {
  /** JPEG fallback src — a `.webp` twin must exist next to it. */
  src: string;
  srcSet?: string;
  sizes?: string;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "sizes">;

function toWebp(candidate: string, descriptor?: string): string | null {
  // Convention: every image rendered through ResponsivePicture ships a
  // `.webp` twin next to the original (jpg/jpeg/png).
  const webp = candidate.replace(/\.(jpe?g|png)$/i, ".webp");
  if (webp === candidate) return null;
  return descriptor ? `${webp} ${descriptor}` : webp;
}

/** Derive the WebP `srcset` twin of a `src`/`srcSet` pair. */
export function webpSrcSetFor(src: string, srcSet?: string): string | undefined {
  const parts: string[] = [];
  if (srcSet) {
    for (const entry of srcSet.split(",")) {
      const [url, descriptor] = entry.trim().split(/\s+/);
      if (!url) continue;
      const converted = toWebp(url, descriptor);
      if (converted) parts.push(converted);
    }
  } else {
    const converted = toWebp(src);
    if (converted) parts.push(converted);
  }
  return parts.length > 0 ? parts.join(", ") : undefined;
}

/**
 * `<picture>` serving WebP first with the original as fallback.
 * All layout/behaviour props land on the inner `<img>`.
 */
export function ResponsivePicture({
  src,
  srcSet,
  sizes,
  ...imgProps
}: ResponsivePictureProps) {
  const webpSrcSet = webpSrcSetFor(src, srcSet);
  return (
    <picture>
      {webpSrcSet ? (
        <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      ) : null}
      <img src={src} srcSet={srcSet} sizes={sizes} {...imgProps} />
    </picture>
  );
}
