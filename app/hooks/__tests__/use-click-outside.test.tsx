import { fireEvent, render } from "@testing-library/react";
import { createRef } from "react";

import { useClickOutside } from "~/hooks/use-click-outside";

describe("useClickOutside", () => {
  it("calls handler when clicking outside the ref element", () => {
    const handler = jest.fn();

    function TestComponent() {
      const ref = createRef<HTMLDivElement>();
      useClickOutside(ref, handler);
      return (
        <div>
          <div ref={ref} data-testid="inside">
            inside
          </div>
          <div data-testid="outside">outside</div>
        </div>
      );
    }

    const { getByTestId } = render(<TestComponent />);
    fireEvent.mouseDown(getByTestId("outside"));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("does not call handler when clicking inside the ref element", () => {
    const handler = jest.fn();

    function TestComponent() {
      const ref = createRef<HTMLDivElement>();
      useClickOutside(ref, handler);
      return (
        <div ref={ref} data-testid="inside">
          inside
        </div>
      );
    }

    const { getByTestId } = render(<TestComponent />);
    fireEvent.mouseDown(getByTestId("inside"));
    expect(handler).not.toHaveBeenCalled();
  });

  it("cleans up event listeners on unmount", () => {
    const handler = jest.fn();
    const removeEventListenerSpy = jest.spyOn(
      document,
      "removeEventListener",
    );

    function TestComponent() {
      const ref = createRef<HTMLDivElement>();
      useClickOutside(ref, handler);
      return <div ref={ref}>inside</div>;
    }

    const { unmount } = render(<TestComponent />);
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function),
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "touchstart",
      expect.any(Function),
    );

    removeEventListenerSpy.mockRestore();
  });
});
