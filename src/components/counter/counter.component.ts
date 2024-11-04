import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
})
export class CounterComponent {
  /* ------------------------------------------  Types and Constants ------------------------------------------ */

  /* ------------------------------------------ PROVIDERS / SERVICES ------------------------------------------ */

  /* ------------------------------------------------  Inputs ------------------------------------------------ */

  /* ------------------------------------------------  Outputs ------------------------------------------------ */

  /* ------------------------------------------------  Signals ------------------------------------------------ */

  /* -------------------------------------------------- Data -------------------------------------------------- */
  protected count = 0;
  private running = false;
  private intervalID;
  /* ------------------------------------------------  Constructor ------------------------------------------------ */
  constructor() {
    console.log(this.count);
    this.intervalID = setInterval(() => {
      if (this.running) {
          this.count++;
          console.log(this.count)
          // updateCounter()
      }
  }, 1000)
  }

  /* ----------------------------------------------- Lifecycle Hooks ----------------------------------------------- */

  /* ------------------------------------------------  Methods ------------------------------------------------ */

  protected start() {
    this.running = true;
  }

  protected stop() {
    this.running = false;
  }

  protected kill() {
    // if(this.intervalID.hasRef()){
      clearInterval(this.intervalID)
    // }
  }
  protected reset() {
    this.count = 0;
    // renderCounter()
  }
}
