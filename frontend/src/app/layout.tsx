import './globals.css'
import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google'
import { Providers } from '@/components/Providers'

const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Inlaze Task Manager',
  description: 'Dashboard',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={geistMono.variable}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
