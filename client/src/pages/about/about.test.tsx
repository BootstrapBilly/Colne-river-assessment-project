import { screen } from "@testing-library/react";
import { About } from "./about";
import { renderWithProviders } from "../../tests/render-with-providers";

test("contains link to the fundraiser page", async () => {
  renderWithProviders(About);

  expect(
    screen.getByRole("link", {
      name: "Learn More About the Project & Support Our Cause",
    })
  ).toHaveAttribute("href", "https://click.hubbub.net/p/CRAP2024/");
});
