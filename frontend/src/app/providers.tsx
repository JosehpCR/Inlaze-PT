'use client';
import { ReactNode, useState } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SocketToast } from '@/components/feedback/Toast';

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        {children}
        <SocketToast />
      </NextUIProvider>
    </QueryClientProvider>
  );
}
