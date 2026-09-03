import { act, renderHook } from "@testing-library/react";

import { useMediaQuery } from "~/hooks/use-media-query";

function createMediaQueryList(matches: boolean) {
  return {
    matches,
    media: "",
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    dispatchEvent: jest.fn(),
  } as unknown as MediaQueryList;
}

describe("useMediaQuery", () => {
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: originalMatchMedia,
    });
  });

  it("returns false when media query does not match", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockReturnValue(createMediaQueryList(false)),
    });
    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));
    expect(result.current).toBe(false);
  });

  it("returns true when media query matches", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockReturnValue(createMediaQueryList(true)),
    });
    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));
    expect(result.current).toBe(true);
  });

  it("updates when media query match changes", () => {
    const mql = createMediaQueryList(false);
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockReturnValue(mql),
    });

    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));
    expect(result.current).toBe(false);

    const changeHandler = (mql.addEventListener as jest.Mock).mock.calls.find(
      (call: unknown[]) => call[0] === "change",
    )?.[1];

    expect(changeHandler).toBeDefined();

    (mql as unknown as { matches: boolean }).matches = true;
    act(() => {
      changeHandler!();
    });

    expect(result.current).toBe(true);
  });

  it("cleans up event listener on unmount", () => {
    const mql = createMediaQueryList(false);
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockReturnValue(mql),
    });

    const { unmount } = renderHook(() => useMediaQuery("(min-width: 768px)"));

    unmount();

    expect(mql.removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
  });
});
