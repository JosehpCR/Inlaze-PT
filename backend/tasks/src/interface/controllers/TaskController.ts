import { Controller, Post, Body, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { CreateTaskUseCase } from '../../application/use-cases/CreateTaskUseCase';
import { ListTasksUseCase } from '../../application/use-cases/ListTasksUseCase';
import { AssignTaskUseCase } from '../../application/use-cases/AssignTaskUseCase';
import { UpdateTaskStatusUseCase } from '../../application/use-cases/UpdateTaskStatusUseCase';
import { CreateTaskHttpDto } from '../dtos/CreateTaskHttpDto';
import { AssignTaskHttpDto } from '../dtos/AssignTaskHttpDto';
import { UpdateTaskStatusHttpDto } from '../dtos/UpdateTaskStatusHttpDto';
import { JwtAuthGuard } from '../../infrastructure/guards/JwtAuthGuard';

@Controller('api/v1/tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(
    private readonly createTask: CreateTaskUseCase,
    private readonly listTasks: ListTasksUseCase,
    private readonly assignTask: AssignTaskUseCase,
    private readonly updateTaskStatus: UpdateTaskStatusUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateTaskHttpDto) {
    return this.createTask.execute(dto);
  }

  @Get('project/:projectId')
  list(@Param('projectId') projectId: string) {
    return this.listTasks.execute({ projectId });
  }

  @Patch(':id/assign')
  assign(@Param('id') id: string, @Body() dto: AssignTaskHttpDto) {
    return this.assignTask.execute({ taskId: id, userId: dto.userId });
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateTaskStatusHttpDto,
  ) {
    return this.updateTaskStatus.execute({ taskId: id, status: dto.status });
  }
}
