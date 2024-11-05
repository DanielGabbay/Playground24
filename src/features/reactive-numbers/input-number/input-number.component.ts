import { Component, ChangeDetectionStrategy,  inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { NumbersService } from '../numbers.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-input-number',
  standalone: true,
  imports: [InputNumberModule, FormsModule, AsyncPipe],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.scss',
 changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputNumberComponent {
  protected readonly numbersService = inject(NumbersService);

  constructor() {}
}
