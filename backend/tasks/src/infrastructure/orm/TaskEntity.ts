import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('tasks')
export class TaskEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  projectId: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('timestamp')
  dueDate: Date;

  @Column()
  status: string;

  @Column({ nullable: true })
  assignedTo?: string;
}