import api from './api';

export async function generateInvestmentPlan() {
  const res = await api.get('/api/investment/recommend');
  return res.data;
}

export async function getInvestmentHistory() {
  const res = await api.get('/api/investment/history');
  return res.data.history;
}