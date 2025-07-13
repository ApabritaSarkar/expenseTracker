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
      // Enhanced container styles: polished shadow and rounding
      className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 transition-all duration-300"
    >
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
        AI Insights
      </h2>
      <ul className="space-y-4">
        {insights.map((insight, index) => (
          <li key={index} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
            <span className="flex-shrink-0 mt-1">{insight.icon}</span>
            <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
              {insight.text}
            </p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default AIAdvisor;