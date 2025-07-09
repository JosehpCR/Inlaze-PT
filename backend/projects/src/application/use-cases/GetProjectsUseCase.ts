import { IProjectRepository } from '../../domain/repositories/IProjectRepository';
import { ProjectDto } from '../dtos/ProjectDto';

export class GetProjectsUseCase {
  constructor(private readonly repo: IProjectRepository) {}

  async execute(ownerId: string): Promise<ProjectDto[]> {
    const projects = await this.repo.findByOwner(ownerId);
    return projects.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      ownerId: p.ownerId,
      createdAt: p.createdAt,
    }));
  }
}
