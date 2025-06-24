import React from "react";
import { motion } from "framer-motion";
import { FileDown, FileSpreadsheet, FileBarChart } from "lucide-react";

const DownloadButtons = () => {
  const handleDownload = async (type) => {
    const endpoint = `http://localhost:5000/api/export/${type}`;
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
      className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 mt-6 max-w-xl mx-auto"
    >
      <h2 className="text-lg font-semibold text-slate-700 dark:text-white mb-4 flex items-center gap-2">
        <FileDown className="w-5 h-5 text-indigo-500" />
        Export Your Data
      </h2>

      <div className="flex gap-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleDownload("csv")}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
        >
          <FileSpreadsheet className="w-4 h-4" />
          Download CSV
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleDownload("excel")}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow"
        >
          <FileBarChart className="w-4 h-4" />
          Download Excel
        </motion.button>
      </div>
    </motion.div>
  );
};

export default DownloadButtons;
