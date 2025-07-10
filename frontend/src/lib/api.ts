import axios from 'axios';
import { getToken } from '@/store/authSlice';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_GATEWAY,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
