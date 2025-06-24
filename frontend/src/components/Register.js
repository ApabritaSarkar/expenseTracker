import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      setMessage("User registered! You can now login.");
    } catch {
      setMessage("Username may already exist.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-slate-700 dark:text-white">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          placeholder="Username"
          className="w-full p-2 border rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded-lg"
          onChange={handleChange}
        />
        {message && <p className="text-sm text-blue-600 dark:text-blue-400">{message}</p>}
        <button className="w-full bg-green-600 text-white py-2 rounded-lg">Register</button>
      </form>
    </div>
  );
};

export default Register;
