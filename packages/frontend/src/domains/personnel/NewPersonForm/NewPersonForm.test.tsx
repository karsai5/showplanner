import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";
import React from "react";

import NewPersonForm from "./NewPersonForm";

describe("<NewPersonForm />", () => {
  test("it should mount", () => {
    render(<NewPersonForm />);

    const newPersonForm = screen.getByTestId("NewPersonForm");

    expect(newPersonForm).toBeInTheDocument();
  });
});
