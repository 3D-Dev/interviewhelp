import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "./Card/Card";

jest.mock("../components/Card/Graph.jsx", () => {
  return {
    __esModule: true,
    default: () => <div>Mocked Graph</div>,
  };
});

describe("Card Component", () => {
  it("renders card with data", () => {
    const mockData = {
      name: "John Doe",
      avatar: "avatar_url",
      occupation: "Developer",
      impressions: 1000,
      conversions: 50,
      revenue: 500,
      dataForGraph: [],
      time: "Jan 1 - Jan 18",
    };

    render(<Card {...mockData} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Developer")).toBeInTheDocument();
    expect(screen.getByText("1,000")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("$500")).toBeInTheDocument();
    expect(screen.getByText(/Conversions Jan 1 - Jan 18/)).toBeInTheDocument();
    expect(screen.getByText("Mocked Graph")).toBeInTheDocument();
  });
});
