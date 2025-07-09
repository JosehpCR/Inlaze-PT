import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { RegisterUserDto } from '../dtos/RegisterUserDto';
import { UserDto } from '../dtos/UserDto';
import { User } from '../../domain/entities/User';
import { UserId } from '../../domain/value-objects/UserId';
import * as bcrypt from 'bcrypt';

export class RegisterUserUseCase {
  constructor(private readonly repo: IUserRepository) {}

  async execute(input: RegisterUserDto): Promise<UserDto> {
    const existing = await this.repo.findByEmail(input.email);
    if (existing) {
      throw new Error('Email already in use');
    }
    const id = UserId.create();
    const hash = await bcrypt.hash(input.password, 10);
    const user = new User(id, input.email, hash);
    await this.repo.save(user);
    return { id: user.id.toString(), email: user.email, createdAt: user.createdAt };
  }
}
