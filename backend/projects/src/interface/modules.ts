import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from '../infrastructure/config/database';
import configuration from '../infrastructure/config/configuration';
import { ProjectEntity } from '../infrastructure/orm/entities/ProjectEntity';
import { TypeOrmProjectRepository } from '../infrastructure/orm/repositories/TypeOrmProjectRepository';
import { ProjectController } from './controllers/ProjectController';
import { CreateProjectUseCase } from '../application/use-cases/CreateProjectUseCase';
import { GetProjectsUseCase } from '../application/use-cases/GetProjectsUseCase';
import { UpdateProjectUseCase } from '../application/use-cases/UpdateProjectUseCase';
import { DeleteProjectUseCase } from '../application/use-cases/DeleteProjectUseCase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../infrastructure/guards/JwtAuthGuard';
import { JwtStrategy } from '../infrastructure/auth/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration], envFilePath: '.env' }),
    DatabaseModule,
    TypeOrmModule.forFeature([ProjectEntity]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('jwt.secret'),
        signOptions: { expiresIn: config.get<string>('jwt.expiresIn') },
      }),
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
    // Auth
    JwtAuthGuard,
    JwtStrategy,
  ],
})
export class ProjectModule {}