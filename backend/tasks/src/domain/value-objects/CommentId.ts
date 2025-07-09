import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export class CommentId {
  private constructor(private readonly value: string) {}

  static generate(): CommentId {
    return new CommentId(uuidv4());
  }

  static fromString(id: string): CommentId {
    if (!uuidValidate(id)) throw new Error(`CommentId inválido: ${id}`);
    return new CommentId(id);
  }

  toString(): string {
    return this.value;
  }

  get valueOf(): string {
    return this.value;
  }
}