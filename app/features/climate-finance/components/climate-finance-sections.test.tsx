import { render, screen } from "@testing-library/react";

import { ExplainerSection } from "~/features/climate-finance/components/explainer-section";
import { FinanceFaqSection } from "~/features/climate-finance/components/finance-faq-section";
import { FinanceHeroSection } from "~/features/climate-finance/components/finance-hero-section";

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

function renderPage() {
  return render(
    <>
      <FinanceHeroSection />
      <ExplainerSection />
      <FinanceFaqSection />
    </>,
  );
}

describe("Climate Finance sections", () => {
  it("renders the explainer and an FAQ accordion", () => {
    const { container } = renderPage();

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Climate finance in plain language",
    );
    expect(
      container.querySelector("#finance-explainer-heading"),
    ).toBeInTheDocument();
    expect(screen.getByText("How carbon markets fit in")).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Is Carbon8 selling carbon credits today?",
      }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("contains no invented stats and states concept stage", () => {
    const { container } = renderPage();
    expect(container.textContent).not.toMatch(/\d+%|\$\d+|\d+\s*(tonnes|tons|tCO2)/i);
    expect(container.textContent).toMatch(/concept stage/i);
  });
});
