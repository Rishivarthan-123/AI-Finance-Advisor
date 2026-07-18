import api from './api';

export async function getProfile() {
  const res = await api.get('/api/profile/me');
  return res.data.profile;
}

export async function updateProfile(payload) {
  const res = await api.put('/api/profile/update', payload);
  return res.data.profile;
}