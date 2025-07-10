import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import configuration from '../infrastructure/config/configuration';
import { TaskEntity } from '../infrastructure/orm/TaskEntity';
import { CommentEntity } from '../infrastructure/orm/CommentEntity';
import { TaskRepository } from '../infrastructure/orm/TaskRepository';
import { CommentRepository } from '../infrastructure/orm/CommentRepository';
import { RabbitMqClient } from '../infrastructure/messaging/RabbitMqClient';
import { TaskEventPublisher } from '../infrastructure/messaging/TaskEventPublisher';
import { DatabaseModule } from '../infrastructure/config/database';
import { CreateTaskUseCase } from '../application/use-cases/CreateTaskUseCase';
import { ListTasksUseCase } from '../application/use-cases/ListTasksUseCase';
import { AssignTaskUseCase } from '../application/use-cases/AssignTaskUseCase';
import { AddCommentUseCase } from '../application/use-cases/AddCommentUseCase';
import { UpdateTaskStatusUseCase } from '../application/use-cases/UpdateTaskStatusUseCase';
import { TaskController } from './controllers/TaskController';
import { CommentController } from './controllers/CommentController';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration], envFilePath: '.env' }),
    DatabaseModule,
    TypeOrmModule.forFeature([TaskEntity, CommentEntity]),
    RabbitMqClient,
  ],
  controllers: [TaskController, CommentController],
  providers: [
    { provide: 'ITaskRepository', useClass: TaskRepository },
    { provide: 'ICommentRepository', useClass: CommentRepository },
    { provide: 'ITaskEventPublisher', useClass: TaskEventPublisher },
    CreateTaskUseCase,
    ListTasksUseCase,
    AssignTaskUseCase,
    UpdateTaskStatusUseCase,
    AddCommentUseCase,
  ],
})
export class TasksModule {}
