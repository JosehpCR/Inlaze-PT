import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('projects')
export class ProjectEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  ownerId: string;

  @CreateDateColumn()
  createdAt: Date;
}