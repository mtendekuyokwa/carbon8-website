import { render, screen } from "@testing-library/react";

import { SiteFooter } from "./site-footer";

describe("SiteFooter", () => {
  it("renders CTA band, link columns, social placeholders, and copyright", () => {
    render(<SiteFooter />);
    expect(
      screen.getByText("Community-first climate organisation."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Join the mission" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Contribute" })[0]).toHaveAttribute(
      "href",
      "/contact",
    );
    expect(screen.getByRole("navigation", { name: "Footer" })).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Get involved" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Carbon8 on X (coming soon)" }),
    ).toHaveAttribute("href", "/contact");
    expect(screen.getByText(/© \d{4} Carbon8/)).toBeInTheDocument();
  });
});
