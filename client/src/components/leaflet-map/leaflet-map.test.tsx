import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../tests/render-with-providers";
import LeafletMap from "./leaflet-map";

describe("leaflet-map", () => {
  test("Shows loading if isLoading", async () => {
    renderWithProviders(() => (
      <LeafletMap parameter="NFP_EC" data={[]} isLoading />
    ));

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("Shows error if isError", async () => {
    renderWithProviders(() => (
      <LeafletMap parameter="NFP_EC" data={[]} isError />
    ));

    expect(screen.getByText("Error loading map data")).toBeInTheDocument();
  });
});
