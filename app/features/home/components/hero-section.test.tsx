import { render, screen } from "@testing-library/react";

import { HeroSection } from "~/features/home/components/hero-section";

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
    ).toHaveAttribute("href", "/contact");
    expect(
      screen.getByRole("link", { name: /Explore Projects/ }),
    ).toHaveAttribute("href", "/projects");
  });
});
