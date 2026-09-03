import { act, renderHook } from "@testing-library/react";

import { useDebounce } from "~/hooks/use-debounce";

describe("useDebounce", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("hello", 500));
    expect(result.current).toBe("hello");
  });

  it("debounces value updates", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "hello", delay: 500 } },
    );

    rerender({ value: "world", delay: 500 });
    expect(result.current).toBe("hello");

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe("world");
  });

  it("cancels pending update on unmount", () => {
    const { result, rerender, unmount } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "hello", delay: 500 } },
    );

    rerender({ value: "world", delay: 500 });
    unmount();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe("hello");
  });

  it("resets timer on rapid changes", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "a", delay: 500 } },
    );

    rerender({ value: "b", delay: 500 });
    act(() => {
      jest.advanceTimersByTime(300);
    });

    rerender({ value: "c", delay: 500 });
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe("a");

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe("c");
  });
});
