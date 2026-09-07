import { render, screen } from "@testing-library/react";

import { SmartLink } from "~/components/smart-link";

jest.mock("react-router", () => ({
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to} data-router-link="true">
      {children}
    </a>
  ),
}));

describe("SmartLink", () => {
  it("uses client-side routing for internal paths", () => {
    render(<SmartLink to="/about">About</SmartLink>);

    const link = screen.getByRole("link", { name: "About" });
    expect(link).toHaveAttribute("href", "/about");
    expect(link).toHaveAttribute("data-router-link", "true");
  });

  it("uses a plain anchor for mailto and external URLs", () => {
    render(
      <>
        <SmartLink to="mailto:hello@example.org">Email us</SmartLink>
        <SmartLink to="https://example.org">External</SmartLink>
      </>,
    );

    const email = screen.getByRole("link", { name: "Email us" });
    expect(email).toHaveAttribute("href", "mailto:hello@example.org");
    expect(email).not.toHaveAttribute("data-router-link");

    const external = screen.getByRole("link", { name: "External" });
    expect(external).toHaveAttribute("href", "https://example.org");
    expect(external).not.toHaveAttribute("data-router-link");
  });
});
