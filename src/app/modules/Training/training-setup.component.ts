import { Component, OnInit } from '@angular/core';
import { TrainingStoreService } from './training-store.service';

@Component({
  selector: 'app-training-setup',
  template: `
    <p>
      training-setup works!
    </p>
  `,
  styles: [
  ]
})
export class TrainingSetupComponent implements OnInit {

  constructor(private trainingStore: TrainingStoreService) { }

  ngOnInit(): void {
  }

}
