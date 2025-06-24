import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate(); // ✅ Correctly placed inside the component

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  // Redirect if already logged in
  if (user) return <Navigate to="/" />;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.username, form.password);
      navigate("/"); // redirect after login
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-slate-700 dark:text-white">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg text-slate-800 dark:text-white dark:bg-slate-700"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg text-slate-800 dark:text-white dark:bg-slate-700"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
