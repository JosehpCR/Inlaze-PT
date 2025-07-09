export interface ITaskEventPublisher {
  taskCreated(event: { id: string; projectId: string; title: string }): Promise<void>;
}
