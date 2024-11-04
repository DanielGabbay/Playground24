import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  BehaviorSubject,
  interval,
  Observable,
  Subject,
  Subscription,
  take,
  takeUntil,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
})
export class CounterComponent {
  /* ------------------------------------------  Types and Constants ------------------------------------------ */

  /* ------------------------------------------ PROVIDERS / SERVICES ------------------------------------------ */

  /* ------------------------------------------------  Inputs ------------------------------------------------ */

  /* ------------------------------------------------  Outputs ------------------------------------------------ */

  /* ------------------------------------------------  Signals ------------------------------------------------ */

  /* -------------------------------------------------- Data -------------------------------------------------- */
  private running = false;
  protected readonly count$ = new BehaviorSubject<number>(0);
  private intervalSubscription: Subscription;
  private destory$ = new Subject<boolean>()

  /* ------------------------------------------------  Constructor ------------------------------------------------ */
  constructor() {

  }

  /* ----------------------------------------------- Lifecycle Hooks ----------------------------------------------- */

  /* ------------------------------------------------  Methods ------------------------------------------------ */

  protected start() {
    if (!this.running) {
      this.running = true;

      this.intervalSubscription = interval(1000)
        .pipe(tap(() => this.count$.next(this.count$.value + 1)),takeUntil(this.destory$))
        .subscribe();
    }
  }

  protected stop() {
    if(this.running) {
      this.running = false;
      this.intervalSubscription.unsubscribe();
    }
  }

  protected kill() {
    // if(this.running) {
    //   this.intervalSubscription.unsubscribe();
    // }
    this.destory$.next(true)
  }
  protected reset() {
    this.count$.next(0);
  }
}
