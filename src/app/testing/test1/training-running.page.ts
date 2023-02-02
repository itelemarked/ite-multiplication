import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Multiple } from './Multiple';
import { Training } from './Training';
import { TrainingController } from './training.service';

@Component({
  selector: 'app-training-running-page',
  styles: [``],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Training Running
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>

      <p>id: {{ currentMultiple.id }}</p>
      <input #resultEl type="text"/>
      <ion-button (click)="onVerify(resultEl)" >Verify</ion-button>

    </ion-content>
  `,
})
export class TrainingRunningPage implements OnInit {

  currentMultiple!: Multiple;
  training: Training;

  constructor(private trainingCtrl: TrainingController, private router: Router) {
    this.training = this.trainingCtrl.get();
  }

  ngOnInit(): void {

    if (this.training.randomPendingMultiple() === null) throw new Error('Training is completed...')
    this.currentMultiple = this.training.randomPendingMultiple()!

    this.training.complete$.subscribe(this.onComplete.bind(this))
  }

  onVerify(resultEl: HTMLInputElement) {
    if (+resultEl.value === this.currentMultiple.result) {
      this.training.addSuccess(this.currentMultiple.id);
    } else {
      this.training.addFail(this.currentMultiple.id);
    }
    resultEl.value = '';
    if (!this.training._isTrainingCompleted()) {
      this.currentMultiple = this.training.randomPendingMultiple()!;
    }
  }

  onComplete() {
    this.router.navigateByUrl('testing')
  }

}
