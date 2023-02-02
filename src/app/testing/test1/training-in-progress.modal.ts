import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Multiple } from './Multiple';
import { Training } from './Training';
import { TrainingController } from './training.service';

@Component({
  selector: 'app-training-in-progress-page',
  styles: [``],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Training Running
        </ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="onCloseClick()">close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>

      <p>id: {{ currentMultiple.id }}</p>
      <input #resultEl type="text"/>
      <ion-button (click)="onVerify(resultEl)" >Verify</ion-button>

    </ion-content>
  `,
})
export class TrainingInProgressModal implements OnInit {

  currentMultiple!: Multiple;
  @Input() training!: Training;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit(): void {
    // console.log(this.training)
    // const randomMultiple = getRandomFilteredMultiple(this.training.multiples, (m) => m.successes < this.training.successesRequired)
    // if (randomMultiple !== null) {
    //   this.currentMultiple = randomMultiple;
    // } else {
    //   // TODO
    // }
  }

  onVerify(resultEl: HTMLInputElement) {
    // if (resultEl.value.trim() === '') return;

    // if (+resultEl.value === getResult(this.currentMultiple.id)) {
    //   this.currentMultiple.successes++;
    // } else {
    //   this.currentMultiple.fails++;
    // }

    // resultEl.value = "";
    // const completed = getRandomFilteredMultiple(this.training.multiples, (m) => m.successes < this.training.successesRequired);
    // if (completed !== null) {
    //   this.currentMultiple = completed;
    // }
  }

  onCloseClick() {
    this.modalCtrl.dismiss();
  }

  onComplete() {
    this.modalCtrl.dismiss();
  }

}
