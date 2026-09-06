import { useCallback, useSyncExternalStore } from "react";

function getMediaSnapshot(query: string) {
  if (typeof window === "undefined") return false;
  return window.matchMedia(query).matches;
}

function getMediaServerSnapshot() {
  return false;
}

function subscribeToMedia(query: string, callback: () => void) {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

export function useMediaQuery(query: string): boolean {
  // useSyncExternalStore requires stable subscribe/getSnapshot identities
  // (CONSTRAINTS.md 1.3); inline closures would resubscribe every render.
  const subscribe = useCallback(
    (cb: () => void) => subscribeToMedia(query, cb),
    [query],
  );
  const getSnapshot = useCallback(() => getMediaSnapshot(query), [query]);
  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    getMediaServerSnapshot,
  );
}
