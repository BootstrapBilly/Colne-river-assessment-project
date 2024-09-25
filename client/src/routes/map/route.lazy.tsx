import { createLazyFileRoute } from '@tanstack/react-router';
import { Map } from '../../pages/map';

export const Route = createLazyFileRoute('/map')({
  component: Map,
});
