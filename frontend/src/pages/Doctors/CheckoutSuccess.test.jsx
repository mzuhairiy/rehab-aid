import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import CheckoutSuccess from "./CheckoutSuccess";

describe("CheckoutSuccess Component", () => {
  test("should render the success message", () => {
    render(
      <BrowserRouter>
        <CheckoutSuccess />
      </BrowserRouter>,
    );

    expect(screen.getByText("Payment Done!")).toBeInTheDocument();
    expect(
      screen.getByText("Thank you for completing your secure online payment"),
    ).toBeInTheDocument();
    expect(screen.getByText("Have a great day!")).toBeInTheDocument();
  });

  test("should render the back to home button", () => {
    render(
      <BrowserRouter>
        <CheckoutSuccess />
      </BrowserRouter>,
    );

    const backButton = screen.getByRole("link", { name: /go back to home/i });
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute("href", "/home");
  });
});
