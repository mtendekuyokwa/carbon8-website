import { render, screen } from "@testing-library/react";

import { SiteHeader } from "~/components/layout/site-header";

let mockPathname = "/";

jest.mock("react-router", () => ({
  useLocation: () => ({ pathname: mockPathname }),
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

function renderAt(pathname: string) {
  mockPathname = pathname;
  return render(<SiteHeader />);
}

describe("SiteHeader", () => {
  it("renders brand logo and primary nav with donate button", () => {
    renderAt("/");

    expect(screen.getByRole("img", { name: "Carbon8" })).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Primary" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Field Notes" })).toHaveAttribute(
      "href",
      "/blog",
    );
    expect(
      screen.queryByRole("link", { name: "Projects" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Donate" })).toHaveAttribute(
      "href",
      "/contact",
    );
    expect(
      screen.queryByRole("button", { name: "Menu" }),
    ).not.toBeInTheDocument();
  });

  it("marks the current page with aria-current", () => {
    const { unmount } = renderAt("/about");
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute(
      "aria-current",
    );
    unmount();
  });

  it("marks Field Notes active for nested blog routes", () => {
    renderAt("/blog/some-post");
    expect(screen.getByRole("link", { name: "Field Notes" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("uses the dark logo on non-home pages", () => {
    const { container, unmount } = renderAt("/about");
    expect(container.querySelector(".text-bark")).not.toBeNull();
    unmount();
  });
});
