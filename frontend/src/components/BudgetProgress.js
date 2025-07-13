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
      // Enhanced container styles: polished shadow and rounding
      className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 transition-all duration-300"
    >
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
        Monthly Budget
      </h2>

      <div className="text-sm text-slate-600 dark:text-slate-300 mb-2">
        Total Spent: <span className="font-bold text-indigo-600 dark:text-indigo-400">₹{totalSpent}</span>
      </div>
      <div className="text-sm text-slate-600 dark:text-slate-300 mb-4">
        Remaining: <span className="font-bold text-emerald-600 dark:text-emerald-400">₹{remaining}</span>
      </div>

      {/* Enhanced Progress Bar */}
      <div className="w-full h-8 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentUsed}%` }}
          transition={{ duration: 0.8 }}
          className="h-full bg-indigo-500 rounded-full"
        />
      </div>
      <div className="mt-4 text-center text-sm font-medium text-slate-700 dark:text-slate-300">
        {percentUsed.toFixed(0)}% Used
      </div>
    </motion.div>
  );
};

export default BudgetProgress;