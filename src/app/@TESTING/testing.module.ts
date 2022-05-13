import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestingRoutingModule } from './testing-routing.module';

import { AngularfirestoreComponent } from './angularfirestore/angularfirestore.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    AngularfirestoreComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TestingRoutingModule
  ]
})
export class TestingModule { }
