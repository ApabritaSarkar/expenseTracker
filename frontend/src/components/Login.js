import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Already logged in? Redirect to dashboard
  if (user) return <Navigate to="/dashboard" />;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(form.username, form.password);
      navigate("/dashboard"); // Updated redirect path
    } catch {
      setError("❌ Invalid username or password.");
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
          Login to ExpenseWise
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Input */}
          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition-all duration-200">
            <User className="w-5 h-5 text-slate-500 dark:text-slate-400 mr-4" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-slate-800 dark:text-white placeholder-slate-400 font-medium"
            />
          </div>

          {/* Password Input with Toggle */}
          <div className="relative flex items-center border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition-all duration-200">
            <Lock className="w-5 h-5 text-slate-500 dark:text-slate-400 mr-4" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-slate-800 dark:text-white placeholder-slate-400 font-medium pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-slate-500 dark:text-slate-300 hover:text-indigo-600 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-sm text-red-500 text-center font-medium">{error}</p>}

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
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;