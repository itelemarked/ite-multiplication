import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

const template = `
  <p></p>
`;

@Component({
  selector: 'app-testing',
  styles: [
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Testing</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <p>
        testing works! {{ testing }}
      </p>
    </ion-content>
  `

})
export class TestingComponent implements OnInit {

  testing: string = 'yeaaah'

  constructor(private afDatabase: AngularFireDatabase) {
    
  }

  ngOnInit(): void {
  }

}
