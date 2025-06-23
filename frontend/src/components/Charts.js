import React, { useEffect, useState } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const categories = ['Food', 'Transport', 'Books', 'Entertainment', 'Others'];

const Charts = ({ refresh }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
  fetch('http://localhost:5000/api/expenses')
    .then((res) => res.json())
    .then((data) => setExpenses(data))
    .catch((err) => console.error('Error fetching expenses:', err));
}, [refresh]);


  const categoryTotals = categories.map((cat) =>
    expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0)
  );

  const monthlyTotals = new Array(12).fill(0);
  expenses.forEach((e) => {
    const month = new Date(e.date).getMonth();
    monthlyTotals[month] += e.amount;
  });

  const categoryData = {
    labels: categories,
    datasets: [
      {
        data: categoryTotals,
        backgroundColor: ['#4ade80', '#60a5fa', '#facc15', '#f87171', '#a78bfa'],
        borderWidth: 1,
      },
    ],
  };

  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Expenses ($)',
        data: monthlyTotals,
        backgroundColor: '#60a5fa',
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-md font-semibold mb-4 flex items-center gap-2">
          🥧 Spending Categories
        </h3>
        <Doughnut data={categoryData} />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-md font-semibold mb-4 flex items-center gap-2">
          📈 Monthly Trend
        </h3>
        <Bar data={monthlyData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
      </div>
    </div>
  );
};

export default Charts;
