import { render, screen } from "@testing-library/react";

import { SiteHeader } from "~/components/layout/site-header";

describe("SiteHeader", () => {
  it("renders brand logo and primary nav", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("img", { name: "Carbon8" })).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Primary" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("button", { name: "Menu" })).toBeInTheDocument();
  });
});
