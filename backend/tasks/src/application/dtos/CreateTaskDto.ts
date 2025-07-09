export interface CreateTaskDto {
    projectId: string;
    title: string;
    description: string;
    dueDate: string; // ISO
  }
  