import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend
} from "recharts";

const COLORS = {
    Male: "#10B981",
    Female: "#6EE7B7",
}

export default function ChartByAgeGroup({data=[]}){

    return(
        <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Sales By Age Group And Gender</h3>
            {data.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                    data={data}
                    margin={{top : 20, right : 30, left: 0, bottom : 5}}
                    >
                        <CartesianGrid StrokeDasharray="3 3"/>
                        <XAxis dataKey ="age_group" stroke="#4B5563" />
                        <YAxis stroke="#4B5563"/>
                        <Tooltip />
                        <Legend />
                        {Object.keys(COLORS).map((gender) => (
                        <Line
                        key={gender}
                        type="monotone"
                        dataKey={gender}
                        stroke={COLORS[gender]}
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                        />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            ) : (<p className="text-gray-500">No data available!</p>)}
        </div>
    )
}