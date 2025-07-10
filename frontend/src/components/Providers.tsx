'use client'

import { ReactNode } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SocketToast } from '@/components/feedback/Toast'
import { theme } from '@/styles/themes'

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextUIProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {children}
        <SocketToast />
      </QueryClientProvider>
    </NextUIProvider>
  )
}
