import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { MapContainer, Popup, TileLayer, CircleMarker } from "react-leaflet";

const colorMap: Record<number, string> = {
  1: "#7CADCD",
  2: "#366F95",
  3: "#CAB717",
  4: "#9A6F3C",
};

interface DataSample {
  siteID?: string;
  latitude?: number;
  longitude?: number;
  N?: number;
  color?: number;
}

interface NFP_ENT extends DataSample {
  NFP_ENT: number;
}

interface NFP_EC extends DataSample {
  NFP_EC: number;
}

type DataSamples = Array<NFP_ENT | NFP_EC>;

type CompleteDataSample = Required<NFP_ENT> | Required<NFP_EC>;

const isENTData = (data: NFP_ENT | NFP_EC): data is NFP_ENT => {
  return "NFP_ENT" in data;
};

const isECData = (data: NFP_ENT | NFP_EC): data is NFP_EC => {
  return "NFP_EC" in data;
};

const isCompleteDataSample = (
  data: NFP_ENT | NFP_EC
): data is CompleteDataSample => {
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
    AxiosResponse<DataSamples>,
    Error,
    Array<Required<NFP_ENT> | Required<NFP_EC>>
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
          color={`${colorMap[site.color]}`}
          fillOpacity={0.7}
          fillColor={colorMap[site.color]}
          stroke={true}
          weight={2}
        >
          <Popup>
            <div>
              <strong>Site ID:</strong> {site.siteID}
              <br />
              <strong>Number of Samples:</strong> {site.N}
              <br />
              <strong>NFP_ENT:</strong> {isENTData(site) && site.NFP_ENT}
              <br />
              <strong>Classification:</strong>{" "}
              {site.color === 1
                ? "Excellent"
                : site.color === 2
                ? "Good"
                : site.color === 3
                ? "Sufficient"
                : site.color === 4
                ? "Poor"
                : "Unknown"}
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default Map;
