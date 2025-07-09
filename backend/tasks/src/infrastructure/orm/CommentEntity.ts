import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('comments')
export class CommentEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  taskId: string;

  @Column()
  authorId: string;

  @Column('text')
  content: string;

  @Column('timestamp')
  createdAt: Date;
}
