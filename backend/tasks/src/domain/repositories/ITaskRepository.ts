import { Task } from '../entities/Task';
import { TaskId } from '../value-objects/TaskId';
import { ProjectId } from '../value-objects/ProjectId';

export interface ITaskRepository {
  save(task: Task): Promise<void>;
  findById(id: TaskId): Promise<Task | null>;
  findByProject(projectId: ProjectId): Promise<Task[]>;
}
