import { render, screen } from "@testing-library/react";

import { BenefitsSection } from "~/features/home/components/benefits-section";

describe("BenefitsSection", () => {
  it("renders three approach steps", () => {
    render(<BenefitsSection />);

    expect(
      screen.getByRole("heading", { name: "Community Consultation" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Collaborative Restoration" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Verification-Ready Development" }),
    ).toBeInTheDocument();
  });
  });
});
