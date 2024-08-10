import { Link } from "@tanstack/react-router";
import essexLogo from "../../assets/essex-logo.png";
import { HomeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconIconSolid,
  MapPinIcon as MapPinIconSolid,
} from "@heroicons/react/24/solid";

export const NavBar = () => {
  return (
    <>
      <nav className="p-2 text-xs flex justify-between items-center">
        <img src={essexLogo} alt="Essex logo" className="w-28" />
        <div className="space-x-8 flex mr-2">
          <Link to="/" className="flex flex-col items-center justify-center">
            {({ isActive }) => {
              if (isActive) {
                return (
                  <>
                    <HomeIconIconSolid className="h-8 text-blue-400" />
                    <b className="text-blue-400">About</b>
                  </>
                );
              } else
                return (
                  <>
                    <HomeIcon className="h-8" />
                    <span>About</span>
                  </>
                );
            }}
          </Link>
          <Link
            to="/viewer"
            search={{ parameter: "NFP_ENT" }}
            className="flex flex-col items-center justify-center"
          >
            {({ isActive }) => {
              if (isActive) {
                return (
                  <>
                    <MapPinIconSolid className="h-8 text-blue-400" />
                    <b className="text-blue-400">Map</b>
                  </>
                );
              } else
                return (
                  <>
                    <MapPinIcon className="h-8" />
                    <span>Map</span>
                  </>
                );
            }}
          </Link>
        </div>
      </nav>
      <div className="border-b mx-2 mt-1" />
    </>
  );
};
