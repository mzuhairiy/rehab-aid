import { render, screen } from "@testing-library/react";
import DoctorsAbout from "./DoctorsAbout";
import { formatDate } from "../../utils/formatDate";
import "@testing-library/jest-dom";
import React from "react";

// Mock formatDate function
jest.mock("../../utils/formatDate", () => ({
  formatDate: jest.fn((date) => `Formatted(${date})`),
}));

describe("DoctorsAbout Component", () => {
  const mockProps = {
    name: "Dr. John Doe",
    about: "An experienced cardiologist with 15 years of expertise.",
    qualifications: [
      {
        startingDate: "2005-08-01",
        endingDate: "2010-06-30",
        degree: "Doctor of Medicine",
        university: "Harvard University",
      },
    ],
    experiences: [
      {
        startingDate: "2011-07-01",
        endingDate: "2024-03-01",
        position: "Senior Cardiologist",
        hospital: "Mayo Clinic",
      },
    ],
  };

  test("should render doctor's name in title", () => {
    render(<DoctorsAbout {...mockProps} />);

    expect(screen.getByText("About of")).toBeInTheDocument();
    expect(screen.getByText("Dr. John Doe")).toBeInTheDocument();
  });

  test("should render doctor's about description", () => {
    render(<DoctorsAbout {...mockProps} />);

    expect(
      screen.getByText(
        "An experienced cardiologist with 15 years of expertise.",
      ),
    ).toBeInTheDocument();
  });

  test("should render education section with formatted dates", () => {
    render(<DoctorsAbout {...mockProps} />);

    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(screen.getByText("Doctor of Medicine")).toBeInTheDocument();
    expect(screen.getByText("Harvard University")).toBeInTheDocument();
    expect(
      screen.getByText("Formatted(2005-08-01) - Formatted(2010-06-30)"),
    ).toBeInTheDocument();
  });

  test("should render experience section with formatted dates", () => {
    render(<DoctorsAbout {...mockProps} />);

    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getByText("Senior Cardiologist")).toBeInTheDocument();
    expect(screen.getByText("Mayo Clinic")).toBeInTheDocument();
    expect(
      screen.getByText("Formatted(2011-07-01) - Formatted(2024-03-01)"),
    ).toBeInTheDocument();
  });
});
