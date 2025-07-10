import { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import { TaskDto } from '../dtos/TaskDto';
import { TaskId } from '../../domain/value-objects/TaskId';
import { UserId } from '../../domain/value-objects/UserId';
import { Inject } from '@nestjs/common';

export class AssignTaskUseCase {
  constructor(
    @Inject('ITaskRepository') private readonly repo: ITaskRepository,
  ) {}

  async execute(input: { taskId: string; userId: string }): Promise<TaskDto> {
    const id = TaskId.fromString(input.taskId);
    const task = await this.repo.findById(id);
    if (!task) throw new Error('Task not found');
    task.assignTo(UserId.fromString(input.userId));
    await this.repo.save(task);
    return {
      id: task.id.toString(),
      projectId: task.projectId.toString(),
      title: task.title.value,
      description: task.description,
      dueDate: task.dueDate.toISOString(),
      status: task.status,
      assignedTo: task.assignedTo?.toString(),
    };
  }
}
