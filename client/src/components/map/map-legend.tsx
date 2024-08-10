import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { gradeMap } from "./map.types";

export const Legend = () => {
  const map = useMap();
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    const handleMove = () => {
      setPosition([map.getCenter().lat, map.getCenter().lng]);
    };

    map.on("move", handleMove);
    handleMove();

    return () => {
      map.off("move", handleMove);
    };
  }, [map]);

  const grades = Object.keys(gradeMap).map(Number);

  return (
    position && (
      <div className="leaflet-bottom leaflet-right">
        <div className="bg-white py-3 px-6 m-1 md:mb-8 rounded-lg shadow-lg text-sm">
          <h4 className="font-bold mb-2">Classification</h4>
          <div className="flex gap-x-4 md:flex-col md:gap-x-0">
            {grades.map((grade) => (
              <div key={grade} className="flex items-center mb-1">
                <span
                  className="w-4 h-4 mr-2 inline-block rounded"
                  style={{ backgroundColor: gradeMap[grade].color }}
                ></span>
                <span>{gradeMap[grade].label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};
