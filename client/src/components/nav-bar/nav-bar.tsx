import { Link } from '@tanstack/react-router';
import {
  EnvelopeIcon,
  HomeIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconIconSolid,
  MapPinIcon as MapPinIconSolid,
  EnvelopeIcon as EnvelopeIconSolid,
} from '@heroicons/react/24/solid';
// @ts-expect-error todo fix me
import MicroscopeSvg from '../../assets/abstract-logo.svg?react';
import classNames from 'classnames';
import { MapSearch } from '../../routes/map/route';
import { Section } from '../layout/section';

type Icon = React.ForwardRefExoticComponent<
  Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
    title?: string;
    titleId?: string;
  } & React.RefAttributes<SVGSVGElement>
>;

interface NavItemProps {
  to: string;
  search?: MapSearch;
  activeIcon: Icon;
  inactiveIcon: Icon;
  label: string;
}

const NavItem = ({
  to,
  search,
  activeIcon: ActiveIcon,
  inactiveIcon: InactiveIcon,
  label,
}: NavItemProps) => (
  <Link to={to} search={search} activeOptions={{ includeSearch: false }}>
    {({ isActive }) => (
      <span
        className={classNames(
          'flex flex-col items-center sm:flex-row sm:gap-2 sm:border-2 sm:border-orange-500 sm:px-4 sm:py-2 sm:text-xl',
          { 'sm:border-orange-500 sm:bg-orange-500': isActive }
        )}
      >
        {isActive ? (
          <>
            <ActiveIcon className="h-8 text-orange-500 sm:h-6 sm:text-white" />
            <b className="text-orange-500 sm:text-white">{label}</b>
          </>
        ) : (
          <>
            <InactiveIcon className="h-8 sm:h-6 sm:text-orange-500" />
            <span className="sm:text-orange-500">{label}</span>
          </>
        )}
      </span>
    )}
  </Link>
);

export const NavBar = () => {
  return (
    <>
      <Section
        as="nav"
        className={classNames('flex items-center justify-between text-xs')}
      >
        <div className="sm:text-md flex items-center justify-center gap-2 bg-black p-4 py-2 text-sm text-white sm:py-3">
          <MicroscopeSvg className="-ml-2 h-4 w-4" />
          <span className="lg:hidden">CRAP</span>
          <span className="hidden md:text-lg lg:flex">
            Colne River Assessment Project
          </span>
        </div>
        <div className="mr-2 flex space-x-8 sm:space-x-4 2xl:mr-0">
          <NavItem
            to="/"
            activeIcon={HomeIconIconSolid}
            inactiveIcon={HomeIcon}
            label="About"
          />
          <NavItem
            to="/map"
            search={{ parameter: 'NFP_ENT' }}
            activeIcon={MapPinIconSolid}
            inactiveIcon={MapPinIcon}
            label="Map"
          />
          <NavItem
            to="/contact"
            activeIcon={EnvelopeIconSolid}
            inactiveIcon={EnvelopeIcon}
            label="Contact"
          />
        </div>
      </Section>
      <div className="mx-2 mt-1 border-b 2xl:border-none" />
    </>
  );
};
