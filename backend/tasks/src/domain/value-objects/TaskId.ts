import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export class TaskId {
  private constructor(private readonly value: string) {}

  static generate(): TaskId {
    return new TaskId(uuidv4());
  }

  static fromString(id: string): TaskId {
    if (!uuidValidate(id)) {
      throw new Error(`TaskId inválido: ${id}`);
    }
    return new TaskId(id);
  }

  toString(): string {
    return this.value;
  }

  get valueOf(): string {
    return this.value;
  }
}
