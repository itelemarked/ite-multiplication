import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Multiple } from './Multiple';
import { TrainingService } from './training.service';


@Component({
  selector: 'app-testing',
  styles: [
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Testing</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div>
        <h3>Start new training</h3>
        <label style="display: block">Bases
          <input #basesEl type="text"/>
        </label>

        <label style="display: block" class="ion-padding-top">Successes
          <input #successesEl type="text"/>
        </label>

        <ion-button size="small" expand="block" (click)="onNewTraining(basesEl.value, successesEl.value)">New Training</ion-button>
      </div>

      <div class="ion-padding-top">
        <h3>Resume pending training</h3>
        <p>
          Progress: xx % <br>
          Time to go: xx min, yy sec
        </p>
        <ion-button size="small" expand="block">Resume Training</ion-button>
      </div>

    </ion-content>
  `

})
export class TestingPage {

  constructor(private training: TrainingService, private router: Router) {}

  onNewTraining(bases: string, successes: string) {
    if (bases.trim() === '' || successes.trim() === '') throw new Error('invalid inputs!')
    const basesArr = bases.split(',').map(b => +b.trim())
    this.training.createByBases(basesArr, +successes);

    this.router.navigateByUrl('testing/training-running')
  }

}
