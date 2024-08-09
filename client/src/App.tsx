import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { Map } from "./components/map/map";

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <Map />
  </QueryClientProvider>
);
