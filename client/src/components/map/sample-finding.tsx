import { CompleteDataSample } from "./map.types";

export const SampleFinding = (data: CompleteDataSample) => {
  return (
    <p>
      <i>bum</i> (CFU/100 mL): {data.value}
    </p>
  );
};
