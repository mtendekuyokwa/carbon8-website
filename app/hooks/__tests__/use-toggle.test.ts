import { act, renderHook } from "@testing-library/react";

import { useToggle } from "~/hooks/use-toggle";

describe("useToggle", () => {
  it("returns false by default", () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBe(false);
  });

  it("accepts initial value", () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current[0]).toBe(true);
  });

  it("toggles value", () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(false);
  });

  it("sets value explicitly", () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current[2](true);
    });
    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[2](false);
    });
    expect(result.current[0]).toBe(false);
  });
});
