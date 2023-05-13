import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ion-app class="size-sm">
      <ion-router-outlet></ion-router-outlet>
    </ion-app>
  `,
  styles: [``],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {}
