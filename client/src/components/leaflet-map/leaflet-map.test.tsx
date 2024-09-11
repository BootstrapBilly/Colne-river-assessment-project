import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../tests/render-with-providers";
import LeafletMap from "./leaflet-map";
import { DataSample, hasLatNLong } from "./leaflet-map.types";

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

describe("hasLatNLong", () => {
  it("should return true when the data has both latitude and longitude", () => {
    const data: DataSample = {
      latitude: 52.52,
      longitude: 13.405,
    };

    expect(hasLatNLong(data)).toBe(true);
  });

  it("should return false when the data does not have latitude", () => {
    const data: DataSample = {
      longitude: 13.405,
    };

    expect(hasLatNLong(data)).toBe(false);
  });

  it("should return false when the data does not have longitude", () => {
    const data: DataSample = {
      latitude: 52.52,
    };

    expect(hasLatNLong(data)).toBe(false);
  });

  it("should return false when the data has neither latitude nor longitude", () => {
    const data: DataSample = {};

    expect(hasLatNLong(data)).toBe(false);
  });
});
