import { UserId } from '../value-objects/UserId';

export class User {
  constructor(
    public readonly id: UserId,
    public email: string,
    public passwordHash: string,
    public readonly createdAt: Date = new Date(),
  ) {}
}
