import { Component, ChangeDetectionStrategy,  inject } from '@angular/core';
import { NumbersService } from '../numbers.service';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-even-number',
  standalone: true,
  imports: [NgClass, AsyncPipe],
  templateUrl: './even-number.component.html',
  styleUrl: './even-number.component.scss',
 changeDetection: ChangeDetectionStrategy.OnPush
})
export class EvenNumberComponent {
  protected readonly numbersService = inject(NumbersService);

  constructor() {}
}
