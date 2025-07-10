import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../infrastructure/config/configuration';
import { EventController } from './controllers/EventController';
import { EmailAdapter } from '../infrastructure/adapters/EmailAdapter';
import { NotificationFacade } from '../application/NotificationFacade';
import { WsGateway } from './ws/WsGateway';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [configuration], envFilePath: '.env' })],
  controllers: [EventController],
  providers: [EmailAdapter, NotificationFacade, WsGateway],
})
export class NotificationsModule {}

