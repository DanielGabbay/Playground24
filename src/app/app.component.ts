import { Component, ChangeDetectionStrategy,  inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterComponent } from '../components/counter/counter.component';
import { TodoCounterComponent } from '../features/todo-list/components/todo-counter/todo-counter.component';
import { TodoListComponent } from '../features/todo-list/components/todo-list/todo-list.component';
import { PrimeNGConfig } from 'primeng/api';
import { Lara } from 'primeng/themes/lara';
import { MenubarComponent } from '../components/menubar/menubar.component';
import { Aura } from 'primeng/themes/aura';
import { ButtonModule } from 'primeng/button';
import { AddNewListComponent } from "../features/todo-list/components/add-new-list/add-new-list.component";
import { InputNumberComponent } from "../features/reactive-numbers/input-number/input-number.component";
import { OddNumberComponent } from "../features/reactive-numbers/odd-number/odd-number.component";
import { EvenNumberComponent } from "../features/reactive-numbers/even-number/even-number.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CounterComponent,
    TodoCounterComponent,
    TodoListComponent,
    MenubarComponent,
    AddNewListComponent,
    InputNumberComponent,
    OddNumberComponent,
    EvenNumberComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
 changeDetection: ChangeDetectionStrategy.OnPush
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
    this.config.theme.set({
      preset: Aura,
      options: {
        darkModeSelector: '.dark-mode',
        cssLayer: {
          name: 'primeng',
          order: 'tailwind-base, primeng, tailwind-utilities',
        },
      },
    });
  }

  /* ----------------------------------------------- Lifecycle Hooks ----------------------------------------------- */

  /* ------------------------------------------------  Methods ------------------------------------------------ */
}
