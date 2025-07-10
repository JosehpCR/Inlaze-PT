import { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import { TaskDto } from '../dtos/TaskDto';
import { TaskId, TaskStatus, isValidTaskStatus } from '../../domain/value-objects';
import { Inject } from '@nestjs/common';

export class UpdateTaskStatusUseCase {
  constructor(@Inject('ITaskRepository') private readonly repo: ITaskRepository) {}

  async execute(input: { taskId: string; status: string }): Promise<TaskDto> {
    if (!isValidTaskStatus(input.status)) {
      throw new Error('Invalid status');
    }
    const id = TaskId.fromString(input.taskId);
    const task = await this.repo.findById(id);
    if (!task) throw new Error('Task not found');
    task.status = input.status as TaskStatus;
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
