export interface TaskDto {
    id: string;
    projectId: string;
    title: string;
    description: string;
    dueDate: string;
    status: string;
    assignedTo?: string;
  }
  