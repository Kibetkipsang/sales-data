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

export default function ChartMonthly({ data=[] }){

    return(
        <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Monthly Sales</h3>
            <ResponsiveContainer width="100%" height={300} >
                <BarChart
                data = {data}
                margin={{top : 20, right : 30, left : 0, bottom : 5}}
                >
            {/* Background grid lines */}
            <CartesianGrid StrokeDasharray="3 3" />
            {/* horizontal axis showing months names */}
            <XAxis dataKey="month" stroke="#4B5563" />
            {/* vertical axis showing the sales */}
            <YAxis stroke="#4B5563"/>
            {/* then tooltip to show values on hover */}
            <Tooltip />
            {/* bar to represent the sales */}
            <Bar dataKey="total" fill="#10B981" barSize={40} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}