import { MapContainer, Popup, TileLayer, CircleMarker } from "react-leaflet";
import { gradeMap, CompleteDataSample } from "./map.types";
import { SampleFinding } from "./sample-finding";
import { Legend } from "./map-legend";

interface Props {
  data: Array<CompleteDataSample> | undefined;
  isError?: boolean;
  isLoading?: boolean;
}

export const Map = ({ data, isError, isLoading }: Props) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading map data</div>;
  }

  return (
    <MapContainer
      center={[51.86, 0.99]}
      zoom={11.4}
      scrollWheelZoom={true}
      className="h-[65vh] md:h-[80vh] w-[98vw]"
    >
      <TileLayer
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {data?.map((site) => (
        <CircleMarker
          key={`${site.siteID}-${site.value}-${site.color}`}
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
