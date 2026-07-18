import api from './api';

export async function fetchDashboardSummary() {
  const res = await api.get('/api/analytics/dashboard');
  return res.data;
}

export async function fetchBudgetStatus() {
  const res = await api.get('/api/budgets/status');
  return res.data.status || [];
}

export async function fetchUpcomingBills() {
  const res = await api.get('/api/reminders/upcoming');
  return res.data || [];
}

export async function fetchRecentTransactions(limit = 5) {
  const res = await api.get('/api/transactions/');

  const transactions = res.data.transactions || [];

  return transactions
    .sort(
      (a, b) =>
        new Date(b.transaction_date) -
        new Date(a.transaction_date)
    )
    .slice(0, limit);
}

/*
|--------------------------------------------------------------------------
| Financial Prediction
|--------------------------------------------------------------------------
*/

export async function fetchPredictionHistory() {
  const res = await api.get('/api/predict/history');

  return res.data;
}