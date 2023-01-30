import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";

import { TestingPage } from "./testing.page";
import { CreateTraining } from "./create-training.component";


const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: defaultRoute },
  { path: '', component: TestingPage },
  // { path: '**', pathMatch: 'full', redirectTo: defaultRoute },
];


@NgModule({
  declarations: [
    TestingPage,
    CreateTraining
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
})
export class TestingModule { }
