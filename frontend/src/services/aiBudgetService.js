import api from './api';

export async function generateAIBudget() {
  const res = await api.post('/api/ai-budget/generate');
  return res.data; // { success, budget_snapshot, recommendation, ai_explanation }
}

export async function getAIBudgetHistory() {
  const res = await api.get('/api/ai-budget/history');
  return res.data.history; // [{ id, monthly_income, ..., ai_explanation, created_at }]
}