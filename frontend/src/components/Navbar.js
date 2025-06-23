import React from 'react';
import { FaRocket, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <FaRocket className="text-white" />
          <span>Student Budget Pro</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:block">Hi, --Name--!</span>
          <button
            className="p-2 rounded-full border border-white hover:bg-white hover:text-indigo-600 transition"
            title="Logout"
          >
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
