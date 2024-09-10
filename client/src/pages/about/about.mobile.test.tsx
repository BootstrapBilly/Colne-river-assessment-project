import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../tests/render-with-providers";
import { AboutMobile } from "./about.mobile";

test("contains link to the fundraiser page", async () => {
  renderWithProviders(AboutMobile);

  expect(
    screen.getByRole("link", {
      name: "Learn More About the Project & Support Our Cause",
    })
  ).toHaveAttribute("href", "https://click.hubbub.net/p/CRAP2024/");
});
