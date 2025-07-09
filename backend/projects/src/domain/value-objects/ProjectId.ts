import { v4 as uuidv4 } from 'uuid';

export class ProjectId {
  private constructor(private readonly value: string) {}

  static create(): ProjectId {
    return new ProjectId(uuidv4());
  }

  static fromString(id: string): ProjectId {
    // podrías validar formato aquí
    return new ProjectId(id);
  }

  toString(): string {
    return this.value;
  }
}