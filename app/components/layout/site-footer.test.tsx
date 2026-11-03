import { render, screen } from "@testing-library/react";

import { SiteFooter } from "./site-footer";

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

describe("SiteFooter", () => {
  it("renders link columns, social placeholders, and copyright", () => {
    render(<SiteFooter />);
    expect(
      screen.getByText("Community-first climate action in Malawi, built in the open."),
    ).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Footer" })).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Get involved" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Climate Finance" }),
    ).toHaveAttribute("href", "/climate-finance");
    expect(
      screen.getByRole("link", { name: "Carbon8 on X (coming soon)" }),
    ).toHaveAttribute("href", "/contact");
    expect(screen.getByText(/© \d{4} Carbon8/)).toBeInTheDocument();
  });

  it("no longer includes the newsletter signup", () => {
    render(<SiteFooter />);
    expect(screen.queryByText(/newsletter/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Subscribe" })).not.toBeInTheDocument();
  });
});
