import { useEffect, useRef } from "react";

import type { RefObject } from "react";

export function useClickOutside<T extends Element>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void,
): void {
  // Mirror the latest handler so the subscription effect stays stable and
  // callers are not forced to useCallback (CONSTRAINTS.md 2).
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    function listener(event: MouseEvent | TouchEvent) {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handlerRef.current(event);
    }

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref]);
}
