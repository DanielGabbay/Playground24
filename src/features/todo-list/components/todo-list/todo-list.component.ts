import {
  Component,
  ChangeDetectionStrategy,
  Input,
  inject,
  OnInit,
  WritableSignal,
  signal,
} from '@angular/core';
import { List } from '../../data/list.model';
import { ActivatedRouteSnapshot } from '@angular/router';
import { TodoListService } from '../../data/todo-list.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  /* ------------------------------------------  Types and Constants ------------------------------------------ */

  /* ------------------------------------------ PROVIDERS / SERVICES ------------------------------------------ */
  private readonly todoListService: TodoListService = inject(TodoListService);
  /* ------------------------------------------------  Inputs ------------------------------------------------ */
  // list:List
  @Input({ required: true }) id: string;
  /* ------------------------------------------------  Outputs ------------------------------------------------ */

  /* ------------------------------------------------  Signals ------------------------------------------------ */
  list$: WritableSignal<List> = signal<List>(null);
  /* -------------------------------------------------- Data -------------------------------------------------- */
  /* ------------------------------------------------  Constructor ------------------------------------------------ */
  constructor() {}

  /* ----------------------------------------------- Lifecycle Hooks ----------------------------------------------- */

  /* ------------------------------------------------  Methods ------------------------------------------------ */

  ngOnInit() {
    this.todoListService.getList(this.id).subscribe((list) => {
      this.list$.set(list);
    });
  }
}
