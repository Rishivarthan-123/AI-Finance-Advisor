import { Link } from 'react-router-dom';
import {
  MdTrendingUp,
  MdTrendingDown,
  MdAccountBalanceWallet,
  MdSavings,
  MdAutoAwesome,
  MdArrowForward,
} from 'react-icons/md';

import { useDashboardData } from '../../hooks/useDashboardData';

import StatCard from '../../components/dashboard/StatCard';
import FinancialScoreCard from '../../components/dashboard/FinancialScoreCard';
import QuickActions from '../../components/dashboard/QuickActions';
import IncomeExpensePie from '../../components/dashboard/IncomeExpensePie';
import BudgetUtilizationChart from '../../components/dashboard/BudgetUtilizationChart';
import RecentTransactions from '../../components/dashboard/RecentTransactions';
import UpcomingBills from '../../components/dashboard/UpcomingBills';

import { formatCurrency } from '../../utils/formatters';

export default function Dashboard() {
  const {
    summary,
    budgetStatus,
    upcomingBills,
    recentTransactions,
    prediction,
    loading,
    error,
  } = useDashboardData();

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card p-6 text-center text-sm text-rose-500">
        Couldn't load dashboard data. Please refresh.
      </div>
    );
  }

  const {
    total_income = 0,
    total_expense = 0,
    balance = 0,
    savings_rate = 0,
  } = summary || {};

  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="space-y-6 animate-fadeIn">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">
            Financial Dashboard
          </h1>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Monitor your income, expenses, savings and AI insights in one place.
          </p>
        </div>

        <div className="text-sm text-slate-500 dark:text-slate-400">
          {today}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard
          label="Monthly Income"
          value={formatCurrency(total_income)}
          icon={MdTrendingUp}
          tone="green"
        />

        <StatCard
          label="Monthly Expense"
          value={formatCurrency(total_expense)}
          icon={MdTrendingDown}
          tone="red"
        />

        <StatCard
          label="Current Balance"
          value={formatCurrency(balance)}
          icon={MdAccountBalanceWallet}
        />

        <StatCard
          label="Savings Rate"
          value={savings_rate}
          suffix="%"
          icon={MdSavings}
          tone="amber"
        />

      </div>

      {/* AI Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="glass-card p-5 flex flex-wrap items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white">
              <MdAutoAwesome size={20} />
            </div>

            <div>

              <p className="font-semibold">
                Get a personalized AI budget plan
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Based on your income, spending and financial goals.
              </p>

            </div>

          </div>

          <Link
            to="/ai-budget"
            className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:underline"
          >
            Generate Now
            <MdArrowForward />
          </Link>

        </div>

        <FinancialScoreCard prediction={prediction} />

      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="glass-card p-5">

          <h2 className="font-semibold mb-4">
            Income vs Expense
          </h2>

          <IncomeExpensePie
            income={total_income}
            expense={total_expense}
          />

        </div>

        <div className="glass-card p-5">

          <h2 className="font-semibold mb-4">
            Budget Utilization
          </h2>

          <BudgetUtilizationChart
            data={budgetStatus}
          />

        </div>

      </div>

      {/* Recent Transactions & Bills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="glass-card p-5">

          <div className="flex items-center justify-between mb-4">

            <h2 className="font-semibold">
              Recent Transactions
            </h2>

            <Link
              to="/transactions"
              className="text-xs text-primary-600 hover:underline"
            >
              View All
            </Link>

          </div>

          <RecentTransactions
            transactions={recentTransactions}
          />

        </div>

        <div className="glass-card p-5">

          <div className="flex items-center justify-between mb-4">

            <h2 className="font-semibold">
              Upcoming Bills
            </h2>

            <Link
              to="/reminders"
              className="text-xs text-primary-600 hover:underline"
            >
              View All
            </Link>

          </div>

          <UpcomingBills
            bills={upcomingBills}
          />

        </div>

      </div>

    </div>
  );
}