export class Project {
    constructor(
      public readonly id: string,
      public name: string,
      public description: string,
      public readonly ownerId: string,
      public readonly createdAt: Date = new Date(),
    ) {}
  
    rename(newName: string) {
      if (!newName || newName.trim().length === 0) {
        throw new Error('El nombre no puede estar vacío');
      }
      this.name = newName;
    }
  
    updateDescription(newDescription: string) {
      this.description = newDescription;
    }
  }