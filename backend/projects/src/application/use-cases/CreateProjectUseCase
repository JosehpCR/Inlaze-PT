import { IProjectRepository } from '../../domain/repositories/IProjectRepository';
import { CreateProjectDto } from '../dtos/CreateProjectDto'; 
import { Project } from '../../domain/entities/Project';
import { ProjectDto } from '../dtos/ProjectDto';
import { ProjectId } from '../../domain/value-objects/ProjectId';

export class CreateProjectUseCase {
  constructor(private readonly repo: IProjectRepository) {}

  async execute(input: CreateProjectDto): Promise<ProjectDto> {
    const id = ProjectId.create().toString();
    const project = new Project(id, input.name, input.description, input.ownerId);
    await this.repo.save(project);
    return {
      id,
      name: project.name,
      description: project.description,
      ownerId: project.ownerId,
      createdAt: project.createdAt,
    };
  }
}