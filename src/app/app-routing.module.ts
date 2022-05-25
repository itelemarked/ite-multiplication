import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthPage } from './pages/auth/auth.page';
import { HomePage } from './pages/home/home.page';
import { StatisticsPage } from './pages/statistics/statistics.page';
import { TestPage } from './pages/test/test.page';
import { TrainingPage } from './pages/training/training.page';

const DEFAULT_ROUTE = 'TESTING'

const routes: Routes = [
  { path: '', redirectTo: DEFAULT_ROUTE, pathMatch: 'full'},
  { path: 'auth', component: AuthPage },
  { path: 'home', component: HomePage },
  { path: 'test', component: TestPage },
  { path: 'training', component: TrainingPage },
  { path: 'statistics', component: StatisticsPage },

  { path: 'TESTING', loadChildren: () => import('./@TESTING/testing.module').then(m => m.TestingModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
