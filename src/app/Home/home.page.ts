import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  styles: [``],
  template: `
    <ion-header>
      <app-toolbar title="Home"></app-toolbar>
    </ion-header>

    <ion-content>
      <p>home component works!</p>
    </ion-content>
  `,
})
export class HomePage {
  constructor() {}
}
