import { Task } from './task.model';

export type List = {
  id: string;
  name: string;
  tasks: Task[];
};
