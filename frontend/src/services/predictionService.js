import api from './api';

export async function predictFinancialHealth(payload) {
  const res = await api.post('/api/predict/financial-health', payload);
  return res.data; // { success, prediction, financial_data, gemini_summary, recommendation }
}

export async function getPredictionHistory() {
  const res = await api.get('/api/predict/history');
  return res.data.history;
}