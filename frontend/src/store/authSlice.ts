import { create } from 'zustand';
import Cookies from 'js-cookie';

export interface AuthState {
  token?: string;
  setToken: (t: string) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  token: Cookies.get('token'),
  setToken: (t: string) => {
    Cookies.set('token', t);
    set({ token: t });
  },
  logout: () => {
    Cookies.remove('token');
    set({ token: undefined });
  },
}));

export const getToken = () => useAuth.getState().token;
