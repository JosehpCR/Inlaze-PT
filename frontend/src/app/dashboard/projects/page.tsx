'use client';
import { useProjects } from '@/features/projects/api';
import { Table } from '@nextui-org/react';
import Link from 'next/link';

export default function ProjectsPage() {
  const { data } = useProjects();
  return (
    <Table aria-label="Projects">
      <Table.Header>
        <Table.Column>Name</Table.Column>
        <Table.Column>Action</Table.Column>
      </Table.Header>
      <Table.Body>
        {data?.map((p: { id: string; name: string }) => (
          <Table.Row key={p.id}>
            <Table.Cell>{p.name}</Table.Cell>
            <Table.Cell>
              <Link href={`/dashboard/projects/${p.id}`}>View</Link>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
