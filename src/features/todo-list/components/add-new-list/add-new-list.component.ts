import { Component, ChangeDetectionStrategy, } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-add-new-list',
  standalone: true,
  imports: [ButtonModule, DialogModule],
  templateUrl: './add-new-list.component.html',
  styleUrl: './add-new-list.component.scss',
 changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddNewListComponent {
  	/* ------------------------------------------  Types and Constants ------------------------------------------ */

	/* ------------------------------------------ PROVIDERS / SERVICES ------------------------------------------ */

	/* ------------------------------------------------  Inputs ------------------------------------------------ */

	/* ------------------------------------------------  Outputs ------------------------------------------------ */

	/* ------------------------------------------------  Signals ------------------------------------------------ */

	/* -------------------------------------------------- Data -------------------------------------------------- */
  protected dialogVisible:boolean = false;
	/* ------------------------------------------------  Constructor ------------------------------------------------ */
	constructor() {}

	/* ----------------------------------------------- Lifecycle Hooks ----------------------------------------------- */

	/* ------------------------------------------------  Methods ------------------------------------------------ */

}
