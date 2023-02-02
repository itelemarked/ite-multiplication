import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RouterData } from './router-data-service';

@Component({
  selector: 'app-training-running2',
  styles: [``],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>
          training-running2
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      training-running2 works
      <ion-button routerLink="testing/test2">go to test2</ion-button>
      <p>name (passed): {{ name }}</p>
    </ion-content>
  `,
})
export class TrainingRunning2Page {

  name?: string;

  constructor(private router: Router, private routerData: RouterData) {
    // const state = this.router.getCurrentNavigation()?.extras?.state;
    // const bases = state ? state['bases']: null;
    // console.log(`From constuctor: ${bases}`)

    // router.events.subscribe(e => {
    //   console.log('routing events from TrainingRunning2Page', e)
    // })
    console.log('TrainingRunning2Page constructor')
    this.routerData.subscribe<string>(data => this.name = data['name'])
  }

  // ionViewWillEnter() {
  //   // const state = this.router.getCurrentNavigation()?.extras?.state;
  //   // const bases = state ? state['bases']: null;
  //   // console.log(`From ionViewWillEnter: ${bases}`)

  //   console.log('TrainingRunning2Page ionViewWillEnter')
  // }

  // ionViewDidEnter() {
  //   console.log('TrainingRunning2Page ionViewDidEnter')
  // }

  // ionViewWillLeave() {
  //   console.log('TrainingRunning2Page ionViewWillLeave')
  // }

  // ionViewDidLeave() {
  //   console.log('TrainingRunning2Page ionViewDidLeave')
  // }

}
