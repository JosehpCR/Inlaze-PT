import { ICommentRepository } from '../../domain/repositories/ICommentRepository';
import { Comment } from '../../domain/entities/Comment';
import { CommentId, TaskId, UserId } from '../../domain/value-objects';
import { AddCommentDto } from '../dtos/AddCommentDto';
import { Inject } from '@nestjs/common';

export class AddCommentUseCase {
  constructor(
    @Inject('ICommentRepository') private readonly repo: ICommentRepository,
  ) {}

  async execute(input: AddCommentDto): Promise<void> {
    const comment = new Comment(
      CommentId.generate(),
      TaskId.fromString(input.taskId),
      UserId.fromString(input.authorId),
      input.content,
    );
    await this.repo.save(comment);
  }
}
