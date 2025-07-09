export class DueDate {
  constructor(private readonly date: Date) {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error('DueDate inválida');
    }
  }

  static fromISOString(iso: string): DueDate {
    const date = new Date(iso);
    return new DueDate(date);
  }

  get value(): Date {
    return this.date;
  }

  toISOString(): string {
    return this.date.toISOString();
  }

  isPast(): boolean {
    return this.date.getTime() < Date.now();
  }
}
