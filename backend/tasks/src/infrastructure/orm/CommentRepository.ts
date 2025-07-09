import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICommentRepository } from '../../domain/repositories/ICommentRepository';
import { Comment } from '../../domain/entities/Comment';
import { CommentEntity } from './CommentEntity';
import { CommentId, TaskId, UserId } from '../../domain/value-objects';

@Injectable()
export class CommentRepository implements ICommentRepository {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly repo: Repository<CommentEntity>,
  ) {}

  async save(comment: Comment): Promise<void> {
    const entity = this.repo.create({
      id: comment.id.toString(),
      taskId: comment.taskId.toString(),
      authorId: comment.authorId.toString(),
      content: comment.content,
      createdAt: comment.createdAt,
    });
    await this.repo.save(entity);
  }

  async findByTask(taskId: TaskId): Promise<Comment[]> {
    const ents = await this.repo.findBy({ taskId: taskId.toString() });
    return ents.map(e =>
      new Comment(
        CommentId.fromString(e.id),
        TaskId.fromString(e.taskId),
        UserId.fromString(e.authorId),
        e.content,
        e.createdAt,
      ),
    );
  }
}
