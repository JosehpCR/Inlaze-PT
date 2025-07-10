import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { theme } from '@/styles/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SocketToast } from '@/components/feedback/Toast';
import { ReactNode } from 'react';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Inlaze Task Manager',
  description: 'Dashboard',
};

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryClientProvider client={queryClient}>
          <NextUIProvider theme={theme}>
            {children}
            <SocketToast />
          </NextUIProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
