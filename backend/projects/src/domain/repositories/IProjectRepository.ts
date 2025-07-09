import { Project } from '../entities/Project';

export interface IProjectRepository {
  save(project: Project): Promise<void>;
  findById(id: string): Promise<Project | null>;
  findByOwner(ownerId: string): Promise<Project[]>;
  delete(id: string): Promise<void>;
}
