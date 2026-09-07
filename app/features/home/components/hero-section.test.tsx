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
      "/contribute",
    );
  });

  it("advances the slide when Next is clicked", async () => {
    render(<HeroSection />);

    expect(screen.getByText("01")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText("02")).toBeInTheDocument();
  });
});
