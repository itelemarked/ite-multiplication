import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularfirestoreComponent } from './angularfirestore/angularfirestore.component';


const DEFAULT_ROUTE = 'angularfirestore';

const routes: Routes = [
  { path: '', redirectTo: DEFAULT_ROUTE, pathMatch: 'full' },
  { path: 'angularfirestore', component: AngularfirestoreComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestingRoutingModule { }
