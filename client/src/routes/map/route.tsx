import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { specimen } from '../../components/leaflet-map/leaflet-map.types';

const mapSchema = z.object({
  parameter: z.enum(specimen),
});

export type MapSearch = z.infer<typeof mapSchema>;

export const Route = createFileRoute('/map')({
  validateSearch: (search) => mapSchema.parse(search),
});
