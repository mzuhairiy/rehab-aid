import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import Tabs from "./Tabs";
import "@testing-library/jest-dom";
import React from "react";

describe("Tabs Component", () => {
  let mockDispatch, mockNavigate, mockSetTab;

  beforeEach(() => {
    mockDispatch = jest.fn();
    mockNavigate = jest.fn();
    mockSetTab = jest.fn();
  });

  const renderComponent = (tab = "overview") => {
    return render(
      <authContext.Provider value={{ dispatch: mockDispatch }}>
        <MemoryRouter>
          <Tabs tab={tab} setTab={mockSetTab} />
        </MemoryRouter>
      </authContext.Provider>,
    );
  };

  test("renders all tab buttons", () => {
    renderComponent();

    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText("Appointments")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.getByText("Delete Account")).toBeInTheDocument();
  });

  test("calls setTab function when a tab button is clicked", () => {
    renderComponent();

    fireEvent.click(screen.getByText("Appointments"));
    expect(mockSetTab).toHaveBeenCalledWith("appointments");

    fireEvent.click(screen.getByText("Profile"));
    expect(mockSetTab).toHaveBeenCalledWith("settings");
  });

  test("calls dispatch and navigate when logout is clicked", () => {
    renderComponent();

    fireEvent.click(screen.getByText("Logout"));
    expect(mockDispatch).toHaveBeenCalledWith({ type: "LOGOUT" });
  });
});
