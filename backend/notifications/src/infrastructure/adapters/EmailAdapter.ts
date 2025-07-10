import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailAdapter {
  private transporter: nodemailer.Transporter;
  private from: string;

  constructor(private readonly config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get<string>('smtp.host', 'localhost'),
      auth: {
        user: this.config.get<string>('smtp.user', 'user'),
        pass: this.config.get<string>('smtp.pass', 'pass'),
      },
    });
    this.from = this.config.get<string>('smtp.from', 'no-reply@example.com');
  }

  async sendMail(to: string, subject: string, html: string): Promise<void> {
    await this.transporter.sendMail({ to, from: this.from, subject, html });
  }
}
