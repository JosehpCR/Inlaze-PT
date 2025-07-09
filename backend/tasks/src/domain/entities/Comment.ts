import { CommentId } from '../value-objects/CommentId';
import { TaskId } from '../value-objects/TaskId';
import { UserId } from '../value-objects/UserId';

export class Comment {
  constructor(
    public readonly id: CommentId,
    public readonly taskId: TaskId,
    public readonly authorId: UserId,
    public content: string,
    public readonly createdAt: Date = new Date(),
  ) {}
}
