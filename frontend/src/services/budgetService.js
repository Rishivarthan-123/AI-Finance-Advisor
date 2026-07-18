import api from './api';

export async function getBudgets() {
  const res = await api.get('/api/budgets/');
  return res.data.budgets;
}

export async function getBudgetStatus() {
  const res = await api.get('/api/budgets/status');
  return res.data.status;
}

export async function getBudgetAlerts() {
  const res = await api.get('/api/budgets/alerts');
  return res.data.alerts;
}

export async function addBudget(payload) {
  const res = await api.post('/api/budgets/add', payload);
  return res.data.budget;
}

export async function updateBudget(id, payload) {
  const res = await api.put(`/api/budgets/${id}`, payload);
  return res.data;
}

export async function deleteBudget(id) {
  const res = await api.delete(`/api/budgets/${id}`);
  return res.data;
}