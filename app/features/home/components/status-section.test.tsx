import { render, screen } from "@testing-library/react";

import { StatusSection } from "~/features/home/components/status-section";

describe("StatusSection", () => {
  it("describes current stage with honest status labels", () => {
    render(<StatusSection />);

    expect(
      screen.getByRole("heading", { name: "Where we are" }),
    ).toBeInTheDocument();
    expect(screen.getByText("concept")).toBeInTheDocument();
    expect(screen.getByText("in_development")).toBeInTheDocument();
  });
});
