import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { MapContainer, Popup, TileLayer, CircleMarker } from "react-leaflet";
import {
  gradeMap,
  CompleteDataSample,
  DataSample,
  isECData,
  isENTData,
} from "./map.types";
import { SampleFinding } from "./sample-finding";
import { Legend } from "./map-legend";

const isCompleteDataSample = (data: DataSample): data is CompleteDataSample => {
  return (
    "siteID" in data &&
    "latitude" in data &&
    "longitude" in data &&
    "N" in data &&
    "color" in data &&
    (isECData(data) || isENTData(data))
  );
};

export const Map = () => {
  const mapDataQuery = useQuery<
    AxiosResponse<Array<DataSample>>,
    Error,
    Array<CompleteDataSample>
  >({
    queryKey: ["MapData"],
    queryFn: () =>
      axios.get("https://crap-api.onrender.com/data?parameter=NFP_ENT"),
    select: ({ data }) => data.filter((site) => isCompleteDataSample(site)),
  });

  if (mapDataQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (mapDataQuery.isError) {
    return <div>Error loading data: {mapDataQuery.error.message}</div>;
  }

  return (
    <MapContainer
      center={[51.86, 0.99]}
      zoom={11.4}
      scrollWheelZoom={true}
      style={{ height: "80vh", width: "100vw" }}
    >
      <TileLayer
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {mapDataQuery.data?.map((site) => (
        <CircleMarker
          key={site.siteID}
          center={[site.latitude, site.longitude]}
          radius={8}
          color={`${gradeMap[site.color].color}`}
          fillOpacity={0.7}
          fillColor={gradeMap[site.color].color}
          stroke={true}
          weight={2}
        >
          <Popup>
            <div className="flex flex-col">
              <p>Site: {site.siteID}</p>
              <SampleFinding {...site} />
              <p>Number of Samples: {site.N}</p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
      <Legend />
    </MapContainer>
  );
};

export default Map;
