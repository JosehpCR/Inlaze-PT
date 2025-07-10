'use client';
import Link from 'next/link';

export const Sidebar = () => (
  <div className="p-4 w-48 border-r h-full">
    <ul className="flex flex-col gap-2">
      <li><Link href="/dashboard/projects">Projects</Link></li>
    </ul>
  </div>
);
