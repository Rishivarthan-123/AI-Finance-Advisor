import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';

import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import Transactions from './pages/transactions/Transactions';
import StatementUpload from './pages/statements/StatementUpload';
import Budgets from './pages/budgets/Budgets';
import AIBudgetPlanner from './pages/ai-budget/AIBudgetPlanner';
import Profile from './pages/profile/Profile';
import FinancialPrediction from './pages/prediction/FinancialPrediction';
import InvestmentRecommendation from './pages/investment/InvestmentRecommendation';
import Analytics from './pages/analytics/Analytics';
import BillReminders from './pages/reminders/BillReminders';
import AIChatbot from './pages/chatbot/AIChatbot';
import Settings from './pages/settings/Settings';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/statements" element={<StatementUpload />} />
        <Route path="/budgets" element={<Budgets />} />
        <Route path="/ai-budget" element={<AIBudgetPlanner />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/prediction" element={<FinancialPrediction />} />
        <Route path="/investment" element={<InvestmentRecommendation />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/reminders" element={<BillReminders />} />
        <Route path="/chatbot" element={<AIChatbot />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;