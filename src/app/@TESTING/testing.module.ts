import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TestingRoutingModule } from './testing-routing.module';

import { TestsComponent } from './angularfirestore/tests.component/tests.component';




@NgModule({
  declarations: [
    TestsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TestingRoutingModule
  ]
})
export class TestingModule { }
