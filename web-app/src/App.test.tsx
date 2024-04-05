import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

jest.mock("./lib/http", () => {
  return {
    sendGetRequest: () => {
      return {
        articles: [
          { id: "1234", name: "Chaise", priceEur: 50 },
          { id: "5678", name: "Table", priceEur: 150 },
        ],
      };
    },
  };
});

describe("App", () => {
  it("renders loading status first and articles after fetching data", async () => {
    render(<App />);

    const loadingElement = screen.getByText(/Chargement…/i);
    expect(loadingElement).toBeInTheDocument();

    let articleElements: HTMLElement[];
    await waitFor(() => {
      articleElements = screen.getAllByRole("listitem");
      expect(articleElements).toHaveLength(2);
    });

    await waitFor(() => {
      expect(articleElements[0].textContent).toEqual("Chaise");
    });
  });
});
