import { fireEvent, render, screen } from "@testing-library/react";

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

function homeLogo() {
  return screen.getByRole("link", { name: "Carbon8 home" });
}

beforeEach(() => {
  Object.defineProperty(window, "scrollY", {
    value: 0,
    configurable: true,
    writable: true,
  });
});

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
  });

  it("renders a hamburger menu button that opens the mobile overlay", () => {
    renderAt("/");

    const menuButton = screen.getByRole("button", { name: "Open menu" });
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByRole("navigation", { name: "Mobile" }),
    ).not.toBeInTheDocument();

    fireEvent.click(menuButton);

    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(
      screen.getByRole("navigation", { name: "Mobile" }),
    ).toBeInTheDocument();
  });

  it("closes the mobile overlay on Escape", () => {
    renderAt("/");

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(
      screen.getByRole("navigation", { name: "Mobile" }),
    ).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(
      screen.queryByRole("navigation", { name: "Mobile" }),
    ).not.toBeInTheDocument();
  });

  it("switches the logo to white while the menu is open", () => {
    const { container } = renderAt("/about");

    expect(container.querySelector(".text-bark")).not.toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(
      screen
        .getByRole("link", { name: "Carbon8 home" })
        .querySelector(".text-white"),
    ).not.toBeNull();
  });

  it("renders a smaller logo on mobile", () => {
    renderAt("/");

    const logoText = screen
      .getByRole("link", { name: "Carbon8 home" })
      .querySelector('[aria-hidden="true"]');
    expect(logoText).toHaveClass("text-2xl", "md:text-4xl");
  });

  it("keeps mobile menu selection square", () => {
    renderAt("/");

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const homeLink = screen
      .getByRole("navigation", { name: "Mobile" })
      .querySelector('a[href="/"]');
    expect(homeLink).toHaveClass("rounded-none");
    expect(homeLink).not.toHaveClass("rounded-2xl");
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

  it("updates the logo while scrolling on home", () => {
    renderAt("/");
    expect(homeLogo().querySelector(".text-white")).not.toBeNull();

    window.scrollY = 800;
    fireEvent.scroll(window);
    expect(homeLogo().querySelector(".text-bark")).not.toBeNull();
  });

  it("syncs the logo on route change without waiting for a scroll event", () => {
    window.scrollY = 800;
    const { rerender } = renderAt("/");
    fireEvent.scroll(window);
    expect(homeLogo().querySelector(".text-bark")).not.toBeNull();

    mockPathname = "/about";
    window.scrollY = 0;
    rerender(<SiteHeader />);
    expect(homeLogo().querySelector(".text-bark")).not.toBeNull();

    mockPathname = "/";
    rerender(<SiteHeader />);
    expect(homeLogo().querySelector(".text-white")).not.toBeNull();
  });
});
