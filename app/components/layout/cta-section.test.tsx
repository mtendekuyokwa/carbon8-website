import { render, screen } from "@testing-library/react";

import { CTASection } from "~/components/layout/cta-section";

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

describe("CTASection", () => {
  it("renders heading, body, and primary action", () => {
    render(
      <CTASection
        heading="Partner with us"
        body="We are looking for communities, partners, and funders to shape early concepts with us."
        primaryLabel="Get in touch"
        primaryHref="/contact"
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Partner with us" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Get in touch" }),
    ).toHaveAttribute("href", "/contact");
  });

  it("renders secondary action when provided", () => {
    render(
      <CTASection
        heading="Partner with us"
        body="Shape early concepts with us."
        primaryLabel="Get in touch"
        primaryHref="/contact"
        secondaryLabel="Explore projects"
        secondaryHref="/projects"
      />,
    );

    expect(
      screen.getByRole("link", { name: "Explore projects" }),
    ).toHaveAttribute("href", "/projects");
  });
});
