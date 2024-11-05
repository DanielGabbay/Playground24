export enum TaskStatus {
  TODO = 'TODO',
  COMPLETED = 'COMPLETED',
}

export type ITask = {
  id: string;
  title: string;
  status: TaskStatus;
};
