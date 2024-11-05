import { NgClass } from '@angular/common';
import { Component, ChangeDetectionStrategy, } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Badge, BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [MenubarModule, BadgeModule, NgClass],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.scss',
 changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenubarComponent {
  protected items: MenuItem[] = [
    {
      label: 'מונה',
      icon: "pi pi-stopwatch text-blue-500",
      styleClass: "text-lg font-semibold"
    },
    {
      label: 'רשימות',
      icon: "pi pi-list-check text-blue-500",
      styleClass: "text-lg font-semibold",
      items: [
        {
          label: 'רשימה 1',
        },
        {
          label: 'רשימה 2',
        },
        {
          label: 'רשימה 3',
        },
      ],
    },
  ];

  
}