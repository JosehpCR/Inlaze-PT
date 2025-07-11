import { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import { Task } from '../../domain/entities/Task';
import { TaskId, ProjectId, Title, DueDate, TaskStatus } from '../../domain/value-objects';
import { CreateTaskDto } from '../dtos/CreateTaskDto';
import { TaskDto } from '../dtos/TaskDto';
import { ITaskEventPublisher } from '../events/ITaskEventPublisher';
import { Inject } from '@nestjs/common';

export class CreateTaskUseCase {
  constructor(
    @Inject('ITaskRepository') private readonly repo: ITaskRepository,
    @Inject('ITaskEventPublisher') private readonly events: ITaskEventPublisher,
  ) {}

  async execute(input: CreateTaskDto): Promise<TaskDto> {
    const id = TaskId.generate();
    const projId = ProjectId.fromString(input.projectId);
    const task = new Task(
      id,
      projId,
      new Title(input.title),
      input.description,
      new DueDate(new Date(input.dueDate)),
      TaskStatus.PENDING,
    );
    await this.repo.save(task);
    await this.events.taskCreated({
      id: id.toString(),
      projectId: projId.toString(),
      title: task.title.value,
    });
    return {
      id: id.toString(),
      projectId: projId.toString(),
      title: task.title.value,
      description: task.description,
      dueDate: task.dueDate.toISOString(),
      status: task.status,
    };
  }
}
