import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestsComponent } from './angularfirestore/tests.component/tests.component';


const DEFAULT_ROUTE = 'tests';

const routes: Routes = [
  { path: '', redirectTo: DEFAULT_ROUTE, pathMatch: 'full' },
  { path: 'tests', component: TestsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestingRoutingModule { }
