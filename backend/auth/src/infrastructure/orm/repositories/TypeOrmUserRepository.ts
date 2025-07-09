import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { User } from '../../../domain/entities/User';
import { UserEntity } from '../entities/UserEntity';
import { UserId } from '../../../domain/value-objects/UserId';

@Injectable()
export class TypeOrmUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  async save(user: User): Promise<void> {
    const entity = this.repo.create({
      id: user.id.toString(),
      email: user.email,
      passwordHash: user.passwordHash,
      createdAt: user.createdAt,
    });
    await this.repo.save(entity);
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.repo.findOne({ where: { email } });
    if (!entity) return null;
    return new User(
      UserId.fromString(entity.id),
      entity.email,
      entity.passwordHash,
      entity.createdAt,
    );
  }

  async findById(id: UserId): Promise<User | null> {
    const entity = await this.repo.findOne({ where: { id: id.toString() } });
    if (!entity) return null;
    return new User(
      UserId.fromString(entity.id),
      entity.email,
      entity.passwordHash,
      entity.createdAt,
    );
  }
}
