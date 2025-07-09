import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../infrastructure/config/configuration';
import { TaskCreatedListener } from './listeners/TaskCreatedListener';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [configuration], envFilePath: '.env' })],
  controllers: [TaskCreatedListener],
})
export class NotificationsModule {}

