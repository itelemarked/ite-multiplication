import { Component } from '@angular/core';
import { CheckedInput, ValueInput } from './toggle-button.component';
import { KeyboardOptions } from '../../@shared/components/keyboard/types';

@Component({
  selector: 'app-training-setup',
  template: `
    <ion-header>
      <app-toolbar title="Training Setup"></app-toolbar>
    </ion-header>

    <ion-content [forceOverscroll]="false" class="size-sm">

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

      <p>Value: {{keyboardValue}}</p>
      <app-numeric-keyboard [value]="keyboardValue" (keyTapped)="onKeyTapped($event)" (valueChange)="onValueChange($event)" [options]="options"></app-numeric-keyboard>

      <!-- <app-toggle-button [(checked)]="isChecked" [value]="1" [ionButtonProps]="{color: 'warning'}">toggle</app-toggle-button> -->
      <!-- <app-toggle-button [(checked)]="isChecked" [value]="1" (checkedChange)="onCheckedChange($event)">toggle</app-toggle-button> -->
      <!-- <app-toggle-button [(checked)]="isChecked" [value]="1">toggle 1</app-toggle-button>
      <app-toggle-button [(checked)]="isChecked" [value]="2">toggle 2</app-toggle-button> -->
      <!-- <ion-button>toggle button</ion-button>
      <ion-button>toggle button</ion-button> -->

    </ion-content>
  `,
  styles: [`

  `],
})
export class TrainingSetupPage {

  isTrainingInProgress = true;

  keyboardValue = '';
  options: KeyboardOptions = {
    'key-R': {
      text: '.',
      transform: (val: string) => {
        if (val.includes('.') || val === '') return val
        return val + '.'
      }
    }
  }

  // constructor() {
  //   setTimeout(() => {
  //     this.keyboardValue = '99'
  //   }, 3000);
  // }

  onKeyTapped(keyName: string) {
    // console.log(`tapped: ${keyName}`)
  }

  onValueChange(val: string) {
    // console.log(`value changed! new value: ${val}`)
  }

}
