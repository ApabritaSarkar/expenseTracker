import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import AddExpenseForm from './components/AddExpenseForm';
import BudgetProgress from './components/BudgetProgress';
import AIAdvisor from './components/AIAdvisor';
import Charts from './components/Charts';
import DownloadButtons from './components/DownloadButtons';

function App() {
  const [expenseRefresh, setExpenseRefresh] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <Navbar />
      <main className="container mx-auto px-4 py-10">
<AddExpenseForm onExpenseAdded={() => setExpenseRefresh(prev => !prev)} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
<BudgetProgress refresh={expenseRefresh} />
          <AIAdvisor />
        </div>

<Charts refresh={expenseRefresh} />

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <DownloadButtons />
        </div>
      </main>
    </div>
  );
}

export default App;
