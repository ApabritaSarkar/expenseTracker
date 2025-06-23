import React, { useEffect, useState } from 'react';

const categories = {
  Food: { emoji: '🍔', color: 'bg-green-500', limit: 500 },
  Transport: { emoji: '🚌', color: 'bg-blue-400', limit: 300 },
  Books: { emoji: '📚', color: 'bg-yellow-400', limit: 200 },
  Entertainment: { emoji: '🎮', color: 'bg-red-500', limit: 400 },
  Others: { emoji: '💼', color: 'bg-gray-500', limit: 250 },
};

const BudgetProgress = ({ refresh }) => {
  const [totals, setTotals] = useState({});

  const fetchProgress = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/expenses');
      const expenses = await res.json();

      const totals = {};
      for (let key in categories) totals[key] = 0;

      expenses.forEach(({ category, amount }) => {
        if (totals[category] !== undefined) {
          totals[category] += amount;
        }
      });

      setTotals(totals);
    } catch (err) {
      console.error('Error fetching budget progress:', err);
    }
  };

  useEffect(() => {
  fetchProgress();
}, [refresh]);


  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-full">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        📊 Budget Progress
      </h2>

      <div className="space-y-4">
        {Object.entries(categories).map(([key, { emoji, color, limit }]) => {
          const spent = totals[key] || 0;
          const percentage = Math.min((spent / limit) * 100, 100).toFixed(1);

          return (
            <div key={key}>
              <div className="flex justify-between mb-1">
                <span>{emoji} {key}</span>
                <span>${spent.toFixed(2)} / ${limit}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 ${color} rounded-full transition-all`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetProgress;
