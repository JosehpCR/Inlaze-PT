import { useMutation } from '@tanstack/react-query';
import { login } from './api';
import { useAuth } from '@/store/authSlice';

export const useLogin = () => {
  const setToken = useAuth((s) => s.setToken);
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      login(data.email, data.password),
    onSuccess: (data) => {
      if (data?.token) {
        setToken(data.token);
      }
    },
  });
};
