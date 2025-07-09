import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { CreateProjectUseCase } from '../../application/use-cases/CreateProjectUseCase';
import { GetProjectsUseCase } from '../../application/use-cases/GetProjectsUseCase';
import { UpdateProjectUseCase } from '../../application/use-cases/UpdateProjectUseCase';
import { DeleteProjectUseCase } from '../../application/use-cases/DeleteProjectUseCase';
import { CreateProjectHttpDto } from '../dtos/CreateProjectHttpDto';
import { UpdateProjectHttpDto } from '../dtos/UpdateProjectHttpDto';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';

@Controller('api/v1/projects')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(
    private readonly createProj: CreateProjectUseCase,
    private readonly getProj: GetProjectsUseCase,
    private readonly updateProj: UpdateProjectUseCase,
    private readonly deleteProj: DeleteProjectUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateProjectHttpDto, @Req() req) {
    return this.createProj.execute({
      name: dto.name,
      description: dto.description,
      ownerId: req.user.userId,
    });
  }

  @Get()
  list(@Req() req) {
    return this.getProj.execute(req.user.userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProjectHttpDto) {
    return this.updateProj.execute({ id, name: dto.name, description: dto.description });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteProj.execute(id);
  }
}
