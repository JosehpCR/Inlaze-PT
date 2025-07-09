import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { UserDto } from '../dtos/UserDto';
import { UserId } from '../../domain/value-objects/UserId';

export class ValidateUserUseCase {
  constructor(private readonly repo: IUserRepository) {}

  async execute(id: string): Promise<UserDto | null> {
    const user = await this.repo.findById(UserId.fromString(id));
    if (!user) return null;
    return { id: user.id.toString(), email: user.email, createdAt: user.createdAt };
  }
}
