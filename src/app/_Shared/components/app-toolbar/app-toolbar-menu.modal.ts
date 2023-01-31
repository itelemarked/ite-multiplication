import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-toolbar-menu',
  styles: [``],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons>
          <ion-button (click)="onClose()">close</ion-button>
        </ion-buttons>
        <ion-title>
          Pages menu
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item button [routerLink]="'/home'" (click)="modalCtrl.dismiss()">Home</ion-item>
        <ion-item button [routerLink]="'/testing'" (click)="modalCtrl.dismiss()">***Testing***</ion-item>
      </ion-list>
    </ion-content>
  `,
})
export class AppToolbarMenuModal {

  constructor(public modalCtrl: ModalController) {}

  onClose() {
    this.modalCtrl.dismiss();
  }

}
