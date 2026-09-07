import { render, screen } from "@testing-library/react";

import { SiteFooter } from "./site-footer";

describe("SiteFooter", () => {
  it("renders newsletter band, link columns, social placeholders, and copyright", () => {
    render(<SiteFooter />);
    expect(
      screen.getByText("Community-first climate organisation."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Subscribe to newsletter" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "Email address" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Subscribe" }),
    ).toBeInTheDocument();
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
