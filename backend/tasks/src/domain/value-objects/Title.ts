export class Title {
    constructor(public readonly value: string) {
      if (value.trim().length === 0) throw new Error('Título vacío');
    }
  }
  