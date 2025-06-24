import React from "react";
import { Brain, AlertCircle, PiggyBank } from "lucide-react";
import { motion } from "framer-motion";

const AIAdvisor = ({ expenses }) => {
  if (!expenses || expenses.length === 0) return null;

  // Total spent
  const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  // Group by category
  const categoryStats = {};
  expenses.forEach((e) => {
    const cat = e.category || "Other";
    categoryStats[cat] = (categoryStats[cat] || 0) + Number(e.amount);
  });

  const topCategory = Object.entries(categoryStats).sort((a, b) => b[1] - a[1])[0];

  // Advice logic
  const insights = [];

  if (totalSpent > 9000) {
    insights.push({
      icon: <AlertCircle className="text-red-500 w-5 h-5" />,
      text: "You’ve spent over 90% of your ₹10,000 budget!",
    });
  } else if (totalSpent > 7000) {
    insights.push({
      icon: <AlertCircle className="text-yellow-500 w-5 h-5" />,
      text: "You're approaching your budget limit. Spend carefully.",
    });
  }

  if (topCategory) {
    insights.push({
      icon: <PiggyBank className="text-emerald-500 w-5 h-5" />,
      text: `Most spent on "${topCategory[0]}" → ₹${topCategory[1]}`,
    });
  }

  if (totalSpent < 3000) {
    insights.push({
      icon: <Brain className="text-indigo-500 w-5 h-5" />,
      text: "Great job! You're keeping your expenses low this month.",
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 mt-6 max-w-xl mx-auto"
    >
      <h2 className="text-lg font-semibold text-slate-700 dark:text-white mb-4 flex items-center gap-2">
        <Brain className="w-5 h-5 text-indigo-500" />
        Smart Advisor
      </h2>

      <ul className="space-y-3 text-slate-700 dark:text-slate-300 text-sm">
        {insights.map((insight, index) => (
          <li key={index} className="flex items-start gap-2">
            {insight.icon}
            <span>{insight.text}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default AIAdvisor;
