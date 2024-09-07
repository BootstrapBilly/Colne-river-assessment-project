import { createLazyFileRoute } from "@tanstack/react-router";
import { AboutMobile } from "../pages/about/about.mobile";
import { About } from "../pages/about/about";

export const Route = createLazyFileRoute("/")({
  component: () => (
    <>
      <AboutMobile />
      <About />
    </>
  ),
});
