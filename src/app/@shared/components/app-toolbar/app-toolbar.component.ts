import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppToolbarMenuModal } from './app-toolbar-menu.modal';

@Component({
  selector: 'app-toolbar',
  styles: [``],
  template: `
    <div>
      <ion-toolbar>
        <ion-buttons>
          <ion-button slot="start" (click)="onMenuClick()">
            <ion-icon name="menu-outline" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ titleInp }}</ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon name="person-circle-outline" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </div>
  `,
})
export class AppToolbarComponent {

  @Input('title') titleInp: string = '';

  constructor(private modalCtl: ModalController) {}

  async onMenuClick() {
    const modal = await this.modalCtl.create({
      component: AppToolbarMenuModal,
      breakpoints: [0.8],
      initialBreakpoint: 0.8
    })
    modal.present()
  }
}
