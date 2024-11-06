import { Routes } from '@angular/router';
import { listIdMatcher } from './app-routes.matcher';


export const routes: Routes = [
    {
        path: 'counter',
        loadComponent: ()=> import('../components/counter/counter.component').then(c=>c.CounterComponent),
    },
    {
        path: 'list/:id',
        canMatch: [listIdMatcher()],
        canActivate: [],
        loadComponent: () => import('../features/todo-list/components/todo-list/todo-list.component').then(c=>c.TodoListComponent)
    }
];
