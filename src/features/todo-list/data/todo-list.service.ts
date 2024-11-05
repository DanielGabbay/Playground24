import { Inject, Injectable } from '@angular/core';
import { Observable, of, timeout } from 'rxjs';
import { List } from './list.model';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  private static LIST_PREFIX: string = 'LIST_';

  constructor() {}

    public getLists():Observable<List[]> { 
        const lists = Object.keys(localStorage).flatMap(k=>{
            if(!k.startsWith(TodoListService.LIST_PREFIX)) return [];
            const listString = localStorage.getItem(k);
            const list:List = JSON.parse(listString);
            return list;
        })
        return of(lists).pipe(timeout(1000));
    }

  public setList(list: List):Observable<boolean> {
    const listID = TodoListService.LIST_PREFIX + list.id;
    localStorage.setItem(listID, JSON.stringify(list));
    return of(true).pipe(timeout(1000))
  }

  
}
