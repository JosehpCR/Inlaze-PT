import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ITaskEventPublisher } from '../../application/events/ITaskEventPublisher';

@Injectable()
export class TaskEventPublisher implements ITaskEventPublisher {
  constructor(@Inject('TASKS_SERVICE') private readonly client: ClientProxy) {}

  async taskCreated(event: { id: string; projectId: string; title: string }): Promise<void> {
    await lastValueFrom(this.client.emit('task.created', event));
  }
}
