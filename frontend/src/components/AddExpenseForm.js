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
  "Medicine",
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
`${process.env.REACT_APP_API_URL}/api/expenses`,
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
      // Enhanced container styles: refined shadow and background
      className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 transition-all duration-300"
    >
      <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">
        Add New Expense
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Amount Input */}
        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition-all duration-200">
          <IndianRupee className="w-5 h-5 text-slate-500 dark:text-slate-400 mr-4" />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full bg-transparent outline-none text-slate-800 dark:text-white placeholder-slate-400 font-medium text-lg"
          />
        </div>

        {/* Category Dropdown */}
        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3 shadow-sm bg-slate-100 dark:bg-slate-800">
          <Tag className="w-5 h-5 text-slate-500 dark:text-slate-400 mr-4" />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-transparent outline-none text-slate-800 dark:text-white dark:placeholder-slate-400 font-medium"
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

        {/* Voice Input Integration */}
        <VoiceInput
          onVoiceResult={(parsed) =>
            setFormData((prev) => ({
              ...prev,
              ...parsed,
            }))
          }
        />

        {/* Date Input */}
        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition-all duration-200">
          <Calendar className="w-5 h-5 text-slate-500 dark:text-slate-400 mr-4" />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full bg-transparent outline-none text-slate-800 dark:text-white placeholder-slate-400 font-medium"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full mt-6 bg-indigo-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
        >
          Add Expense
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddExpenseForm;