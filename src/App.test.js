// App.test.js
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  it("renders without errors", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.queryByText("Error:")).toBeNull();
    });
  });
});
