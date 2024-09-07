import { MapContainer, Popup, TileLayer, CircleMarker } from "react-leaflet";
import { gradeMap, CompleteDataSample } from "./leaflet-map.types";
import { SampleFinding } from "./sample-finding";
import { Legend } from "./legend";
import { MapSearch } from "../../routes/map";
import classNames from "classnames";

interface StartingPosition {
  zoom: number;
  center: [number, number];
}

interface Props extends MapSearch {
  className?: string;
  data: Array<CompleteDataSample> | undefined;
  isError?: boolean;
  isLoading?: boolean;
  startingPosition?: StartingPosition;
  showLegend?: boolean;
}

export const LeafletMap = ({
  className,
  data,
  isError,
  isLoading,
  parameter,
  startingPosition = {
    zoom: 11.4,
    center: [51.86, 0.99],
  },
  showLegend = true,
}: Props) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading map data</div>;
  }

  return (
    <MapContainer
      center={startingPosition.center}
      zoom={startingPosition.zoom}
      scrollWheelZoom={true}
      className={classNames("h-[65vh] md:h-[80vh] w-[98vw]", className)}
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
          className={`circle-marker-${parameter}-${site.siteID}-${site.value}-${site.color}`}
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
      {showLegend && <Legend />}
    </MapContainer>
  );
};

export default LeafletMap;
