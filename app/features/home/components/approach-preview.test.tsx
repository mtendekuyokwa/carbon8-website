import { render, screen } from "@testing-library/react";

import { ApproachPreview } from "~/features/home/components/approach-preview";

describe("ApproachPreview", () => {
  it("previews three approach principles", () => {
    render(<ApproachPreview />);

    expect(
      screen.getByRole("heading", { name: "Our approach" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Community first" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Honest finance" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Early concepts" }),
    ).toBeInTheDocument();
  });
});
