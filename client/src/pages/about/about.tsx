import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Link } from "@tanstack/react-router";
import LandingImage from "../../assets/bg.jpeg";
import axios, { AxiosResponse } from "axios";
import {
  DataSampleWithLatNLong,
  DataSample,
  hasLatNLong,
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
    Array<DataSampleWithLatNLong>
  >({
    queryKey: ["MapData", { parameter: defaultSpecimin }],
    queryFn: () => axios.get(`${apiUrl}/data?parameter=${defaultSpecimin}`),
    select: ({ data }) => data.filter((site) => hasLatNLong(site)),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="hidden sm:flex flex-col max-w-[1300px] mx-auto">
      <div className="relative w-full h-[40vh] lg:h-[35vh] 2xl:h-[50vh]">
        <img
          src={LandingImage}
          alt="An essex waterway"
          className="w-full h-full object-cover object-bottom"
        />
        <h1 className="text-2xl font-bold absolute -bottom-7 shadow-2xl left-[5%] 2xl:right-[5%] transform translate-x-[-5%] text-center  bg-black text-white p-4 lg:max-w-[55%]">
          Monitoring biodiversity and water quality in East Essex and Suffolk
        </h1>
      </div>
      {/* IPad in portrait mode */}
      <div className="lg:hidden p-12 mt-4 flex flex-col h-full">
        <div className="flex flex-col space-y-4">
          <p>
            As widely publicized, our waterways are under immense stress from
            pollution which is exacerbated by climate change.
          </p>
          <p>
            Over the past year, we have been collecting regular samples from the
            (Colne, Stour, and Tollesbury), measuring levels of E. coli and
            Enterococcus. These microbes are indicators of water quality and are
            used by the UK Government to determine bathing water status.
          </p>
          <p>
            Your support is crucial in helping us achieve these goals and
            protect our waterways for future generations.
          </p>
        </div>
        <div className="mt-12">
          <a
            className="p-4 bg-orange-400 flex items-center justify-between text-lg mx-8"
            href={"https://click.hubbub.net/p/CRAP2024/"}
          >
            Learn More About the Project & Support Our Cause
            <ChevronRightIcon className="h-6 shrink-0" />
          </a>
        </div>
      </div>
      <div className="grid grid-cols-12 p-8 mt-4 2xl:px-0">
        <div className="col-span-7">
          {/* desktop*/}
          <div className="hidden lg:flex flex-col h-full">
            <div className="flex flex-col space-y-5  p-4 2xl:px-0 mx-4">
              <i className="text-lg text-gray-400">
                As widely publicized, our waterways are under immense stress
                from pollution which is exacerbated by climate change.
              </i>
              <div className="p-8 py-4 bg-gray-200">
                <p>
                  Over the past year, we have been collecting and analysing
                  samples from the Colne, Stour, and Tollesbury rivers,
                  measuring levels of E. coli and Enterococcus.
                </p>
                <p className="mt-4">
                  These microbes are indicators of water quality and are used by
                  the UK Government to determine bathing water status.
                </p>
              </div>
            </div>
            <div className="mt-4">
              <a
                className="p-4 bg-orange-400 font-bold text-white flex items-center justify-center text-lg hover:bg-orange-500 transition duration-300"
                href={"https://click.hubbub.net/p/CRAP2024/"}
              >
                Learn More About the Project & Support Our Cause
                <ChevronRightIcon className="h-6 ml-2" />
              </a>
            </div>
          </div>
        </div>
        <div className="col-span-5 relative">
          <div className="flex justify-end items-end">
            <div className="relative hidden lg:flex justify-center items-end">
              <Link
                className="absolute z-[99999999] p-4 -bottom-[1.9rem] text-white text-lg bg-black/90 hover:bg-black font-bold flex items-center justify-center"
                to={"/map"}
                search={{ parameter: "NFP_ENT" }}
              >
                Explore bacteria hotspots
                <ChevronRightIcon className="h-6 ml-2" />
              </Link>
              <LeafletMap
                className="md:h-[18rem] md:w-[22rem] xl:h-[20rem] xl:w-[26rem] rounded-2xl shadow-2xl"
                data={mapDataQuery.data}
                isError={mapDataQuery.isError}
                isLoading={mapDataQuery.isLoading}
                parameter={defaultSpecimin}
                startingPosition={{
                  zoom: 9.8,
                  center: [51.85, 1.0],
                }}
                enablePopups={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
