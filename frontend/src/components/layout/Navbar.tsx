'use client';
import Link from 'next/link';

export const Navbar = () => (
  <nav className="p-4 border-b">
    <Link href="/dashboard">Dashboard</Link>
  </nav>
);
