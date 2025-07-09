import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class TaskCreatedListener {
  private readonly logger = new Logger(TaskCreatedListener.name);

  @MessagePattern('task.created')
  handleTaskCreated(data: any) {
    this.logger.log(`Task created: ${JSON.stringify(data)}`);
  }
}
