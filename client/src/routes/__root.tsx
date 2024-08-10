import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { NavBar } from "../components/nav-bar/nav-bar";

export const Route = createRootRoute({
  component: () => (
    <>
      <TanStackRouterDevtools />
      <NavBar />
      <Outlet />
    </>
  ),
});
