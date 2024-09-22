import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link } from '@tanstack/react-router';

export const AboutMobile = () => {
  return (
    <div className="sm:hidden">
      <div className="flex flex-col gap-y-4 p-4 md:px-0">
        <strong className="font-light text-gray-400">
          Colne River Assessment Project
        </strong>
        <h1 className="text-2xl font-bold">
          Monitoring biodiversity and water quality in East Essex and Suffolk
        </h1>
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
        <Link
          className="my-2 flex items-center justify-between bg-blue-400 p-4 text-lg md:mx-12"
          to={'/map'}
          search={{ parameter: 'NFP_ENT' }}
        >
          Explore bacteria hotspots <ChevronRightIcon className="h-6" />
        </Link>
      </div>
      <div className="flex h-full flex-col gap-y-4 bg-gray-300 p-8">
        <p>
          Your support will help us gather critical information to protect and
          improve these vital ecosystems for the benefit of our community and
          future generations.
        </p>
      </div>
      <a
        className="mx-4 my-8 flex items-center justify-between bg-orange-400 p-4 text-lg md:mx-12"
        href={'https://click.hubbub.net/p/CRAP2024/'}
      >
        Learn More About the Project & Support Our Cause
        <ChevronRightIcon className="h-6 shrink-0" />
      </a>
    </div>
  );
};
