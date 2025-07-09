import { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import { Task } from '../../domain/entities/Task';
import { TaskId, ProjectId, Title, DueDate, TaskStatus } from '../../domain/value-objects';
import { CreateTaskDto } from '../dtos/CreateTaskDto';
import { TaskDto } from '../dtos/TaskDto';

export class CreateTaskUseCase {
  constructor(private readonly repo: ITaskRepository) {}

  async execute(input: CreateTaskDto): Promise<TaskDto> {
    const id = TaskId.generate();
    const projId = new ProjectId(input.projectId);
    const task = new Task(id,
      new Title(input.title),
      input.description,
      new DueDate(new Date(input.dueDate)),
      TaskStatus.PENDING
    );
    await this.repo.save(task);
    return {
      id: id.value,
      projectId: projId.value,
      title: task.title.value,
      description: task.description,
      dueDate: task.dueDate.value.toISOString(),
      status: task.status,
    };
  }
}
