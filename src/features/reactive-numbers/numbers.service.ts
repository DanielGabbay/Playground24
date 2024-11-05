import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, map, Subject } from 'rxjs';

interface User {
    id:string;
    name: string,
    address: {
        city: string;
    }
}

@Injectable({
  providedIn: 'root',
})
export class NumbersService {
  public value$ = new BehaviorSubject<number>(0);
  public valuePow$ = this.value$.pipe(map((newValue) => newValue * newValue));

  public valueSignal$: WritableSignal<number> = signal(0);
  public valuePowSignal$ = computed(
    () => this.valueSignal$() * this.valueSignal$()
  );

  public users$ = signal<User[]>([])

  constructor() {
    // עדכון
    // השמה
    // אתחול
    // חישוב מבוסס
    // האזנה

    const newCity = "Karmiel"
    const uid = "123";

    this.users$.update((usersArray)=>{
        return usersArray.map(u=>{
            if(u.id==uid) {
                u.address.city = newCity;
            }
            return u;
        })
    })

  }
}
