import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { NumbersService } from '../numbers.service';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-odd-number',
  standalone: true,
  imports: [NgClass, AsyncPipe],
  templateUrl: './odd-number.component.html',
  styleUrl: './odd-number.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OddNumberComponent {
  protected readonly numbersService = inject(NumbersService);

  constructor() {}
}
