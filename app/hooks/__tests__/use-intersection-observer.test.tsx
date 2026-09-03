import { render } from "@testing-library/react";

import { useIntersectionObserver } from "~/hooks/use-intersection-observer";

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  root: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  callback: IntersectionObserverCallback;
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit,
  ) {
    this.callback = callback;
    this.root = (options?.root as Element | null) ?? null;
    this.rootMargin = options?.rootMargin;
    this.threshold = options?.threshold;
    MockIntersectionObserver.instances.push(this);
  }
}

describe("useIntersectionObserver", () => {
  beforeEach(() => {
    MockIntersectionObserver.instances = [];
    global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
  });

  afterEach(() => {
    global.IntersectionObserver = undefined as unknown as typeof IntersectionObserver;
  });

  function TestComponent(options: Parameters<typeof useIntersectionObserver>[0]) {
    const [ref] = useIntersectionObserver<HTMLDivElement>(options);
    return <div ref={ref} data-testid="target" />;
  }

  it("creates an IntersectionObserver when element is mounted", () => {
    render(<TestComponent />);
    expect(MockIntersectionObserver.instances).toHaveLength(1);
  });

  it("observes the target element", () => {
    const { getByTestId } = render(<TestComponent />);
    const target = getByTestId("target");
    const instance = MockIntersectionObserver.instances[0];
    expect(instance.observe).toHaveBeenCalledWith(target);
  });

  it("disconnects on unmount", () => {
    const { unmount } = render(<TestComponent />);
    const instance = MockIntersectionObserver.instances[0];
    unmount();
    expect(instance.disconnect).toHaveBeenCalled();
  });

  it("passes options to IntersectionObserver", () => {
    const root = document.createElement("div");
    render(
      <TestComponent root={root} rootMargin="10px" threshold={0.5} />,
    );

    const instance = MockIntersectionObserver.instances[0];
    expect(instance.root).toBe(root);
    expect(instance.rootMargin).toBe("10px");
    expect(instance.threshold).toBe(0.5);
  });

  it("invokes callback and disconnects when triggerOnce", () => {
    render(<TestComponent triggerOnce />);

    const instance = MockIntersectionObserver.instances[0];
    const entry = { isIntersecting: true } as IntersectionObserverEntry;
    instance.callback([entry], instance as unknown as IntersectionObserver);

    expect(instance.disconnect).toHaveBeenCalled();
  });
});
