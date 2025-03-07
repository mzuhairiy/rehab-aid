import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SidePanel from "./SidePanel";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../config";
import React from "react";

// Mock dependencies
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

// Mock fetch
global.fetch = jest.fn();

describe("SidePanel Component", () => {
  const mockProps = {
    doctorId: "123",
    ticketPrice: "$100",
    timeSlots: [
      { day: "monday", startingTime: "09:00", endingTime: "10:00" },
      { day: "tuesday", startingTime: "14:00", endingTime: "15:00" },
    ],
  };

  beforeEach(() => {
    fetch.mockClear();
  });

  test("should render ticket price and time slots", () => {
    render(<SidePanel {...mockProps} />);

    expect(screen.getByText("Ticket Price")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("Monday")).toBeInTheDocument();
    expect(screen.getByText("Tuesday")).toBeInTheDocument();
  });

  test("should call API on booking button click", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        session: { url: "https://example.com/payment" },
      }),
    });

    delete window.location;
    window.location = { href: "" };

    render(<SidePanel {...mockProps} />);
    fireEvent.click(screen.getByRole("button", { name: "Book Appointment" }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `${BASE_URL}/bookings/checkout-session/123`,
        expect.any(Object),
      );
      expect(window.location.href).toBe("https://example.com/payment");
    });
  });

  test("should show error toast if API request fails", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Booking failed!" }),
    });

    render(<SidePanel {...mockProps} />);
    fireEvent.click(screen.getByRole("button", { name: "Book Appointment" }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Booking failed!Please try again",
      );
    });
  });
});
