import { render, screen } from "@testing-library/react";
import React from "react";

import ErrorBox from "./ErrorBox";

describe("<ErrorBox />", () => {
  test("it should show child content", () => {
    render(<ErrorBox>Error message</ErrorBox>);

    const errorBox = screen.getByText("Error message");

    expect(errorBox).toBeInTheDocument();
  });
});
