import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training',
  styles: [],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons>
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Training</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <app-training-setup></app-training-setup>
    </ion-content>
  `,
})
export class TrainingPage {}
