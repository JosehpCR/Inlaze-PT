'use client';
import { useProjects, useCreateProject } from '@/features/projects/api';
import { Input, Button } from '@nextui-org/react';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function ProjectsPage() {
  const { data } = useProjects();
  const createProj = useCreateProject();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createProj.mutateAsync({ name, description });
    setName('');
    setDescription('');
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={onSubmit} className="flex gap-2 items-end">
        <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit" color="primary">
          Create
        </Button>
      </form>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((p: { id: string; name: string }) => (
            <tr key={p.id} className="border-t">
              <td className="p-2 border-r">{p.name}</td>
              <td className="p-2">
                <Link href={`/dashboard/projects/${p.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
