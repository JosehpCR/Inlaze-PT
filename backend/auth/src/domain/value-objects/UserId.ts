import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export class UserId {
  private constructor(private readonly value: string) {}

  static create(): UserId {
    return new UserId(uuidv4());
  }

  static fromString(id: string): UserId {
    if (!uuidValidate(id)) {
      throw new Error(`Invalid UserId: ${id}`);
    }
    return new UserId(id);
  }

  toString(): string {
    return this.value;
  }
}
