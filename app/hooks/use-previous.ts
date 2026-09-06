import { useEffect, useRef } from "react";

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  // Sanctioned render-time ref read (CONSTRAINTS.md 2): read-only here, the
  // write is deferred to the effect above so render stays pure.
  // eslint-disable-next-line react-hooks/refs -- intentional usePrevious pattern
  return ref.current;
}
