import { useSyncExternalStore } from "react";

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
  return useSyncExternalStore(
    (cb) => subscribeToMedia(query, cb),
    () => getMediaSnapshot(query),
    getMediaServerSnapshot,
  );
}
