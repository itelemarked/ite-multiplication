import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { IonicModule } from "@ionic/angular";

import { TestingPage } from "./testing.page/testing.page";
import { Testing2Page } from "./testing2.page/testing2.page";
import { Testing3Page } from "./testing3.page/testing3.page";
import { BasesSelectComponent } from "./base-select.component/bases-select.component";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";




const ROUTES: Routes = [
  { path: '', component: Testing3Page }
];


const COMPONENTS = [
  TestingPage,
  Testing2Page,
  Testing3Page,

  BasesSelectComponent
];


@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class TestingModule {}
