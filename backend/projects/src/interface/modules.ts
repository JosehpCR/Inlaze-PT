import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../infrastructure/config/database';
import { ProjectEntity } from '../infrastructure/orm/entities/ProjectEntity';
import { TypeOrmProjectRepository } from '../infrastructure/orm/repositories/TypeOrmProjectRepository';
import { ProjectController } from './controllers/ProjectController';
import { CreateProjectUseCase } from '../application/use-cases/create-project-use-case';
import { GetProjectsUseCase } from '../application/use-cases/GetProjectsUseCase';
import { UpdateProjectUseCase } from '../application/use-cases/UpdateProjectUseCase';
import { DeleteProjectUseCase } from '../application/use-cases/DeleteProjectUseCase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    TypeOrmModule.forFeature([ProjectEntity]),
    JwtModule.registerAsync({
      useFactory: (config) => ({
        secret: config.get('jwt.secret'),
        signOptions: { expiresIn: config.get('jwt.expiresIn') },
      }),
      inject: [ConfigModule],
    }),
  ],
  controllers: [ProjectController],
  providers: [
    // Repositorio
    { provide: 'IProjectRepository', useClass: TypeOrmProjectRepository },
    // UseCases
    CreateProjectUseCase,
    GetProjectsUseCase,
    UpdateProjectUseCase,
    DeleteProjectUseCase,
    // Guard
    JwtAuthGuard,
  ],
})
export class ProjectModule {}