'use client';
import { useParams } from 'next/navigation';
import { useTasks, useCreateTask } from '@/features/tasks/api';
import { Input, Button, Select, SelectItem } from '@nextui-org/react';
import { FormEvent, useState } from 'react';

interface Task {
  id: string;
  title: string;
  status: string;
  description: string;
  dueDate: string;
  assignedTo?: string;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const { data } = useTasks(projectId);
  const createTask = useCreateTask();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createTask.mutateAsync({ projectId, title, description, dueDate });
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  const [filter, setFilter] = useState('');

  const filtered = data?.filter((t: Task) => (filter ? t.status === filter : true));

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={onSubmit} className="flex gap-2 items-end">
        <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Input type="date" label="Due" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <Button type="submit" color="primary">Add</Button>
      </form>
      <Select label="Filter" selectedKeys={filter ? [filter] : []} onChange={(e) => setFilter(e.target.value)} className="max-w-xs">
        <SelectItem key="">All</SelectItem>
        <SelectItem key="PENDING">Pending</SelectItem>
        <SelectItem key="IN_PROGRESS">In Progress</SelectItem>
        <SelectItem key="COMPLETED">Completed</SelectItem>
      </Select>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered?.map((t: Task) => (
            <tr key={t.id} className="border-t">
              <td className="p-2 border-r">{t.title}</td>
              <td className="p-2">{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
