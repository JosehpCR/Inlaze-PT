import { Module } from '@nestjs/common';
import { NotificationsModule } from './interface/modules';

@Module({
  imports: [NotificationsModule],
})
export class AppModule {}
