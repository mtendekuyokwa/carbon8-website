import { useEffect, useRef, useState } from "react";

import type { RefObject } from "react";

type UseIntersectionObserverOptions = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
};

export function useIntersectionObserver<T extends Element>(
  options: UseIntersectionObserverOptions = {},
): [RefObject<T | null>, IntersectionObserverEntry | undefined] {
  const { root = null, rootMargin, threshold, triggerOnce = false } = options;
  const ref = useRef<T | null>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([e]) => {
        setEntry(e);
        if (triggerOnce && e.isIntersecting) {
          observer.disconnect();
        }
      },
      { root, rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [root, rootMargin, threshold, triggerOnce]);

  return [ref, entry];
}
