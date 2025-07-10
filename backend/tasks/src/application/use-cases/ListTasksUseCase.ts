import { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import { TaskDto } from '../dtos/TaskDto';
import { ProjectId } from '../../domain/value-objects/ProjectId';
import { Inject } from '@nestjs/common';

export class ListTasksUseCase {
  constructor(@Inject('ITaskRepository') private readonly repo: ITaskRepository) {}

  async execute(input: { projectId: string }): Promise<TaskDto[]> {
    const pid = ProjectId.fromString(input.projectId);
    const tasks = await this.repo.findByProject(pid);
    return tasks.map(t => ({
      id: t.id.toString(),
      projectId: t.projectId.toString(),
      title: t.title.value,
      description: t.description,
      dueDate: t.dueDate.toISOString(),
      status: t.status,
      assignedTo: t.assignedTo?.toString(),
    }));
  }
}
