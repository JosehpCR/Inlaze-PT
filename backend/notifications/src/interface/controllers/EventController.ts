import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { NotificationFacade } from '../../application/NotificationFacade';

@Controller()
export class EventController {
  private readonly logger = new Logger(EventController.name);
  private readonly processed = new Map<string, boolean>();

  constructor(private readonly facade: NotificationFacade) {}

  @MessagePattern('tasks.#')
  async handleTaskEvents(@Payload() data: any, @Ctx() context: RmqContext) {
    await this.processMessage(data, context);
  }

  @MessagePattern('projects.project.created')
  async handleProjectEvents(@Payload() data: any, @Ctx() context: RmqContext) {
    await this.processMessage(data, context);
  }

  private async processMessage(data: any, context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    const eventId = data.eventId;
    if (eventId && this.processed.has(eventId)) {
      this.logger.debug(`Duplicate event ${eventId}`);
      channel.ack(message);
      return;
    }

    try {
      await this.retry(() => this.facade.handleEvent(data), 3);
      if (eventId) {
        this.processed.set(eventId, true);
      }
      channel.ack(message);
    } catch (err) {
      this.logger.error(`Failed processing event ${eventId}`, err);
      channel.nack(message, false, false); // send to DLQ
    }
  }

  private async retry(fn: () => Promise<void>, attempts: number) {
    let delay = 1000;
    for (let i = 0; i < attempts; i++) {
      try {
        await fn();
        return;
      } catch (err) {
        if (i === attempts - 1) {
          throw err;
        }
        await new Promise((res) => setTimeout(res, delay));
        delay *= 2;
      }
    }
  }
}
