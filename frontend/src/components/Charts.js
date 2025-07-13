import React from "react";
import { PieChart, Pie, Cell, Tooltip, BarChart, XAxis, YAxis, Bar, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

// Sample gradient color palette
const COLORS = ["#6366F1", "#8B5CF6", "#A78BFA", "#C4B5FD", "#DDD6FE"];

const Charts = ({ data = [] }) => {
  // Safely handle undefined or null data
  const safeData = Array.isArray(data) ? data : [];

  // Group data by category
  const categoryData = Object.values(
    safeData.reduce((acc, expense) => {
      const cat = expense.category || "Other";
      acc[cat] = acc[cat] || { name: cat, value: 0 };
      acc[cat].value += Number(expense.amount);
      return acc;
    }, {})
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      // Updated container styles for charts section
      className="grid md:grid-cols-2 gap-10" 
    >
      {/* Pie Chart */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl transition-all duration-300">
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Expenses by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {categoryData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl transition-all duration-300">
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Spending Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Bar dataKey="value" fill="#6366F1" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default Charts;