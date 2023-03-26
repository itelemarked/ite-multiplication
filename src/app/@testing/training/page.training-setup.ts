import { Component } from '@angular/core';

@Component({
  selector: 'app-training-setup',
  template: `
    <ion-header>
      <app-toolbar title="Training Setup"></app-toolbar>
    </ion-header>

    <ion-content class="ion-padding" [forceOverscroll]="false">

      <div *ngIf="!isTrainingInProgress">
        <h3>Start new training</h3>
        <p>Bases: </p>
        <p>Required successes per event: 2</p>
        <p>Time out: 2 sec</p>
        <ion-button expand="block">START NEW TRAINING</ion-button>
      </div>

      <div *ngIf="isTrainingInProgress">
        <h3>Training in progress:</h3>
        <ion-progress-bar [value]="0.83"></ion-progress-bar>
        <p>Progress: 83%</p>
        <p>Remaining successes: 12</p>
        <p>Estimated remaining time: 2 min 53 sec</p>
        <ion-button expand="block">CONTINUE TRAINING</ion-button>
        <ion-button expand="block" color="danger" fill="outline">DISCARD TRAINING</ion-button>
      </div>

      <p>isChecked: {{isChecked}}</p>
      <app-toggle-button [checked]="true">toggle</app-toggle-button>
      <!-- <app-toggle-button [(checked)]="isChecked" [value]="1" (checkedChange)="onCheckedChange($event)">toggle</app-toggle-button> -->
      <!-- <app-toggle-button [(checked)]="isChecked" [value]="1">toggle 1</app-toggle-button>
      <app-toggle-button [(checked)]="isChecked" [value]="2">toggle 2</app-toggle-button> -->

    </ion-content>
  `,
  styles: [``],
})
export class TrainingSetupPage {

  isTrainingInProgress = false;

  isChecked: (string|number)[] | boolean = true;

  constructor() {
    setTimeout(() => {
      // this.isChecked = [];
    }, 3000);
  }

  onCheckedChange(val: boolean) {
    this.isChecked = val;
  }

  // onCheckedChange(val: boolean) {
  //   console.log(`checked changed: ${val}`)
  // }

}
