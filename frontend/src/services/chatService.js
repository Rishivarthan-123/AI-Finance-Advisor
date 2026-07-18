import api from './api';

export async function sendChatMessage(message) {
  const res = await api.post('/api/chat', { message });
  return res.data.reply;
}