import { io, Socket } from 'socket.io-client';
import { getToken } from '@/store/authSlice';

let socket: Socket | undefined;

export const initSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_WS_URL as string, {
      auth: { token: getToken() },
    });
  }
  return socket;
};
