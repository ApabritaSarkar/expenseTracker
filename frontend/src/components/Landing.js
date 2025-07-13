import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IndianRupee, PieChart, Users } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="flex items-center justify-center space-x-4 mb-8">
          <IndianRupee className="w-16 h-16 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-6xl font-extrabold text-slate-800 dark:text-white leading-tight tracking-tighter">
            ExpenseWise
          </h1>
        </div>

        <p className="mt-4 text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Take control of your finances with ExpenseWise. 
          Track spending, analyze trends, and manage your budget effortlessly with smart insights and intuitive visualizations.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/login"
              className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300 flex items-center justify-center gap-3"
            >
              <Users className="w-5 h-5" />
              Login
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/register"
              className="px-8 py-4 bg-white text-indigo-600 text-lg font-semibold rounded-lg shadow-lg hover:bg-indigo-50 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 transition duration-300 flex items-center justify-center gap-3"
            >
              <PieChart className="w-5 h-5" />
              Register
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Landing;