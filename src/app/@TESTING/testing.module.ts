import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { TestingPage } from "./pages/testing.page/testing.page";
import { Testing2Page } from "./pages/testing2.page/testing2.page";
import { Testing3Page } from "./pages/testing3.page/testing3.page";

import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { BasesPickerComponent } from './components/bases-picker/bases-picker.component';




const ROUTES: Routes = [
  { path: '', component: Testing3Page }
];


const COMPONENTS = [
  TestingPage,
  Testing2Page,
  Testing3Page,

  ToggleButtonComponent,
  BasesPickerComponent,
];


@NgModule({
  declarations: [
    ...COMPONENTS,
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
