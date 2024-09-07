import { Link } from "@tanstack/react-router";
import { HomeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconIconSolid,
  MapPinIcon as MapPinIconSolid,
} from "@heroicons/react/24/solid";
// @ts-expect-error todo fix me
import MicroscopeSvg from "../../assets/abstract-logo.svg?react";
import classNames from "classnames";
import { MapSearch } from "../../routes/map";

interface NavItemProps {
  to: string;
  search?: MapSearch;
  activeIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  inactiveIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
}
const NavItem = ({
  to,
  search,
  activeIcon: ActiveIcon,
  inactiveIcon: InactiveIcon,
  label,
}: NavItemProps) => (
  <Link to={to} search={search}>
    {({ isActive }) => (
      <span
        className={classNames(
          "flex flex-col items-center sm:flex-row sm:gap-2 sm:border-2 sm:border-blue-400 sm:px-2 sm:rounded-lg sm:py-1 sm:text-lg",
          { " sm:bg-blue-400 sm:border-blue-400": isActive }
        )}
      >
        {isActive ? (
          <>
            <ActiveIcon className="h-8 sm:h-6 text-blue-400 sm:text-white" />
            <b className="text-blue-400 sm:text-white">{label}</b>
          </>
        ) : (
          <>
            <InactiveIcon className="h-8 sm:h-6 sm:text-blue-400" />
            <span className="sm:text-blue-400">{label}</span>
          </>
        )}
      </span>
    )}
  </Link>
);

export const NavBar = () => {
  return (
    <>
      <nav className="p-2 text-xs flex justify-between items-center">
        <div className="flex gap-2 items-center justify-center bg-black text-white text-sm p-4 py-2">
          <MicroscopeSvg className="h-4 w-4 -ml-2" />
          <span className="sm:hidden">CRAP</span>
          <span className="hidden sm:flex">Colne River Assessment Project</span>
        </div>
        <div className="space-x-8 flex mr-2">
          <NavItem
            to="/"
            activeIcon={HomeIconIconSolid}
            inactiveIcon={HomeIcon}
            label="About"
          />
          <NavItem
            to="/map"
            search={{ parameter: "NFP_ENT" }}
            activeIcon={MapPinIconSolid}
            inactiveIcon={MapPinIcon}
            label="Map"
          />
        </div>
      </nav>
      <div className="border-b mx-2 mt-1" />
    </>
  );
};
