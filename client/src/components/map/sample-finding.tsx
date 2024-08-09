import {
  CompleteDataSample,
  isECData,
  isENTData,
  specimenNameMap,
} from "./map.types";

export const SampleFinding = (data: CompleteDataSample) => {
  let specimenName = "";
  let numberFound = 0;

  if (isECData(data)) {
    specimenName = specimenNameMap.NFP_EC;
    numberFound = data.NFP_EC;
  }

  if (isENTData(data)) {
    specimenName = specimenNameMap.NFP_ENT;
    numberFound = data.NFP_ENT;
  }

  if (!specimenName) {
    return null;
  }

  return (
    <p>
      <i>{specimenName}</i> (CFU/100 mL): {numberFound}
    </p>
  );
};
