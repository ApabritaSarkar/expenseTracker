import React from "react";
import { motion } from "framer-motion";
import { FileDown, FileSpreadsheet, FileBarChart } from "lucide-react";

const DownloadButtons = () => {
  const handleDownload = async (type) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/export/${type}`;
    try {
      const response = await fetch(endpoint, {
        method: "GET",
      });

      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      const filename = type === "csv" ? "expenses.csv" : "expenses.xlsx";

      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error downloading:", err);
      alert("Failed to download. Try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      // Enhanced container styles: polished shadow and rounding
      className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 transition-all duration-300"
    >
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
        <FileDown className="w-7 h-7 text-indigo-600" />
        Export Your Data
      </h2>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* CSV Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleDownload("csv")}
          className="flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg font-semibold transition-all duration-300"
        >
          <FileSpreadsheet className="w-5 h-5" />
          Download CSV
        </motion.button>

        {/* Excel Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleDownload("xlsx")}
          className="flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl shadow-lg font-semibold transition-all duration-300"
        >
          <FileBarChart className="w-5 h-5" />
          Download XLSX
        </motion.button>
      </div>
    </motion.div>
  );
};

export default DownloadButtons;