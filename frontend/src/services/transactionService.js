import api from './api';

export async function getTransactions() {
  const res = await api.get('/api/transactions/');
  return res.data.transactions;
}

export async function addTransaction(payload) {
  const res = await api.post('/api/transactions/add', payload);
  return res.data.transaction;
}

export async function updateTransaction(id, payload) {
  const res = await api.put(`/api/transactions/${id}`, payload);
  return res.data.transaction;
}

export async function deleteTransaction(id) {
  const res = await api.delete(`/api/transactions/${id}`);
  return res.data;
}

export async function getCategorySummary() {
  const res = await api.get('/api/transactions/category-summary');
  return res.data; // { category: amount, ... }
}