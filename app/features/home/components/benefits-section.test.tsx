import { render, screen } from "@testing-library/react";

import { BenefitsSection } from "~/features/home/components/benefits-section";

describe("BenefitsSection", () => {
  it("renders three benefit cards with the reversed middle card", () => {
    render(<BenefitsSection />);

    expect(
      screen.getByRole("heading", { name: "Community-first" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Plain-language finance" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Early and open" }),
    ).toBeInTheDocument();
  });
});
