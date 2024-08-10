import {
  CompleteDataSample,
  DataSample,
  isCompleteDataSample,
  specimenNameMap,
} from "../components/map/map.types";
import { Select } from "../components/select";
import { Map } from "../components/map/map";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "../routes/viewer";
import axios, { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";

export const Viewer = () => {
  const navigate = useNavigate({ from: Route.fullPath });
  const { parameter } = Route.useSearch();

  const mapDataQuery = useQuery<
    AxiosResponse<Array<DataSample>>,
    Error,
    Array<CompleteDataSample>
  >({
    queryKey: ["MapData", { parameter }],
    queryFn: () =>
      axios.get(`https://crap-api.onrender.com//data?parameter=${parameter}`),
    select: ({ data }) => data.filter((site) => isCompleteDataSample(site)),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <>
      <div className="flex flex-col my-4 gap-2 mx-4">
        <label htmlFor="choose-specimen">Select bacteria</label>
        <Select
          id="choose-specimen"
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
        <Map
          data={mapDataQuery.data}
          isError={mapDataQuery.isError}
          isLoading={mapDataQuery.isLoading}
        />
      </div>
    </>
  );
};
