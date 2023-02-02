import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Training } from './Training';
import { TrainingInProgressModal } from './training-in-progress.modal';

@Component({
  selector: 'app-test1',
  styles: [``],
  template: `
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
  `,
})
export class Test1Component {
  constructor(private router: Router, private modalCtrl: ModalController) {}

  async onNewTraining(bases: string, successes: string) {
    if (bases.trim() === '' || successes.trim() === '')
      throw new Error('invalid inputs!');
    const basesArr = bases.split(',').map((b) => +b.trim());

    const training: Training = new Training(1, [
      { id: '1x1', successes: 0, fails: 0 },
      { id: '1x2', successes: 0, fails: 0 },
      { id: '1x3', successes: 0, fails: 0 },
    ]);

    const modal = await this.modalCtrl.create({
      component: TrainingInProgressModal,
      componentProps: { training },
    });
    await modal.present();

    const data = await modal.onWillDismiss();
  }
}
