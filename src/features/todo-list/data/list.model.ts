import { ITask } from './task.model';

export type IList = {
  id: string;
  name: string;
  tasks: ITask[];
};

export class List implements IList {
  id: string;
  name: string;
  tasks: ITask[] = [];

  constructor() {}

  static createEmpty(newListName: string): List {
    const newList = new List();
    newList.id = crypto.randomUUID();
    newList.name = newListName;
    return newList;
  }
}
