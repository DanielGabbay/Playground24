import { Inject, Injectable, signal, WritableSignal } from '@angular/core';
import { filter, map, Observable, of, switchMap, tap, timeout } from 'rxjs';
import { IList } from './list.model';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  private static LIST_PREFIX: string = 'LIST_';

  private readonly _allLists$: WritableSignal<IList[]> = signal<IList[]>(null);
  public readonly allLists$ = this._allLists$.asReadonly();

  constructor() {
    this.getLists().subscribe();
  }

  public getLists(force: boolean = false): Observable<IList[]> {
    const allLists = this._allLists$();
    if (!force && allLists !== null) return of(allLists);

    const lists = Object.keys(localStorage).flatMap((k) => {
      if (!k.startsWith(TodoListService.LIST_PREFIX)) return [];
      const listString = localStorage.getItem(k);
      const list: IList = JSON.parse(listString);
      return list;
    });
    return of(lists).pipe(
      timeout(1000),
      tap((lists) => {
        this._allLists$.set(lists);
      })
    );
  }

  public getList(id: string): Observable<IList> {
    return this.getLists().pipe(map((lists) => lists.find((l) => l.id === id)));
  }

  // public hasList(listName: string): boolean {
  //   const lists = Object.keys(localStorage).flatMap((k) => {
  //     if (!k.startsWith(TodoListService.LIST_PREFIX)) return [];
  //     const listString = localStorage.getItem(k);
  //     const list: IList = JSON.parse(listString);
  //     return list;
  //   });
  //   return lists.some((list) => list.name === listName);
  // }

  //{name?:string, id?:string}
  public hasList(name: string, key: 'name'): boolean;
  public hasList(id: string, key: 'id'): boolean;
  public hasList(value: string, key: 'id' | 'name' = undefined): boolean {
    debugger;
    const lists = Object.keys(localStorage).flatMap((k) => {
      if (!k.startsWith(TodoListService.LIST_PREFIX)) return [];
      const listString = localStorage.getItem(k);
      const list: IList = JSON.parse(listString);
      return list;
    });
    return lists.some((list) => list[key] === value);
  }

  public _hasList(params: { name: string } | { id: string }): boolean {
    // [[name, nameValue] | [id, idValue]] => [name, nameValue] | [id, idValue]
    debugger;
    const lists = Object.keys(localStorage).flatMap((k) => {
      if (!k.startsWith(TodoListService.LIST_PREFIX)) return [];
      const listString = localStorage.getItem(k);
      const list: IList = JSON.parse(listString);
      return list;
    });
    const p = Object.entries(params)[0]; // [name, nameValue] | [id, idValue]
    const [key, value] = p;
    return lists.some((list) => list[key] === value);
  }

  public setList(list: IList): Observable<boolean> {
    const listID = TodoListService.LIST_PREFIX + list.id;
    if (localStorage.getItem(listID) || this.hasList(list.name, "name")) {
      return of(false).pipe(timeout(1000));
    }
    localStorage.setItem(listID, JSON.stringify(list));
    return of(true).pipe(
      timeout(1000),
      switchMap(() => {
        return this.getLists(true);
      }),
      map(Boolean)
    );
  }
}
