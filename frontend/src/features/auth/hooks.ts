import { useMutation } from '@tanstack/react-query';
import { login, register } from './api';
import { useAuth } from '@/store/authSlice';

export const useLogin = () => {
  const setToken = useAuth((s) => s.setToken);
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      login(data.email, data.password),
    onSuccess: (data) => {
      if (data?.accessToken) {
        setToken(data.accessToken);
      }
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      register(data.email, data.password),
  });
};
