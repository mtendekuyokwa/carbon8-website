import { fireEvent, render, screen } from "@testing-library/react";

import { HeroSection } from "~/features/home/components/hero-section";

jest.mock("react-router", () => ({
  Link: ({
    to,
    children,
    ...rest
  }: {
    to: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
}));

function mockMatchMedia(matches: boolean) {
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
}

beforeEach(() => {
  mockMatchMedia(false);
});

describe("HeroSection", () => {
  it("renders mission heading with primary and secondary actions", () => {
    render(<HeroSection />);

    expect(
      screen.getByRole("heading", {
        name: "Climate Action Led by Communities",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Get in Touch/ }),
    ).toHaveAttribute("href", "mailto:openbasedigital@gmail.com");
    expect(screen.getByRole("link", { name: /Contribute/ })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  it("advances the slide when Next is clicked", async () => {
    render(<HeroSection />);

    expect(screen.getByText("01")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText("02")).toBeInTheDocument();
  });

  it("hides the secondary Contribute action on mobile", () => {
    render(<HeroSection />);

    expect(screen.getByRole("link", { name: /Contribute/ })).toHaveClass(
      "hidden",
      "md:flex",
    );
  });

  it("serves full-resolution slides with no downscaled srcset", () => {
    const { container } = render(<HeroSection />);

    const img = container.querySelector(
      'img[src="/assets/smoke-coming-up-1920.jpg"]',
    );
    expect(img).not.toBeNull();
    expect(img?.getAttribute("srcset")).toBeNull();
  });

  it("renders dot indicators that jump to a slide", () => {
    render(<HeroSection />);

    const dots = screen.getByRole("group", { name: "Hero slides" });
    expect(dots).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Show slide 3" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Show slide 3" }));
    expect(screen.getByText("03")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Show slide 3" }),
    ).toHaveAttribute("aria-current", "true");
  });

  it("does not auto-advance when reduced motion is preferred", () => {
    mockMatchMedia(true);
    jest.useFakeTimers();
    try {
      render(<HeroSection />);
      expect(screen.getByText("01")).toBeInTheDocument();
      jest.advanceTimersByTime(12000);
      expect(screen.getByText("01")).toBeInTheDocument();
    } finally {
      jest.useRealTimers();
    }
  });
});
