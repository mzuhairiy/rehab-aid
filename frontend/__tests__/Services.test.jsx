import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Services from "../src/pages/Services";

jest.mock("../src/assets/data/services", () => ({
  services: [
    {
      name: "Mock Service 1",
      desc: "Description for service 1",
      bgColor: "#f00",
      textColor: "#fff",
    },
    {
      name: "Mock Service 2",
      desc: "Description for service 2",
      bgColor: "#0f0",
      textColor: "#000",
    },
  ],
}));

test("Services section displayed in the homepage", () => {
  render(
    <MemoryRouter>
      <Services />
    </MemoryRouter>,
  );

  // ✅ Cek teks dari data mock
  expect(screen.getByText("Mock Service 1")).toBeInTheDocument();
  expect(screen.getByText("Mock Service 2")).toBeInTheDocument();
});
