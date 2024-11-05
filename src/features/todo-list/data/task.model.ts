export enum TaskStatus {
  TODO = 'TODO',
  COMPLETED = 'COMPLETED',
}

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
};
