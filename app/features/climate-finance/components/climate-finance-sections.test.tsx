import { render, screen } from "@testing-library/react";

import { CreditPathSection } from "~/features/climate-finance/components/credit-path-section";
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
      <CreditPathSection />
      <FinanceFaqSection />
    </>,
  );
}

describe("Climate Finance sections", () => {
  it("pairs each finance term with the plain question it asks", () => {
    renderPage();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Nobody can agree to what they don't understand.",
    );
    expect(
      screen.getByText("Free, prior and informed consent"),
    ).toBeInTheDocument();
    expect(screen.getByText("Additionality")).toBeInTheDocument();
    expect(
      screen.getByText("Would this have happened anyway, without the money?"),
    ).toBeInTheDocument();
  });

  it("shows the credit path with Carbon8 honestly placed at step one", () => {
    const { container } = renderPage();
    const steps = container.querySelectorAll("ol > li");
    expect(steps).toHaveLength(6);
    const current = container.querySelector('[aria-current="step"]');
    expect(current).toHaveTextContent("Listen");
    expect(current).toHaveTextContent("We are here");
  });

  it("groups FAQs by who is asking, collapsed by default", () => {
    renderPage();
    expect(
      screen.getByRole("group", { name: "If you live and work on the land" }),
    ).toBeInTheDocument();
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
