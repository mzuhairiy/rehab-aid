import { render, screen } from "@testing-library/react";
import Appointment from "../src/Dashboard/doctor-account/Appointment";
import { formatDate } from "../src/utils/formatDate";
import "@testing-library/jest-dom";
import React from "react";

jest.mock("../src/utils/formatDate", () => ({
  formatDate: jest.fn(),
}));

describe("Appointment Component", () => {
  const mockAppointments = [
    {
      _id: "1",
      user: {
        name: "John Doe",
        email: "johndoe@example.com",
        gender: "Male",
        photo: "https://via.placeholder.com/40",
      },
      isPaid: true,
      ticketPrice: 100,
      createdAt: "2025-03-05T12:00:00Z",
    },
    {
      _id: "2",
      user: {
        name: "Jane Smith",
        email: "janesmith@example.com",
        gender: "Female",
        photo: "https://via.placeholder.com/40",
      },
      isPaid: false,
      ticketPrice: 150,
      createdAt: "2025-03-06T14:30:00Z",
    },
  ];

  beforeEach(() => {
    formatDate.mockImplementation((date) => date.split("T")[0]); // Mock formatDate output
  });

  it("should render table headers correctly", () => {
    render(<Appointment appointments={[]} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Gender")).toBeInTheDocument();
    expect(screen.getByText("Payment")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Booked on")).toBeInTheDocument();
  });

  it("should render appointments correctly", () => {
    render(<Appointment appointments={mockAppointments} />);

    // Check first appointment
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("johndoe@example.com")).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();
    expect(screen.getByText("2025-03-05")).toBeInTheDocument(); // Mocked formatDate output

    // Check second appointment
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("janesmith@example.com")).toBeInTheDocument();
    expect(screen.getByText("Female")).toBeInTheDocument();
    expect(screen.getByText("2025-03-06")).toBeInTheDocument();
  });

  it("should display Paid and Unpaid status correctly", () => {
    render(<Appointment appointments={mockAppointments} />);

    expect(screen.getByText("Paid")).toBeInTheDocument();
    expect(screen.getByText("Unpaid")).toBeInTheDocument();
  });

  it("should render an empty state when there are no appointments", () => {
    render(<Appointment appointments={[]} />);

    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
  });
});
