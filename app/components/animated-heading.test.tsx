import { render, screen } from "@testing-library/react";

import {
  AnimatedHeading,
  AnimatedText,
  MaskedImage,
} from "~/components/animated-heading";

describe("animated primitives", () => {
  it("renders heading, text, and masked image", () => {
    render(
      <>
        <AnimatedHeading as="h2">Section title</AnimatedHeading>
        <AnimatedText>Supporting copy</AnimatedText>
        <MaskedImage src="https://example.com/img.png" alt="Example" />
      </>,
    );

    expect(
      screen.getByRole("heading", { name: "Section title" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Supporting copy")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Example" })).toBeInTheDocument();
  });
});
