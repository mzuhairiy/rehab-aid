import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";

test("Login displayed in the homepage", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>,
  );
  const heading = screen.getByText(/Login/i);
  expect(heading).toBeInTheDocument();
});
