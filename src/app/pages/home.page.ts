import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  styles: [],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
        <ion-buttons slot="end">
          <ion-button slot="icon-only" routerLink="auth">
            <ion-icon name="person-circle-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-button>go to training</ion-button>
    </ion-content>
  `,
})
export class HomePage {}
