import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IProjectRepository } from '../../../domain/repositories/IProjectRepository';
import { Project } from '../../../domain/entities/Project';
import { ProjectEntity } from '../entities/ProjectEntity';

@Injectable()
export class TypeOrmProjectRepository implements IProjectRepository {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly repo: Repository<ProjectEntity>,
  ) {}

  async save(project: Project): Promise<void> {
    const entity = this.repo.create({
      id: project.id,
      name: project.name,
      description: project.description,
      ownerId: project.ownerId,
      createdAt: project.createdAt,
    });
    await this.repo.save(entity);
  }

  async findById(id: string): Promise<Project | null> {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) return null;
    return new Project(entity.id, entity.name, entity.description, entity.ownerId, entity.createdAt);
  }

  async findByOwner(ownerId: string): Promise<Project[]> {
    const entities = await this.repo.find({ where: { ownerId } });
    return entities.map(e => new Project(e.id, e.name, e.description, e.ownerId, e.createdAt));
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
