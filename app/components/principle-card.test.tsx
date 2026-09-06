import { render, screen } from "@testing-library/react";

import { PrincipleCard } from "~/components/principle-card";

describe("PrincipleCard", () => {
  it("renders title and description", () => {
    render(
      <PrincipleCard
        title="Community first"
        description="We are developing projects alongside local partners."
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Community first" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "We are developing projects alongside local partners.",
      ),
    ).toBeInTheDocument();
  });
});
