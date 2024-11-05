import { NgClass } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
  effect,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TodoListService } from '../../data/todo-list.service';
import { List } from '../../data/list.model';

@Component({
  selector: 'app-add-new-list',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    FloatLabelModule,
    InputTextModule,
    FormsModule,
    NgClass,
  ],
  templateUrl: './add-new-list.component.html',
  styleUrl: './add-new-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewListComponent {
  /* ------------------------------------------  Types and Constants ------------------------------------------ */

  /* ------------------------------------------ PROVIDERS / SERVICES ------------------------------------------ */
  private readonly todoListService: TodoListService = inject(TodoListService);
  /* ------------------------------------------------  Inputs ------------------------------------------------ */

  /* ------------------------------------------------  Outputs ------------------------------------------------ */

  /* ------------------------------------------------  Signals ------------------------------------------------ */
  protected readonly newListName$ = signal<string>('');
  protected readonly externalErrors$ = signal<Set<string>>(new Set<string>());

  protected readonly errors$ = computed<string[]>(() => {
    const newListName = this.newListName$();
    const errorsArray: string[] = [];
    if (newListName.length < 2)
      errorsArray.push('יש להזין שם רשימה עם 2 תווים לפחות');
    if (newListName.includes('&'))
      errorsArray.push('לא ניתן להגדיר שם רשימה עם התו &');
    return errorsArray;
  });

  protected readonly allErrors$ = computed<string[]>(() => [
    ...this.externalErrors$(),
    ...this.errors$(),
  ]);

  protected dialogVisible$ = signal<boolean>(false);

  /* -------------------------------------------------- Data -------------------------------------------------- */
  protected inCreation = false;
  /* ------------------------------------------------  Constructor ------------------------------------------------ */
  constructor() {
    effect(
      () => {
        if (this.dialogVisible$() === false) {
          this.resetState();
        }
      },
      { allowSignalWrites: true }
    );
  }

  /* ----------------------------------------------- Lifecycle Hooks ----------------------------------------------- */

  /* ------------------------------------------------  Methods ------------------------------------------------ */
  protected createNewList() {
    const newList = List.createEmpty(this.newListName$());
    this.inCreation = true;
    this.todoListService.setList(newList).subscribe((res) => {
      this.inCreation = false;
      if (res) {
        this.dialogVisible$.set(false);
      } else {
        this.externalErrors$.update((errorsSet) => {
          errorsSet.add('קיימת רשימה עם שם זהה, הזן שם רשימה אחרת');
          return new Set(errorsSet);
        });
      }
    });
  }

  private resetState(): void {
    this.newListName$.set('');
    this.externalErrors$.set(new Set());
  }
}
