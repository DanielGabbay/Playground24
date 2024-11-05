import { Inject, Injectable, signal } from '@angular/core';
import { map, Observable, of, switchMap, tap, timeout } from 'rxjs';
import { IList } from './list.model';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  private static LIST_PREFIX: string = 'LIST_';
  private readonly _allLists$ = signal<IList[]>(null);
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

  public hasList(listName: string): boolean {
    const lists = Object.keys(localStorage).flatMap((k) => {
      if (!k.startsWith(TodoListService.LIST_PREFIX)) return [];
      const listString = localStorage.getItem(k);
      const list: IList = JSON.parse(listString);
      return list;
    });
    return lists.some((list) => list.name === listName);
  }

  public setList(list: IList): Observable<boolean> {
    const listID = TodoListService.LIST_PREFIX + list.id;
    if (localStorage.getItem(listID) || this.hasList(list.name)) {
      return of(false).pipe(timeout(1000));
    }
    localStorage.setItem(listID, JSON.stringify(list));
    return of(true).pipe(
      timeout(1000),
      switchMap(() => {
        return this.getLists(true)
      }),
      map(Boolean)
    );
  }
}
