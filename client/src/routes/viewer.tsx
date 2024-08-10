import { createFileRoute } from "@tanstack/react-router";
import { Viewer } from "../pages/viewer";
import { z } from "zod";
import { specimen } from "../components/map/map.types";

const viewerSchema = z.object({
  parameter: z.enum(specimen),
});

export const Route = createFileRoute("/viewer")({
  component: Viewer,
  validateSearch: (search) => viewerSchema.parse(search),
});
