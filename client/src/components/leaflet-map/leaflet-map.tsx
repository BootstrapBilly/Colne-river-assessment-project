import { MapContainer, Popup, TileLayer, CircleMarker } from 'react-leaflet';
import { DataSample, gradeMap, Specimen } from './leaflet-map.types';
import { SampleFinding } from './sample-finding';
import { Legend } from './legend';
import { MapSearch } from '../../routes/map';
import classNames from 'classnames';

interface StartingPosition {
  zoom: number;
  center: [number, number];
}

interface Props extends MapSearch {
  className?: string;
  data: Array<DataSample> | undefined;
  isError?: boolean;
  isLoading?: boolean;
  parameter: Specimen;
  scrollWheelZoom?: boolean;
  startingPosition?: StartingPosition;
  showLegend?: boolean;
  enablePopups?: boolean;
}

export const LeafletMap = ({
  className,
  data,
  isError,
  isLoading,
  parameter,
  scrollWheelZoom = true,
  startingPosition = {
    zoom: 11.4,
    center: [51.86, 0.99],
  },
  showLegend = true,
  enablePopups = true,
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
      scrollWheelZoom={scrollWheelZoom}
      className={classNames('h-[65vh] w-[98vw]', className)}
    >
      <TileLayer
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {data?.map((site) => {
        const color = site.color ? gradeMap[site.color].color : 'black';
        if (site.latitude && site.longitude) {
          return (
            <CircleMarker
              key={`${site.siteID}-${site.value}-${color}`}
              center={[site.latitude, site.longitude]}
              radius={8}
              color={color}
              fillOpacity={0.7}
              fillColor={color}
              stroke
              weight={2}
              className={`circle-marker-${parameter}-${site.siteID}-${site.value}-${site.color}`}
            >
              {enablePopups && (
                <Popup>
                  <div className="flex flex-col">
                    <p>Site: {site.siteID}</p>
                    <SampleFinding {...site} />
                    <p>Number of Samples: {site.N}</p>
                  </div>
                </Popup>
              )}
            </CircleMarker>
          );
        }
      })}
      {showLegend && <Legend />}
    </MapContainer>
  );
};

export default LeafletMap;
