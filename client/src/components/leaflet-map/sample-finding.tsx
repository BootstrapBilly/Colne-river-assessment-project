import { DataSample, specimenNameMap } from './leaflet-map.types';
import { Route } from '../../routes/map/route';

export const SampleFinding = (data: DataSample) => {
  const { parameter } = Route.useSearch();

  return (
    <p>
      <i>{specimenNameMap[parameter]}</i> (CFU/100 mL): {data.value}
    </p>
  );
};
