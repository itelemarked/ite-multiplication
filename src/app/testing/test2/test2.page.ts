import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterData } from './router-data-service';
import { Training } from './utils3/classes/training';
import { createMultiple, generateMultiplesByBasesAndFactors } from './utils3/functions/multiple';


@Component({
  selector: 'app-test2',
  styles: [``],
  template: `
    <ion-header>
      <app-toolbar title="Test2"></app-toolbar>
    </ion-header>

    <ion-content>

      <div>
        <h3>Start new training</h3>
        <label style="display: block"
          >Bases
          <input #basesEl type="text" />
        </label>

        <label style="display: block" class="ion-padding-top"
          >Successes
          <input #successesEl type="text" />
        </label>

        <ion-button
          size="small"
          expand="block"
          (click)="onNewTraining(basesEl.value, successesEl.value)"
          >New Training</ion-button
        >
      </div>

      <div class="ion-padding-top">
        <h3>Resume pending training</h3>
        <p>
          Progress: xx % <br />
          Time to go: xx min, yy sec
        </p>
        <ion-button size="small" expand="block">Resume Training</ion-button>
      </div>

    </ion-content>

  `,
})
export class Test2Page {
  constructor(
    private router: Router,
    private routerData: RouterData
  ) {}

  onNewTraining(bases: string, successes: string) {
    if (bases.trim() === '' || successes.trim() === '') return;
    const basesNb = bases.split(',').map(a => +a);
    const successesNb = +successes
    const multiples = generateMultiplesByBasesAndFactors(basesNb, [1,2]);
    const training = new Training(successesNb, multiples);

    this.router.navigateByUrl('testing/test2/training-running2', {state: {bases}})
      .then(_ => this.routerData.emit({training}))
  }

}
