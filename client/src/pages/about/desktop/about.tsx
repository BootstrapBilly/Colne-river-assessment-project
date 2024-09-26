import { Link } from '@tanstack/react-router';

import MapPreviewPng from '../../../assets/map-preview.png';
import { AboutIpadPortrait as IpadPortrait } from './about.ipad-portrait';
import { Section } from '../../../components/layout/section';

export const About = () => {
  return (
    <div className="hidden flex-col overflow-x-hidden sm:flex">
      <div className="relative w-full lg:h-[70vh] 2xl:left-1/2 2xl:h-[60vh] 2xl:w-screen 2xl:-translate-x-1/2 2xl:transform">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="bg-first-frame.jpg"
        >
          <source src={'bg.mp4'} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="mt-4 flex h-full flex-col p-12 lg:hidden">
        <IpadPortrait />
      </div>

      <Section className="relative">
        <h1 className="absolute -top-16 bg-black p-4 text-center text-2xl font-bold text-white shadow-2xl lg:max-w-[600px]">
          Monitoring biodiversity and water quality in East Essex and Suffolk
        </h1>
        <div className="py-20">
          <h2 className="text-xl font-bold">Our mission</h2>
          <p className="mt-8 font-oswald text-2xl text-gray-400">
            As widely publicized, our waterways are under immense stress from
            pollution. Over the past year, we have been collecting regular
            samples from the (Colne, Stour, and Tollesbury), measuring levels of{' '}
            <b>E. coli</b> and <b>Enterococcus</b>. We are gathering critical
            information to protect and improve these vital ecosystems for the
            benefit of our community and future generations
          </p>
          <div className="mt-10">
            <a
              className="flex justify-center bg-orange-500 p-6 text-2xl text-white shadow-sm hover:bg-orange-600 hover:shadow-lg"
              href={'https://click.hubbub.net/p/CRAP2024/'}
            >
              Learn More About the Project & Support Our Cause
            </a>
          </div>
        </div>
      </Section>

      <div className="w-screen bg-gray-100/50 py-20">
        <Section>
          <Link to={'/map'} search={{ parameter: 'NFP_ENT' }} className="group">
            <p className="text-xl transition duration-300 group-hover:text-orange-500">
              Explore Bacteria Hotspots on Our Interactive River Map!
            </p>
            <img
              src={MapPreviewPng}
              className="mt-8 rounded-xl border-4 border-orange-500/10 shadow-xl transition duration-300 group-hover:bg-orange-500/30"
            />
          </Link>
        </Section>
      </div>
    </div>
  );
};
