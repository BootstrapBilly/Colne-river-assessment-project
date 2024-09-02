import {
  CompleteDataSample,
  DataSample,
  isCompleteDataSample,
  specimenNameMap,
} from "../components/leaflet-map/leaflet-map.types";
import { Select } from "../components/select";
import { LeafletMap } from "../components/leaflet-map/leaflet-map";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "../routes/map";
import axios, { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";

export const Map = () => {
  const navigate = useNavigate({ from: Route.fullPath });
  const { parameter } = Route.useSearch();

  const mapDataQuery = useQuery<
    AxiosResponse<Array<DataSample>>,
    Error,
    Array<CompleteDataSample>
  >({
    enabled: !!parameter,
    queryKey: ["MapData", { parameter }],
    queryFn: () =>
      axios.get(
        `https://crap-api-635719a27ef1.herokuapp.com/data?parameter=${parameter}`
      ),
    select: ({ data }) => data.filter((site) => isCompleteDataSample(site)),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <>
      <div className="flex flex-col my-4 gap-2 mx-4">
        <Select
          label="Select bacteria"
          options={[
            {
              label: specimenNameMap.NFP_ENT,
              value: "NFP_ENT",
            },
            {
              label: specimenNameMap.NFP_EC,
              value: "NFP_EC",
            },
          ]}
          onChange={(value) => navigate({ search: { parameter: value } })}
          value={parameter}
        />
      </div>
      <div className="flex justify-center">
        <LeafletMap
          data={mapDataQuery.data}
          isError={mapDataQuery.isError}
          isLoading={mapDataQuery.isLoading}
        />
      </div>
    </>
  );
};
