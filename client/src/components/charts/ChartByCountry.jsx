import React from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
} from "react-simple-maps";

// defining world map topo json source
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function ChartByCountry({data=[]}){

    const countrySalesMap = {};
    data.forEach(({ country, total }) => {
    countrySalesMap[country] = total;
  });

    return(
        <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Sales By Country</h3>
            <div className="w-full h-[400px]">
                <ComposableMap projection="geoMercator" projectionConfig={{ scale: 100 }}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryName = geo.properties.NAME;
                const value = countrySalesMap[countryName] || 0;

                // Determine color shade based on value
                const fillColor =
                  value > 10000
                    ? "#065F46" // darkest green
                    : value > 5000
                    ? "#10B981"
                    : value > 1000
                    ? "#6EE7B7"
                    : "#E5E7EB"; // light gray if 0

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fillColor}
                    stroke="#FFFFFF"
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "#FACC15", outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
            </div>
        </div>
    )
}