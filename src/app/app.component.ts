import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterComponent } from '../components/counter/counter.component';
import { TodoCounterComponent } from '../features/todo-list/components/todo-counter/todo-counter.component';
import { TodoListComponent } from '../features/todo-list/components/todo-list/todo-list.component';
import { PrimeNGConfig } from 'primeng/api';
import { Lara } from 'primeng/themes/lara';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CounterComponent,
    TodoCounterComponent,
    TodoListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  /* ------------------------------------------  Types and Constants ------------------------------------------ */

  /* ------------------------------------------ PROVIDERS / SERVICES ------------------------------------------ */
  private readonly config: PrimeNGConfig = inject(PrimeNGConfig);

  /* ------------------------------------------------  Inputs ------------------------------------------------ */

  /* ------------------------------------------------  Outputs ------------------------------------------------ */

  /* ------------------------------------------------  Signals ------------------------------------------------ */

  /* -------------------------------------------------- Data -------------------------------------------------- */

  /* ------------------------------------------------  Constructor ------------------------------------------------ */
  constructor() {
    this.config.theme.set({preset: Lara})
  }

  /* ----------------------------------------------- Lifecycle Hooks ----------------------------------------------- */

  /* ------------------------------------------------  Methods ------------------------------------------------ */
}
