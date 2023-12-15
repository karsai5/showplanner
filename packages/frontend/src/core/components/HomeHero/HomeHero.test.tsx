import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";
import React from "react";

import HomeHero from "./HomeHero";

describe("<HomeHero />", () => {
  test("it should mount", () => {
    render(<HomeHero />);

    const homeHero = screen.getByTestId("HomeHero");

    expect(homeHero).toBeInTheDocument();
  });
});
