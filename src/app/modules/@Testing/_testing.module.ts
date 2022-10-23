import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { TestingPage } from "./_testing.page";

import { IdbComponent } from "./idb.component";
import { ComputedPipe, PipeComponent } from "./pipe.component";
import { CommonModule } from "@angular/common";
import { StoringComponent } from "./storing/storing.component";



const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: defaultRoute },
  { path: '', component: TestingPage },
  // { path: '**', pathMatch: 'full', redirectTo: defaultRoute },
];


@NgModule({
  declarations: [
    TestingPage,
    IdbComponent,
    PipeComponent,
    ComputedPipe,
    StoringComponent
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
