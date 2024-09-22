import {
  DataSample,
  hasLatNLong,
  specimenNameMap,
  Specimen,
} from '../components/leaflet-map/leaflet-map.types';
import { Select } from '../components/select';
import { LeafletMap } from '../components/leaflet-map/leaflet-map';
import { useNavigate } from '@tanstack/react-router';
import { Route } from '../routes/map';
import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { apiUrl } from '../api';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { Section } from '../components/layout/section';

export const Map = () => {
  const navigate = useNavigate({ from: Route.fullPath });
  const { parameter } = Route.useSearch();

  const mapDataQuery = useQuery<AxiosResponse, Error, Array<DataSample>>({
    enabled: !!parameter,
    queryKey: ['MapData', { parameter }],
    queryFn: () => axios.get(`${apiUrl}/data?parameter=${parameter}`),
    select: ({ data }) => data.filter((site: DataSample) => hasLatNLong(site)),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <Section>
      <div className="my-4 flex flex-col gap-2 2xl:mx-0">
        <Select
          label="Select bacteria"
          options={[
            {
              label: specimenNameMap.NFP_ENT,
              value: 'NFP_ENT',
            },
            {
              label: specimenNameMap.NFP_EC,
              value: 'NFP_EC',
            },
          ]}
          onChange={(value: Specimen) =>
            navigate({ search: { parameter: value } })
          }
          value={parameter}
        />
      </div>
      <div className="flex items-center justify-end gap-2 p-4 text-gray-700/50 xl:mr-6 2xl:mr-0 2xl:px-0">
        <InformationCircleIcon className="h-6" />
        <p>Click a map marker for more details.</p>
      </div>
      <div className="flex justify-center">
        <LeafletMap
          data={mapDataQuery.data}
          isError={mapDataQuery.isError}
          isLoading={mapDataQuery.isLoading}
          parameter={parameter}
        />
      </div>
    </Section>
  );
};
