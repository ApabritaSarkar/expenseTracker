import React, { useState } from "react";
import { motion } from "framer-motion";
import { IndianRupee, Calendar, Tag } from "lucide-react";
import axios from "axios";
import VoiceInput from "./VoiceInput";

const categoryOptions = [
  "Food",
  "Transport",
  "Books",
  "Entertainment",
  "Others",
];

const AddExpenseForm = ({ onAddExpense }) => {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amount || !formData.category || !formData.date) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/expenses",
        formData,
        { withCredentials: true }
      );
      onAddExpense && onAddExpense(res.data.expense);
      setFormData({ amount: "", category: "", date: "" });
    } catch (err) {
      console.error("Error adding expense:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 max-w-xl mx-auto mt-6"
    >
      <h2 className="text-xl font-semibold mb-4 text-slate-700 dark:text-white">
        Add New Expense
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount */}
        <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm">
          <IndianRupee className="w-5 h-5 text-slate-500 mr-2" />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full bg-transparent outline-none text-slate-800 dark:text-white placeholder-slate-400"
          />
        </div>

        {/* Category Dropdown */}
        <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm bg-slate-100 dark:bg-slate-800">
          <Tag className="w-5 h-5 text-slate-500 mr-2" />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-transparent outline-none text-slate-800 dark:text-white placeholder-slate-400"
          >
            <option
              value=""
              disabled
              className="text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800"
            >
              Select category
            </option>
            {categoryOptions.map((cat) => (
              <option
                key={cat}
                value={cat}
                className="text-slate-800 dark:text-white bg-white dark:bg-slate-800"
              >
                {cat}
              </option>
            ))}
          </select>
        </div>

        <VoiceInput
          onVoiceResult={(parsed) =>
            setFormData((prev) => ({
              ...prev,
              ...parsed,
            }))
          }
        />

        {/* Date */}
        <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm">
          <Calendar className="w-5 h-5 text-slate-500 mr-2" />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full bg-transparent outline-none text-slate-800 dark:text-white placeholder-slate-400"
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full mt-4 bg-indigo-600 text-white font-medium py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Add Expense
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddExpenseForm;
