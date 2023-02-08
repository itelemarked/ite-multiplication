import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RouterData } from './router-data-service';
import { Training } from './utils3/classes/training';

@Component({
  selector: 'app-training-running2',
  styles: [``],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button routerLink="testing/test2">test2</ion-button>
        </ion-buttons>
        <ion-title>
          training-running2
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>

      <div>
        <h3>Training's multiples</h3>
        <div *ngFor="let m of training?.getMultiples()">
          <span>id: {{m.id}}</span>
        </div>
      </div>
    </ion-content>
  `,
})
export class TrainingRunning2Page {

  training?: Training;

  constructor(private router: Router, private routerData: RouterData) {
    console.log('TrainingRunning2Page constructor')
    this.routerData.subscribe<Training>(data => {
      this.training = data['training'];
      this.training.complete$.subscribe(this.onTrainingComplete.bind(this))
    })
  }

  onTrainingComplete(val: boolean) {
    if (val) {
      this.router.navigateByUrl('testing/test2')
    }
  }

}
