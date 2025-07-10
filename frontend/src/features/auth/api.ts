import api from '@/lib/api';
import { API_PREFIX } from '@/lib/constants';

export const login = async (email: string, password: string) => {
  const { data } = await api.post(`${API_PREFIX}/auth/login`, {
    email,
    password,
  });
  return data;
};

export const register = async (email: string, password: string) => {
  const { data } = await api.post(`${API_PREFIX}/auth/register`, {
    email,
    password,
  });
  return data;
};
