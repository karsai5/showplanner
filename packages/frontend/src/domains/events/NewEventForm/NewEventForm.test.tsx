import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";
import React from "react";

import NewEventForm from "./NewEventForm";

describe("<NewEvent />", () => {
  test("it should mount", () => {
    render(<NewEventForm onSuccess={() => {}} />);

    const newEventForm = screen.getByTestId("NewEventForm");

    expect(newEventForm).toBeInTheDocument();
  });
});
