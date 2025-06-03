// SalesUpload.jsx
// Upload button with toggle visibility, file preview, and refresh callback

import React, { useState } from "react";
import axios from "../api/axios"; // Global Axios config with JWT

export default function SalesUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);           // Store selected file
  const [status, setStatus] = useState("");         // Status message
  const [showUpload, setShowUpload] = useState(false); // Toggle form
  

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus("");
  };

  // Handle upload logic
  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    console.log("Uploading:", file);
    try {
      const response = await axios.post("/upload-sales", formData);
      setStatus(response.data.message || "Upload successful!");
      setFile(null);
      setShowUpload(false);

      // Refresh dashboard if callback is passed
      if (onUploadSuccess) onUploadSuccess();
    } catch (error) {
      setStatus(
        error.response?.data?.error || "An error occurred during upload."
      );
    }
  };

  return (
    <div className="mb-4">

      <button
        onClick={() => setShowUpload(!showUpload)}
        className="w-full bg-green-700 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded mb-2 text-sm"
      >
        {showUpload ? "Hide Upload Form" : "Upload Sales Data"}
      </button>

      {/* Upload Form */}
      {showUpload && (
        <div className="text-sm text-gray-700">
          <input
            type="file"
            accept=".csv, .xls, .xlsx"
            onChange={handleFileChange}
            className="mb-2 block w-full text-sm"
          />

          
          {file && (
            <p className="mb-2 text-gray-700">
              Selected: <span className="font-medium">{file.name}</span>
            </p>
          )}

          <button
            onClick={handleUpload}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded text-sm"
          >
            Submit File
          </button>
          {status && <p className="mt-2 text-gray-600">{status}</p>}
        </div>
      )}
    </div>
  );
}
