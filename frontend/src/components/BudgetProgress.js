import React from "react";
import { motion } from "framer-motion";

const BudgetProgress = ({ expenses }) => {
  const totalSpent = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  const monthlyBudget = 10000;
  const percentUsed = Math.min((totalSpent / monthlyBudget) * 100, 100);
  const remaining = monthlyBudget - totalSpent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 mt-6 max-w-xl mx-auto"
    >
      <h2 className="text-lg font-semibold text-slate-700 dark:text-white mb-3">
        Monthly Budget Usage
      </h2>

      <div className="text-sm text-slate-600 dark:text-slate-300 mb-2">
        Total Spent: <span className="font-bold text-indigo-600 dark:text-indigo-400">₹{totalSpent}</span>
      </div>
      <div className="text-sm text-slate-600 dark:text-slate-300 mb-4">
        Remaining: <span className="font-bold text-emerald-600 dark:text-emerald-400">₹{remaining}</span>
      </div>

      <div className="w-full h-5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentUsed}%` }}
          transition={{ duration: 0.8 }}
          className={`h-full ${
            percentUsed < 75 ? "bg-indigo-500" : percentUsed < 100 ? "bg-yellow-500" : "bg-red-600"
          }`}
        />
      </div>

      <div className="text-right text-xs mt-1 text-slate-500 dark:text-slate-400">
        {Math.round(percentUsed)}% of ₹{monthlyBudget}
      </div>
    </motion.div>
  );
};

export default BudgetProgress;
