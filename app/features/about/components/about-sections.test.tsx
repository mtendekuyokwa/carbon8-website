import { render, screen } from "@testing-library/react";

import { GeoaiSection } from "~/features/about/components/geoai-section";
import { StorySection } from "~/features/about/components/story-section";

describe("About sections", () => {
  it("renders story and GeoAI support framing", () => {
    const { container } = render(
      <>
        <StorySection />
        <GeoaiSection />
      </>,
    );

    expect(
      container.querySelector("#about-story-heading"),
    ).toHaveTextContent("Climate action led by communities");
    expect(
      container.querySelector("#about-geoai-heading"),
    ).toHaveTextContent("never replaces them");
    expect(screen.getByText("Map with communities")).toBeInTheDocument();
  });

  it("contains no invented stats or testimonials", () => {
    const { container } = render(<GeoaiSection />);
    expect(container.textContent).not.toMatch(/\d+%|\$\d+/);
    expect(container.textContent).toMatch(/in development|support/i);
  });
});
