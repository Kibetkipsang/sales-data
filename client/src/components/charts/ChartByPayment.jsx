import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";


const COLORS = ["#10B981", "#34D399", "#6EE7B7", "#D1FAE5"];
export default function ChartByPayment({data=[]}){

    return(
        <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg text-green-800 font-semibold mb-2">Sales By Payment Method</h3>
            {data.length > 0 ? (
                <ResponsiveContainer width="100%" height = {300}>
                    <PieChart>
                        <Pie
                        data={data}
                        dataKey="total"
                        nameKey="payment_method"
                        cx = "50%"
                        cy = "50%"
                        outerRadius = {100}
                        innerRadius = {50}
                        label={({ payment_method, percent }) =>
                         `${payment_method} (${(percent * 100).toFixed(0)}%)`}
                        >
                            {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}   
                />
                  ))}
                        </Pie>
                        <Tooltip
                        formatter={(value) => [`$${value.toLocaleString()}`, "Sales"]}
                        />
                        <Legend/>
                    </PieChart>
                </ResponsiveContainer>
            ) : (<p className="text-gray-500">No data available!</p>)}
        </div>
    )
}