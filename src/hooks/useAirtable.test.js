import React from "react";
import "@testing-library/jest-dom";
import { render, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import useAirtable from "./useAirtable";

const TestComponent = ({ endpoint, apiKey }) => {
  const { data, loading, error } = useAirtable(endpoint, apiKey);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>Data: {JSON.stringify(data)}</div>;
};

describe("useAirtable Hook", () => {
  const mock = new MockAdapter(axios);
  const endpoint = "https://api.airtable.com/v0/yourApp/yourTable";
  const apiKey = "test_api_key";

  it("successfully fetches data", async () => {
    const mockData = { records: [{ id: 1, name: "Test" }] };
    mock.onGet(endpoint).reply(200, mockData);

    render(<TestComponent endpoint={endpoint} apiKey={apiKey} />);

    await waitFor(() => {
      expect(
        screen.getByText('Data: [{"id":1,"name":"Test"}]')
      ).toBeInTheDocument();
    });
  });

  it("handles error response", async () => {
    mock.onGet(endpoint).reply(500);

    render(<TestComponent endpoint={endpoint} apiKey={apiKey} />);

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });

  afterEach(() => {
    mock.reset();
  });
});
