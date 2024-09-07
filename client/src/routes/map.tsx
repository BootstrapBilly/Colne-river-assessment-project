import { createFileRoute } from "@tanstack/react-router";
import { Map } from "../pages/map";
import { z } from "zod";
import { specimen } from "../components/leaflet-map/leaflet-map.types";

const mapSchema = z.object({
  parameter: z.enum(specimen),
});

export type MapSearch = z.infer<typeof mapSchema>;

export const Route = createFileRoute("/map")({
  component: Map,
  validateSearch: (search) => mapSchema.parse(search),
});
