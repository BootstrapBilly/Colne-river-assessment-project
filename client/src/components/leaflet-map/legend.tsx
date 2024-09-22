import { useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { gradeMap } from './leaflet-map.types';

export const Legend = () => {
  const map = useMap();
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    const handleMove = () => {
      setPosition([map.getCenter().lat, map.getCenter().lng]);
    };

    map.on('move', handleMove);
    handleMove();

    return () => {
      map.off('move', handleMove);
    };
  }, [map]);

  const grades = Object.keys(gradeMap).map(Number);

  return (
    position && (
      <div className="leaflet-bottom leaflet-right">
        <div className="m-1 rounded-lg bg-white px-6 py-3 text-sm shadow-lg md:mb-8">
          <h4 className="mb-2 font-bold">Classification</h4>
          <div className="flex gap-x-4 md:flex-col md:gap-x-0">
            {grades.map((grade) => (
              <div key={grade} className="mb-1 flex items-center">
                <span
                  className="mr-2 inline-block h-4 w-4 rounded"
                  style={{
                    backgroundColor: gradeMap[grade].color,
                  }}
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
