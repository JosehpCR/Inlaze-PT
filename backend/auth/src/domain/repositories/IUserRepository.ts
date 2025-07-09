import { User } from '../entities/User';
import { UserId } from '../value-objects/UserId';

export interface IUserRepository {
  save(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: UserId): Promise<User | null>;
}
