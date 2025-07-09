import { validate as uuidValidate } from 'uuid';

export class ProjectId {
  private constructor(private readonly value: string) {}

  static fromString(id: string): ProjectId {
    if (!uuidValidate(id)) throw new Error(`ProjectId inválido: ${id}`);
    return new ProjectId(id);
  }

  toString(): string {
    return this.value;
  }

  get valueOf(): string {
    return this.value;
  }
}
