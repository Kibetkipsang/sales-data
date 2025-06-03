// SidebarFilters.jsx
import React, { useState } from "react";
import axios from "../api/axios";
import SalesUpload from "./SalesUpload";

export default function SidebarFilters({ filters, setFilters }) {
  const [downloading, setDownloading] = useState(false); // UI state for download status

  // Trigger CSV download from the server
  const handleDownload = async () => {
    try {
      setDownloading(true);
      const response = await axios.get("/download-report", {
        responseType: "blob", // Handle file download
      });

      // Create temporary link and download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "sales_report.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert("Failed to download report.");
    } finally {
      setDownloading(false);
    }
  };

  // Handle dropdown filter changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <aside className="w-64 bg-white shadow-md p-4 hidden md:block sticky top-0 h-screen overflow-y-auto">
      {/* Sidebar Title */}
      <h2 className="text-lg font-semibold text-green-800 mb-4">Filters</h2>

      {/* Upload Section (collapsible inside SalesUpload component) */}
      <SalesUpload />

      {/* Download Button */}
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded text-sm mb-4"
      >
        {downloading ? "Downloading..." : "Download Report"}
      </button>

      {/* Gender Filter */}
      <div className="mb-4">
        <label htmlFor="gender" className="block text-green-700 font-medium mb-1">
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={filters.gender}
          onChange={handleChange}
          className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500"
        >
          <option value="All">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      {/* Payment Method Filter */}
      <div className="mb-4">
        <label htmlFor="payment_method" className="block text-green-700 font-medium mb-1">
          Payment Method
        </label>
        <select
          id="payment_method"
          name="payment_method"
          value={filters.payment_method}
          onChange={handleChange}
          className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500"
        >
          <option value="All">All</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Cash">Cash</option>
          <option value="M-Pesa">M-Pesa</option>
          <option value="E-Wallet">E-Wallet</option>
        </select>
      </div>

      {/* Product Category Filter */}
      <div className="mb-4">
        <label htmlFor="category" className="block text-green-700 font-medium mb-1">
          Product Category
        </label>
        <select
          id="category"
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500"
        >
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Home">Home</option>
          <option value="Health">Health</option>
        </select>
      </div>
    </aside>
  );
}
