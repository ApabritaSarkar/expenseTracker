import React, { useState } from 'react';

const AIAdvisor = () => {
  const [salary, setSalary] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const getBudgetSuggestion = async () => {
    if (!salary || salary <= 0) {
      alert('Please enter a valid salary amount.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/suggest-budget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ salary }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.budget);
      } else {
        alert(data.error || 'Failed to fetch budget suggestion.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl p-6 text-white h-full bg-gradient-to-br from-indigo-600 to-indigo-800 shadow-md text-center">
      <h2 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2">
        🤖 AI Advisor
      </h2>

      <input
        type="number"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        placeholder="Enter your salary"
        className="w-full p-2 text-center rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-300"
      />

      <button
        onClick={getBudgetSuggestion}
        className="w-full mt-4 bg-indigo-400 hover:bg-indigo-500 transition text-white py-2 rounded-md font-medium"
      >
        {loading ? 'Analyzing...' : 'Get Budget'}
      </button>

      {result && (
        <div className="mt-6 text-left bg-white/10 backdrop-blur p-4 rounded-lg">
          <h4 className="font-semibold mb-2 text-white">Suggested Budget:</h4>
          <ul className="text-sm space-y-1">
            {Object.entries(result).map(([key, val]) => (
              <li key={key}>
                <b>{key}:</b> ${val}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AIAdvisor;
