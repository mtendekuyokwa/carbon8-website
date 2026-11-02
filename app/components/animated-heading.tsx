import { motion, useInView } from "motion/react";
import { useRef } from "react";
import type { ImgHTMLAttributes, ReactNode } from "react";

import { ResponsivePicture } from "~/components/responsive-picture";
import { cn } from "~/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type HeadingTag = "h1" | "h2" | "h3" | "h4";

type AnimatedHeadingProps = {
  children: ReactNode;
  className?: string;
  as?: HeadingTag;
  delay?: number;
};

export function AnimatedHeading({
  children,
  className,
  as = "h2",
  delay = 0,
}: AnimatedHeadingProps) {
  const MotionTag =
    as === "h1"
      ? motion.h1
      : as === "h3"
        ? motion.h3
        : as === "h4"
          ? motion.h4
          : motion.h2;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [...EASE] }}
    >
      {children}
    </MotionTag>
  );
}

type AnimatedTextProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function AnimatedText({
  children,
  className,
  delay = 0.15,
}: AnimatedTextProps) {
  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [...EASE] }}
    >
      {children}
    </motion.p>
  );
}

type MaskedImageProps = {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  /** Extra props for the inner <img> — e.g. a className with `object-top`. */
  imgProps?: Omit<
    ImgHTMLAttributes<HTMLImageElement>,
    "src" | "alt" | "loading" | "decoding"
  >;
};

/**
 * Clip-wipe image reveal. The wipe lives on an inner motion.div while the
 * IntersectionObserver runs on the *unclipped* outer wrapper: a fully-inset
 * clip-path collapses the observed element's intersection rect to 0x0 on
 * narrow layouts (Android/WebKit geometry), so `whileInView` never fires and
 * native `loading="lazy"` never starts on an image under a zero-area
 * ancestor. The image therefore loads eagerly (it is hidden by the clip
 * anyway) and the reveal is triggered by the outer wrapper's intersection.
 */
export function MaskedImage({
  src,
  alt,
  className,
  delay = 0,
  imgProps,
}: MaskedImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const { className: innerImgClass, ...innerProps } = imgProps ?? {};
  return (
    <motion.div ref={ref} className={className}>
      <motion.div
        className="size-full"
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={inView ? { clipPath: "inset(0% 0 0 0)" } : undefined}
        transition={{ duration: 1.1, delay, ease: [...EASE] }}
      >
        <ResponsivePicture
          src={src}
          alt={alt}
          className={cn("size-full object-cover", innerImgClass)}
          loading="eager"
          decoding="async"
          {...innerProps}
        />
      </motion.div>
    </motion.div>
  );
}
