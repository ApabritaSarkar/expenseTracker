import React, { useEffect, useState } from "react";
import axios from "axios";
import AddExpenseForm from "./AddExpenseForm";
import Charts from "./Charts";
import BudgetProgress from "./BudgetProgress";
import AIAdvisor from "./AIAdvisor";
import DownloadButtons from "./DownloadButtons";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/expenses", {
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
    <main className="container mx-auto px-4 py-6">
      <AddExpenseForm onAddExpense={handleAddExpense} />
      <BudgetProgress expenses={expenses} />
      <Charts data={expenses} />
      <DownloadButtons data={expenses} />
      <AIAdvisor expenses={expenses} />
    </main>
  );
};

export default Dashboard;
