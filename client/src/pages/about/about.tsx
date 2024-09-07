import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Link } from "@tanstack/react-router";
import LandingImage from "../../assets/landing-image.jpg";
import axios, { AxiosResponse } from "axios";
import {
  CompleteDataSample,
  DataSample,
  isCompleteDataSample,
  specimen,
} from "../../components/leaflet-map/leaflet-map.types";
import { useQuery } from "@tanstack/react-query";
import { apiUrl } from "../../api";
import LeafletMap from "../../components/leaflet-map/leaflet-map";

const defaultSpecimin = specimen[0];

export const About = () => {
  const mapDataQuery = useQuery<
    AxiosResponse<Array<DataSample>>,
    Error,
    Array<CompleteDataSample>
  >({
    queryKey: ["MapData", { parameter: defaultSpecimin }],
    queryFn: () => axios.get(`${apiUrl}/data?parameter=${defaultSpecimin}`),
    select: ({ data }) => data.filter((site) => isCompleteDataSample(site)),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="hidden sm:flex flex-col max-h-[100vh] overflow-hidden">
      <div className="relative w-full max-h-[40vh]">
        <img
          src={LandingImage}
          alt="An essex waterway"
          className="w-full max-h-[40vh] object-cover"
        />
        <h1 className="text-2xl font-bold absolute bottom-0 right-[5%] transform translate-x-[5%] text-center mb-4 bg-black/30 text-white p-4 max-w-[55%]">
          Monitoring biodiversity and water quality in East Essex and Suffolk
        </h1>
      </div>
      <div className="grid grid-cols-12 max-w-[1400px] mx-auto h-[55vh]">
        {/* Left column */}
        <div className="col-span-4 2xl:col-span-6 flex flex-col p-8 h-[55vh] 2xl:py-28">
          <LeafletMap
            className="w-[100%] md:h-[40vh]"
            data={mapDataQuery.data}
            isError={mapDataQuery.isError}
            isLoading={mapDataQuery.isLoading}
            parameter={defaultSpecimin}
            startingPosition={{
              zoom: 10,
              center: [51.85, 1.0],
            }}
            showLegend={false}
          />
          <Link
            className="p-4 mt-3 bg-blue-400 flex items-center justify-between text-lg"
            to={"/map"}
            search={{ parameter: "NFP_ENT" }}
          >
            Explore bacteria hotspots <ChevronRightIcon className="h-6" />
          </Link>
        </div>

        {/* Right column */}
        <div className="col-span-8 2xl:col-span-6 flex flex-col p-8 space-y-4 h-[55vh] 2xl:py-28">
          <div className="flex-grow space-y-4 bg-gray-100 px-8 flex flex-col items-center justify-center">
            <p>
              As widely publicized, our waterways are under immense stress from
              pollution which is exacerbated by climate change.
            </p>
            <p>
              Over the past year, we have been collecting regular samples from
              the (Colne, Stour, and Tollesbury), measuring levels of E. coli
              and Enterococcus. These microbes are indicators of water quality
              and are used by the UK Government to determine bathing water
              status.
            </p>
            <p>
              Your support is crucial in helping us achieve these goals and
              protect our waterways for future generations.
            </p>
          </div>
          <a
            className="p-4 mt-auto bg-orange-400 flex items-center justify-between text-lg"
            href={"https://click.hubbub.net/p/CRAP2024/"}
          >
            Learn More About the Project & Support Our Cause
            <ChevronRightIcon className="h-6 shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
};
