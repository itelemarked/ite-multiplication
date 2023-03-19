import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@app/@shared/shared.module";
import { TestingComponent } from "./testing.component";

import { TrainingSetupPage } from "./training/page.training-setup";
import { ToggleButtonComponent } from "./training/toggle-button.component";


const DEFAULT = {
  path: 'training-setup',
  component: TrainingSetupPage
}

const routes: Routes = [
  { path: '', component: TestingComponent, children: [
    { path: '', redirectTo: DEFAULT.path, pathMatch: 'full' },
    { path: DEFAULT.path, component: DEFAULT.component },
    { path: '**', redirectTo: DEFAULT.path, pathMatch: 'full' },
  ]}
];


@NgModule({
  declarations: [
    TestingComponent,
    TrainingSetupPage,
    ToggleButtonComponent
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
