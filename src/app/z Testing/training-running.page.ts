import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Multiple } from './Multiple';
import { TrainingService } from './training.service';

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

  constructor(private training: TrainingService, private router: Router) {}

  ngOnInit(): void {
    if (this.training.randomPendingMultiple() === null) throw new Error('Training is completed...')
    this.currentMultiple = this.training.randomPendingMultiple()!

    this.training.complete$.subscribe(_ => this.router.navigateByUrl('testing'))
  }

  onVerify(resultEl: HTMLInputElement) {
    if (+resultEl.value === this.currentMultiple.result) {
      this.training.addSuccess(this.currentMultiple.id);
    } else {
      this.training.addFail(this.currentMultiple.id);
    }
    resultEl.value = '';
    if (this.training.randomPendingMultiple() !== null) {
      this.currentMultiple = this.training.randomPendingMultiple()!;
    }
  }


}
