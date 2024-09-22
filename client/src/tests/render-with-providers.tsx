import { render } from '@testing-library/react';
import { RouteComponent, RouterProvider } from '@tanstack/react-router';

import { createRootRoute, createRouter } from '@tanstack/react-router';
import { QueryClientProvider } from '../util/query-client-provider';

const rootRoute = createRootRoute();

const router = createRouter({
  routeTree: rootRoute,
});

export const renderWithProviders = (Component: RouteComponent) =>
  render(
    <QueryClientProvider>
      <RouterProvider
        router={router as never}
        defaultComponent={() => <Component />}
      />
    </QueryClientProvider>
  );
