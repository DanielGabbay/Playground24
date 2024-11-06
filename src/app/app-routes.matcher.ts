import { CanMatchFn, Route, UrlSegment } from '@angular/router';
import { TodoListService } from '../features/todo-list/data/todo-list.service';
import { inject } from '@angular/core';

export function listIdMatcher(): CanMatchFn {
  return (route: Route, segments: UrlSegment[]) => {
    const todoListService: TodoListService = inject(TodoListService);
    const id = segments?.at(1)?.path;
    return todoListService.hasList(id, 'id');
  };
}
