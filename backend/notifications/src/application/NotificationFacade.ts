import { Injectable } from '@nestjs/common';
import { EmailAdapter } from '../infrastructure/adapters/EmailAdapter';
import { WsGateway } from '../interface/ws/WsGateway';

@Injectable()
export class NotificationFacade {
  constructor(
    private readonly emailAdapter: EmailAdapter,
    private readonly wsGateway: WsGateway,
  ) {}

  async handleEvent(event: any): Promise<void> {
    const recipients = this.resolveRecipients(event);
    const template = this.resolveTemplate(event);

    for (const to of recipients) {
      await this.emailAdapter.sendMail(to, template.subject, template.html);
    }
    this.wsGateway.broadcast(event);
  }

  private resolveRecipients(event: any): string[] {
    if (event.email) {
      return [event.email];
    }
    return [];
  }

  private resolveTemplate(event: any): { subject: string; html: string } {
    return {
      subject: `New event ${event.type || ''}`.trim(),
      html: `<pre>${JSON.stringify(event, null, 2)}</pre>`,
    };
  }
}
