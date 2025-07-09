import { IProjectRepository } from '../../domain/repositories/IProjectRepository';

export class DeleteProjectUseCase {
  constructor(private readonly repo: IProjectRepository) {}

  async execute(id: string): Promise<void> {
    const project = await this.repo.findById(id);
    if (!project) throw new Error('Proyecto no encontrado');
    await this.repo.delete(id);
  }
}
