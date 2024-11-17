import { NgClass } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
  OnInit,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Badge, BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { TodoListService } from '../../features/todo-list/data/todo-list.service';
import { Router } from '@angular/router';
import { UsersSignalStore } from '../../features/users/+store/users.signal-store';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [MenubarModule, BadgeModule, NgClass],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarComponent  {
  private readonly todoListService: TodoListService = inject(TodoListService);
  private readonly router: Router = inject(Router);

  private readonly usersStore = inject(UsersSignalStore);

  protected readonly items = computed<MenuItem[]>(() => {
    const availableListsMenuItems =
      this.todoListService.allLists$()?.map((l) => {
        return {
          label: l.name,
          command: (e) => {
            this.router.navigate(['list', l.id]);
          },
        } as MenuItem;
      }) || [];

    const usersCount = this.usersStore.usersCount$();

    return [
      {
        label: 'מונה',
        icon: 'pi pi-stopwatch text-blue-500',
        styleClass: 'text-lg font-semibold',
        routerLink: 'counter',
      },
      {
        label: 'רשימות',
        icon: 'pi pi-list-check text-blue-500',
        styleClass: 'text-lg font-semibold',
        items: availableListsMenuItems,
      },
      {
        label: `טבלת משתמשים (${usersCount})`,
        icon: 'pi pi-user text-green-500',
        routerLink: 'users',
      },
    ];
  });

  constructor() {}


}
