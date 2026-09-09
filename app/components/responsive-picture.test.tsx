import { fireEvent, render, screen } from "@testing-library/react";

import { ResponsivePicture, webpSrcSetFor } from "~/components/responsive-picture";

describe("webpSrcSetFor", () => {
  it("mirrors a srcset with .webp twins", () => {
    expect(
      webpSrcSetFor(
        "/assets/smoke-coming-up-1920.jpg",
        "/assets/smoke-coming-up-960.jpg 960w, /assets/smoke-coming-up-1920.jpg 1920w",
      ),
    ).toBe(
      "/assets/smoke-coming-up-960.webp 960w, /assets/smoke-coming-up-1920.webp 1920w",
    );
  });

  it("falls back to a single webp src when there is no srcset", () => {
    expect(webpSrcSetFor("/assets/community-led-960.jpg")).toBe(
      "/assets/community-led-960.webp",
    );
  });

  it("returns undefined when there is nothing to convert", () => {
    expect(webpSrcSetFor("/assets/logo.svg")).toBeUndefined();
  });
});

describe("ResponsivePicture", () => {
  it("serves webp first with the jpeg as fallback img", () => {
    render(
      <ResponsivePicture
        src="/assets/smoke-coming-up-1920.jpg"
        srcSet="/assets/smoke-coming-up-960.jpg 960w, /assets/smoke-coming-up-1920.jpg 1920w"
        sizes="100vw"
        alt="Smoke over canopy"
        className="h-full w-full object-cover"
      />,
    );

    const img = screen.getByRole("img", { name: "Smoke over canopy" });
    expect(img).toHaveAttribute("src", "/assets/smoke-coming-up-1920.jpg");
    expect(img).toHaveAttribute(
      "srcset",
      "/assets/smoke-coming-up-960.jpg 960w, /assets/smoke-coming-up-1920.jpg 1920w",
    );
    expect(img).toHaveClass("object-cover");

    const source = document.querySelector("picture > source");
    expect(source?.getAttribute("type")).toBe("image/webp");
    expect(source?.getAttribute("srcset")).toBe(
      "/assets/smoke-coming-up-960.webp 960w, /assets/smoke-coming-up-1920.webp 1920w",
    );
  });

  it("renders blurred until the image loads, then sharpens", () => {
    render(
      <ResponsivePicture
        src="/assets/smoke-coming-up-1920.jpg"
        alt="Smoke over canopy"
        className="h-full w-full object-cover"
      />,
    );

    const img = screen.getByRole("img", { name: "Smoke over canopy" });
    expect(img).toHaveClass("blur-lg");
    expect(img).not.toHaveClass("blur-none");

    fireEvent.load(img);
    expect(img).toHaveClass("blur-none");
    expect(img).not.toHaveClass("blur-lg");
    expect(img).toHaveClass("object-cover");
  });
});
