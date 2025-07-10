'use client';
import { useLogin } from '@/features/auth/hooks';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const login = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await login.mutateAsync({ email, password });
    if (res?.token) {
      router.push('/dashboard');
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 max-w-sm mx-auto mt-20">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Login
      </button>
    </form>
  );
}
