'use client';
import { useEffect } from 'react';
import { initSocket } from '@/lib/websocket';
import { toast } from 'react-toastify';

export const SocketToast = () => {
  useEffect(() => {
    const socket = initSocket();
    socket.on('notification', (msg: string) => {
      toast(msg);
    });
    return () => {
      socket.off('notification');
    };
  }, []);
  return null;
};
