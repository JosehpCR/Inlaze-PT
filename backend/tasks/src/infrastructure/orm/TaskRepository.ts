import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import { Task } from '../../domain/entities/Task';
import { TaskEntity } from './TaskEntity';
import { TaskId, Title, DueDate, TaskStatus } from '../../domain/value-objects';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly repo: Repository<TaskEntity>,
  ) {}

  async save(task: Task): Promise<void> {
    const ent = this.repo.create({
      id: task.id.value,
      projectId: task.projectId.value,
      title: task.title.value,
      description: task.description,
      dueDate: task.dueDate.value,
      status: task.status,
      assignedTo: task.assignedTo?.value,
    });
    await this.repo.save(ent);
  }

  async findById(id: TaskId): Promise<Task | null> {
    const ent = await this.repo.findOneBy({ id: id.value });
    if (!ent) return null;
    return new Task(
      new TaskId(ent.id),
      new Title(ent.title),
      ent.description,
      new DueDate(ent.dueDate),
      ent.status as TaskStatus,
      ent.assignedTo ? new UserId(ent.assignedTo) : undefined,
    );
  }

  async findByProject(projectId: ProjectId): Promise<Task[]> {
    const ents = await this.repo.findBy({ projectId: projectId.value });
    return ents.map(ent => new Task(
      new TaskId(ent.id),
      new Title(ent.title),
      ent.description,
      new DueDate(ent.dueDate),
      ent.status as TaskStatus,
      ent.assignedTo ? new UserId(ent.assignedTo) : undefined,
    ));
  }
}
