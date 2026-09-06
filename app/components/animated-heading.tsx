import { motion } from "motion/react";
import type { ReactNode } from "react";

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
  eager?: boolean;
};

export function MaskedImage({
  src,
  alt,
  className,
  delay = 0,
  eager = false,
}: MaskedImageProps) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, delay, ease: [...EASE] }}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        loading={eager ? "eager" : "lazy"}
      />
    </motion.div>
  );
}
