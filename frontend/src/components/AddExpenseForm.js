import React, { useState } from 'react';

const AddExpenseForm = ({ onExpenseAdded }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const expenseData = { amount: parseFloat(amount), category, date };

    try {
      const response = await fetch('http://localhost:5000/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expenseData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to save');

      alert('Expense added successfully!');
      setAmount('');
      setCategory('Food');
      setDate('');
            onExpenseAdded();  // 🔁 trigger refresh

      // Optionally call parent function to refetch data
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        ➕ Add New Expense
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="number"
          step="0.01"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="form-input"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-select"
        >
          <option value="Food">🍔 Food</option>
          <option value="Transport">🚌 Transport</option>
          <option value="Books">📚 Books</option>
          <option value="Entertainment">🎮 Entertainment</option>
          <option value="Others">💼 Others</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="form-input"
        />

        <button
          type="submit"
          className="md:col-span-3 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition w-full"
        >
          💾 Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
