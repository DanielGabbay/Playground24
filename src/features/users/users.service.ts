import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from './data/dtos/user.type';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly http: HttpClient = inject(HttpClient);

  constructor() {}

  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
  }
}
