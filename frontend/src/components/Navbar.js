import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, LogIn, LogOut, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout, loading } = useAuth();

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-800 text-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50"
    >
      {/* Brand */}
      <div className="flex items-center space-x-3">
        <LayoutDashboard className="w-6 h-6 text-indigo-400" />
        <span className="text-xl font-semibold tracking-wide">
          ExpenseWise
        </span>
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-6 text-sm font-medium">
        <motion.div whileHover={{ scale: 1.1 }}>
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-indigo-300 transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
        </motion.div>

        {!loading && user ? (
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={logout}
            className="flex items-center gap-1 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </motion.button>
        ) : (
          <>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link
                to="/login"
                className="flex items-center gap-1 hover:text-indigo-300 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }}>
              <Link
                to="/register"
                className="flex items-center gap-1 hover:text-indigo-300 transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                Register
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
