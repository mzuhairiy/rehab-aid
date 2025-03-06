import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Contact from "./Contact";

test("Contact section displayed in the homepage", () => {
  render(<Contact />);
  const heading = screen.getByText(/Contact Us/i);
  expect(heading).toBeInTheDocument();
});
