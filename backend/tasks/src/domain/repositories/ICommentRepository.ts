import { Comment } from '../entities/Comment';
import { CommentId } from '../value-objects/CommentId';
import { TaskId } from '../value-objects/TaskId';

export interface ICommentRepository {
  save(comment: Comment): Promise<void>;
  findByTask(taskId: TaskId): Promise<Comment[]>;
}
