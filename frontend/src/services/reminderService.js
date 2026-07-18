import api from './api';

export async function getReminders() {
  const res = await api.get('/api/reminders/');
  return res.data;
}

export async function addReminder(payload) {
  const res = await api.post('/api/reminders/add', payload);
  return res.data;
}

export async function updateReminder(id, payload) {
  const res = await api.put(`/api/reminders/${id}`, payload);
  return res.data;
}

export async function deleteReminder(id) {
  const res = await api.delete(`/api/reminders/${id}`);
  return res.data;
}

export async function markReminderPaid(id) {
  const res = await api.put(`/api/reminders/paid/${id}`);
  return res.data;
}