import api from './api';

export async function fetchIncomeExpense() {
  const res = await api.get('/api/analytics/income-expense');
  return res.data; // { income, expense }
}

export async function fetchMonthlyExpense() {
  const res = await api.get('/api/analytics/monthly-expense');
  return res.data; // [{ month, expense }]
}

export async function fetchTopCategories() {
  const res = await api.get('/api/analytics/top-categories');
  return res.data; // [{ category, amount }]
}

export async function fetchDailySpending() {
  const res = await api.get('/api/analytics/daily-spending');
  return res.data; // [{ date, amount }]
}