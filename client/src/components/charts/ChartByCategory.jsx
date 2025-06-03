import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function ChartByCategory({data = []}){

    return(
        <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg text-green-800 font-semibold mb-2">Sales By Category</h3>
            {/* if data is available show chart otherwise show fall back */}
            {data.category > 0 ? (
                <ResponsiveContainer>
                    <BarChart
                    data={data}
                    margin={{top : 20, right : 30, left : 0, bottom : 5}}
                    >
                    <CartesianGrid StrokeDasharray="3 3" />
                    <XAxis dataKey="category" stroke="#4B5563"/> 
                    <YAxis stroke="#4B5563"/>
                    <Tooltip /> 
                    <Bar dataKey="total" fill="#16A34A" barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            ) : (<p className="text-gray-500">No data available!</p>)}
        </div>
    )
}