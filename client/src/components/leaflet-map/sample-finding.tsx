import { CompleteDataSample, specimenNameMap } from "./leaflet-map.types";
import { Route } from "../../routes/map";

export const SampleFinding = (data: CompleteDataSample) => {
  const { parameter } = Route.useSearch();

  return (
    <p>
      <i>{specimenNameMap[parameter]}</i> (CFU/100 mL): {data.value}
    </p>
  );
};
