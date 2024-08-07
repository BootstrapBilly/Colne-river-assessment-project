import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { Map } from "./components/Map";

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <Map />
  </QueryClientProvider>
);
