import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@app/shared/shared.module";
import { TestingComponent } from "./testing.component";

import { Test1Component } from "./test1/test1.component";
import { TrainingInProgressModal } from "./test1/training-in-progress.modal";

import { Test2Page} from "./test2/test2.page";
import { TrainingRunning2Page } from "./test2/training-running2.page";
import { Test3Page } from "./test3/test3.page";


const TESTING_DEFAULT = 'test3';

const routes: Routes = [
  { path: '', component: TestingComponent, children: [
    { path: '', pathMatch: 'full', redirectTo: TESTING_DEFAULT },

    { path: 'test2', component: Test2Page },
    { path: 'test2/training-running2', component: TrainingRunning2Page},

    { path: 'test3', component: Test3Page},

    { path: '**', pathMatch: 'full', redirectTo: TESTING_DEFAULT },
  ] },

  // { path: 'test2/training-running2'},

];


@NgModule({
  declarations: [
    TestingComponent,

    Test1Component,
    TrainingInProgressModal,

    Test2Page,
    TrainingRunning2Page,

    Test3Page
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [],
})
export class TestingModule { }
