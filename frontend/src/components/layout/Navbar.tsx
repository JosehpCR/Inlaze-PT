'use client';
import { Navbar as UINavbar } from '@nextui-org/react';
import Link from 'next/link';

export const Navbar = () => (
  <UINavbar maxWidth="full">
    <UINavbar.Brand>
      <Link href="/dashboard">Dashboard</Link>
    </UINavbar.Brand>
  </UINavbar>
);
