import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import FeedbackForm from "./FeedbackForm";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { BASE_URL, token } from "../../config";
import React from "react";

// Mock dependencies
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn();

describe("FeedbackForm Component", () => {
  beforeEach(() => {
    useParams.mockReturnValue({ id: "123" }); // Mock useParams
    fetch.mockClear();
  });

  test("should render feedback form", () => {
    render(<FeedbackForm />);

    expect(
      screen.getByText("How would you rate the overall experience?"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Share your feedback or suggestion*"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Write your message"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Submit Feedback" }),
    ).toBeInTheDocument();
  });

  test("should update rating on star click", () => {
    render(<FeedbackForm />);

    const stars = screen.getAllByRole("button");

    fireEvent.click(stars[2]); // Klik bintang ke-3
    expect(stars[2]).toHaveClass(
      "text-gray-400 bg-transparent border-none outline-none text-[22px] cursor-pointer",
    ); // Bintang ke-3 harus aktif
  });

  test("should update review text when typing", () => {
    render(<FeedbackForm />);

    const textarea = screen.getByPlaceholderText("Write your message");
    fireEvent.change(textarea, { target: { value: "Great service!" } });

    expect(textarea.value).toBe("Great service!");
  });

  test("should show error toast if rating or review is missing", async () => {
    render(<FeedbackForm />);

    const submitButton = screen.getByRole("button", {
      name: "Submit Feedback",
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Rating & Review Fields are required",
      );
    });
  });

  test("should submit form successfully", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Review submitted successfully!" }),
    });

    render(<FeedbackForm />);

    fireEvent.click(screen.getAllByRole("button")[3]); // Klik bintang ke-4
    fireEvent.change(screen.getByPlaceholderText("Write your message"), {
      target: { value: "Excellent experience!" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit Feedback" }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `${BASE_URL}/doctors/123/reviews`,
        expect.any(Object),
      );
      expect(toast.success).toHaveBeenCalledWith(
        "Review submitted successfully!",
      );
    });
  });

  test("should show error toast if API request fails", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Something went wrong!" }),
    });

    render(<FeedbackForm />);

    fireEvent.click(screen.getAllByRole("button")[3]); // Klik bintang ke-4
    fireEvent.change(screen.getByPlaceholderText("Write your message"), {
      target: { value: "Good experience!" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit Feedback" }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Something went wrong!");
    });
  });
});
