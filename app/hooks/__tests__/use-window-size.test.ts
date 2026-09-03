import { act, renderHook } from "@testing-library/react";

import { useWindowSize } from "~/hooks/use-window-size";

describe("useWindowSize", () => {
  it("returns current window dimensions", () => {
    const { result } = renderHook(() => useWindowSize());
    expect(result.current.width).toBe(window.innerWidth);
    expect(result.current.height).toBe(window.innerHeight);
  });

  it("updates on window resize", () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, "innerWidth", { value: 1024 });
      Object.defineProperty(window, "innerHeight", { value: 768 });
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
  });

  it("cleans up event listener on unmount", () => {
    const removeEventListenerSpy = jest.spyOn(
      window,
      "removeEventListener",
    );

    const { unmount } = renderHook(() => useWindowSize());
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );

    removeEventListenerSpy.mockRestore();
  });
});
