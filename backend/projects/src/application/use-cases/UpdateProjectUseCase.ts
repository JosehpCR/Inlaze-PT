import { IProjectRepository } from '../../domain/repositories/IProjectRepository';
import { UpdateProjectDto } from '../dtos/UpdateProjectDto';
import { ProjectDto } from '../dtos/ProjectDto';

export class UpdateProjectUseCase {
  constructor(private readonly repo: IProjectRepository) {}

  async execute(input: UpdateProjectDto): Promise<ProjectDto> {
    const project = await this.repo.findById(input.id);
    if (!project) throw new Error('Proyecto no encontrado');
    if (input.name) project.rename(input.name);
    if (input.description) project.updateDescription(input.description);
    await this.repo.save(project);
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      ownerId: project.ownerId,
      createdAt: project.createdAt,
    };
  }
}