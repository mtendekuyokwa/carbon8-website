import { render, screen } from "@testing-library/react";

import { ManifestoSection } from "~/features/home/components/manifesto-section";

describe("ManifestoSection", () => {
  it("renders the manifesto question and forward-looking claim", () => {
    render(<ManifestoSection />);

    expect(
      screen.getByText(
        "What if the people restoring the land also held the value it creates?",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/We're building Carbon8 so Malawian farmers/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/built with the people who live on the land/),
    ).toBeInTheDocument();
  });
});
