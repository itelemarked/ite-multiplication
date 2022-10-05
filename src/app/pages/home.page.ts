import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
        <ion-button fill="outline" (click)="onClick()">btn</ion-button>
        <ion-fab-button color="primary">Primary</ion-fab-button>
    </ion-content>
  `,
  styles: [],
})
export class HomePage implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onClick() {}
}
