import React from "react";
import { Link } from "react-router-dom";

export default function HomePage(){
    return(
        <>
        <div className="min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold mb-4">Sales Data Anaytst Platform</h1>
            <p className="text-lg mb-8 max-w-xl text-center"> Upload and analyze your business sales data easily. Get automatic reports, charts, and business insights.</p>
            <Link to="/login"
            className="bg-green-500 text-white px-6 py-3 rounded shadow hover:bg-green-700"
            >
                Company Login
            </Link>
        </div>
        </>
    )
}