import React, { useEffect, useState } from "react";
import axios from "axios";
import AddExpenseForm from "./AddExpenseForm";
import Charts from "./Charts";
import BudgetProgress from "./BudgetProgress";
import AIAdvisor from "./AIAdvisor";
import DownloadButtons from "./DownloadButtons";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/expenses`, {
          withCredentials: true,
        });
        setExpenses(res.data);
      } catch (err) {
        console.error("Failed to fetch expenses", err);
      }
    };

    fetchExpenses();
  }, []);

  const handleAddExpense = (newExpense) => {
    setExpenses((prev) => [...prev, newExpense]);
  };

  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-10"
    >
      <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white mb-10 tracking-tight">
        Dashboard
      </h1>

      {/* Top Section: Form, Budget, and Insights */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        
        {/* Expense Form (Full width on mobile, 1/3 on desktop) */}
        <div className="lg:col-span-1">
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </div>

        {/* Budget Progress (1/3 width) */}
        <div className="lg:col-span-1">
          <BudgetProgress expenses={expenses} />
        </div>

        {/* AI Advisor and Download Buttons (1/3 width) */}
        <div className="lg:col-span-1 flex flex-col space-y-8">
          <AIAdvisor expenses={expenses} />
          <DownloadButtons data={expenses} />
        </div>
      </section>

      {/* Bottom Section: Charts and Visualizations */}
      <section className="grid grid-cols-1 gap-8">
        <Charts data={expenses} />
      </section>
    </motion.main>
  );
};

export default Dashboard;