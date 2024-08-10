import { createLazyFileRoute } from "@tanstack/react-router";
import { About } from "../pages/about";

export const Route = createLazyFileRoute("/")({
  component: About,
});
