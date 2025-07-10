import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { TaskEntity } from '../orm/TaskEntity';
import { CommentEntity } from '../orm/CommentEntity';

export const DatabaseModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    url: config.get<string>('database.url'),
    entities: [TaskEntity, CommentEntity],
    synchronize: true,
  }),
});
