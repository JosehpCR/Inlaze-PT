import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import { Task } from '../../domain/entities/Task';
import { TaskEntity } from './TaskEntity';
import { TaskId, Title, DueDate, TaskStatus, ProjectId, UserId } from '../../domain/value-objects';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly repo: Repository<TaskEntity>,
  ) {}

  async save(task: Task): Promise<void> {
    const ent = this.repo.create({
      id: task.id.toString(),
      projectId: task.projectId.toString(),
      title: task.title.value,
      description: task.description,
      dueDate: task.dueDate.value,
      status: task.status,
      assignedTo: task.assignedTo?.toString(),
    });
    await this.repo.save(ent);
  }

  async findById(id: TaskId): Promise<Task | null> {
    const ent = await this.repo.findOneBy({ id: id.toString() });
    if (!ent) return null;
    return new Task(
      TaskId.fromString(ent.id),
      ProjectId.fromString(ent.projectId),
      new Title(ent.title),
      ent.description,
      new DueDate(ent.dueDate),
      ent.status as TaskStatus,
      ent.assignedTo ? UserId.fromString(ent.assignedTo) : undefined,
    );
  }

  async findByProject(projectId: ProjectId): Promise<Task[]> {
    const ents = await this.repo.findBy({ projectId: projectId.toString() });
    return ents.map(ent => new Task(
      TaskId.fromString(ent.id),
      ProjectId.fromString(ent.projectId),
      new Title(ent.title),
      ent.description,
      new DueDate(ent.dueDate),
      ent.status as TaskStatus,
      ent.assignedTo ? UserId.fromString(ent.assignedTo) : undefined,
    ));
  }
}
