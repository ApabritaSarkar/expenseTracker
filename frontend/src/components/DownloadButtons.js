import React from 'react';
import { FaFileCsv, FaFileExcel } from 'react-icons/fa';

const DownloadButtons = () => {
  const baseURL = 'http://localhost:5000/export';

  const downloadCSV = () => {
    window.location.href = `${baseURL}/csv`;
  };

  const downloadExcel = () => {
    window.location.href = `${baseURL}/excel`;
  };

  return (
    <div className="flex gap-4 justify-center flex-wrap">
      <button
        onClick={downloadCSV}
        className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md transition"
      >
        <FaFileCsv /> Download CSV
      </button>

      <button
        onClick={downloadExcel}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
      >
        <FaFileExcel /> Download Excel
      </button>
    </div>
  );
};

export default DownloadButtons;
