import { createRootRoute, Outlet } from "@tanstack/react-router";

import { NavBar } from "../components/nav-bar/nav-bar";
import { lazy } from "react";

const TanStackRouterDevtools =
  import.meta.env.MODE === "production"
    ? () => null
    : lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      );

export const Route = createRootRoute({
  component: () => (
    <>
      <TanStackRouterDevtools />
      <NavBar />
      <Outlet />
    </>
  ),
});
