import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react";
import { motion } from "framer-motion";

const Register = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        form,
        { withCredentials: true } // important if backend uses cookies
      );

      setMessage("✅ User registered! Redirecting to login...");
      setForm({ username: "", password: "" });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error(
        "Registration failed:",
        error?.response?.data || error.message
      );
      setMessage("❌ Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        // Enhanced container styles
        className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-10 transition-all duration-300"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-slate-800 dark:text-white">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Input */}
          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition-all duration-200">
            <User className="w-5 h-5 text-slate-500 dark:text-slate-400 mr-4" />
            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-slate-800 dark:text-white placeholder-slate-400 font-medium"
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition-all duration-200">
            <Lock className="w-5 h-5 text-slate-500 dark:text-slate-400 mr-4" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-slate-800 dark:text-white placeholder-slate-400 font-medium"
            />
          </div>

          {/* Registration Message (Success/Error) */}
          {message && (
            <p
              className={`text-sm font-medium text-center ${
                message.startsWith("✅") ? "text-green-600" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold transition-all duration-300 shadow-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white transform hover:scale-105"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;