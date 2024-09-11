import {
  DataSampleWithLatNLong,
  DataSample,
  hasLatNLong,
  specimenNameMap,
} from "../components/leaflet-map/leaflet-map.types";
import { Select } from "../components/select";
import { LeafletMap } from "../components/leaflet-map/leaflet-map";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "../routes/map";
import axios, { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import { apiUrl } from "../api";

export const Map = () => {
  const navigate = useNavigate({ from: Route.fullPath });
  const { parameter } = Route.useSearch();

  const mapDataQuery = useQuery<
    AxiosResponse<Array<DataSample>>,
    Error,
    Array<DataSampleWithLatNLong>
  >({
    enabled: !!parameter,
    queryKey: ["MapData", { parameter }],
    queryFn: () => axios.get(`${apiUrl}/data?parameter=${parameter}`),
    select: ({ data }) => data.filter((site) => hasLatNLong(site)),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="2xl:max-w-[1300px] 2xl:mx-auto">
      <div className="flex flex-col my-4 gap-2 mx-4 2xl:mx-0">
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
      <div className="flex justify-center xl:p-8 2xl:p-0">
        <LeafletMap
          className=""
          data={mapDataQuery.data}
          isError={mapDataQuery.isError}
          isLoading={mapDataQuery.isLoading}
          parameter={parameter}
        />
      </div>
    </div>
  );
};
