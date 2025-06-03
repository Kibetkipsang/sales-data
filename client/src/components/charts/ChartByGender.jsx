import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

// define color palletes for the gender slices
const COLORS = ["#16A34A", "#4ADE80", "#BBF7D0"];

export default function ChartByGender({data=[]}){

    return(
        <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Sales By Gender</h3>
            {data.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                    data={data}
                    dataKey="total"
                    nameKey="gender"
                    cx = "50%"
                    cy = "50%"
                    outerRadius = {100}
                    innerRadius = {50}
                    fill="#16A34A" 
                    label = {(gender, percent) => `${gender} ${(percent * 100).toFixed(0)}%`}
                    >
                        {/* map through data to apply the colors */}
                        {data.map((entry, index) => (
                            <Cell
                            key = {`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip
              formatter={(value) => [`$${value.toLocaleString()}`, "Sales"]}
            />
                <Legend />
                </PieChart>
            </ResponsiveContainer>
            ) : (<p className="text-gray-500">No data Available!</p>)}
        </div>
    )
}