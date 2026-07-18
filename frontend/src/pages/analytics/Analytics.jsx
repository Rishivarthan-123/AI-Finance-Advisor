import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  fetchIncomeExpense,
  fetchMonthlyExpense,
  fetchTopCategories,
  fetchDailySpending,
} from '../../services/analyticsService';
import IncomeExpensePie from '../../components/dashboard/IncomeExpensePie';
import MonthlyExpenseChart from '../../components/analytics/MonthlyExpenseChart';
import TopCategoriesChart from '../../components/analytics/TopCategoriesChart';
import DailySpendingChart from '../../components/analytics/DailySpendingChart';

export default function Analytics() {
  const [incomeExpense, setIncomeExpense] = useState({ income: 0, expense: 0 });
  const [monthlyExpense, setMonthlyExpense] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [dailySpending, setDailySpending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [ie, monthly, categories, daily] = await Promise.all([
          fetchIncomeExpense(),
          fetchMonthlyExpense(),
          fetchTopCategories(),
          fetchDailySpending(),
        ]);
        setIncomeExpense(ie);
        setMonthlyExpense(monthly);
        setTopCategories(categories);
        setDailySpending(daily);
      } catch {
        toast.error('Failed to load analytics');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-xl font-bold">Analytics</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">A deeper look at your spending patterns</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-5">
          <h2 className="font-semibold mb-3">Income vs Expense</h2>
          <IncomeExpensePie income={incomeExpense.income} expense={incomeExpense.expense} />
        </div>
        <div className="glass-card p-5">
          <h2 className="font-semibold mb-3">Top Spending Categories</h2>
          <TopCategoriesChart data={topCategories} />
        </div>
        <div className="glass-card p-5">
          <h2 className="font-semibold mb-3">Monthly Expense Trend</h2>
          <MonthlyExpenseChart data={monthlyExpense} />
        </div>
        <div className="glass-card p-5">
          <h2 className="font-semibold mb-3">Daily Spending</h2>
          <DailySpendingChart data={dailySpending} />
        </div>
      </div>
    </div>
  );
}