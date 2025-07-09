import { TaskId } from '../value-objects/TaskId';
import { Title } from '../value-objects/Title';
import { DueDate } from '../value-objects/DueDate';
import { TaskStatus } from '../value-objects/TaskStatus';
import { UserId } from '../value-objects/UserId';

export class Task {
  constructor(
    public readonly id: TaskId,
    public title: Title,
    public description: string,
    public dueDate: DueDate,
    public status: TaskStatus,
    public assignedTo?: UserId,
  ) {}

  markAsCompleted() {
    this.status = TaskStatus.COMPLETED;
  }
  assignTo(userId: UserId) {
    if (this.status === TaskStatus.COMPLETED) {
      throw new Error('No se puede asignar una tarea completada');
    }
    this.assignedTo = userId;
  }
}
