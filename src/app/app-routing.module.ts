import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestingPage } from './@TESTING/testing.page/testing.page';

import { AuthPage } from './pages/auth/auth.page';
import { HomePage } from './pages/home/home.page';
import { StatisticsPage } from './pages/statistics/statistics.page';
import { TestProgressPage } from './pages/test-progress/test-progress.page';
import { TrainingPage } from './pages/training/training.page';

import { TestPage } from './pages/test/test.page';
import { Testing2Page } from './@TESTING/testing2.page/testing2.page';

const DEFAULT_ROUTE = 'TESTING'

const routes: Routes = [
  { path: '', redirectTo: DEFAULT_ROUTE, pathMatch: 'full'},
  { path: 'auth', component: AuthPage },
  { path: 'home', component: HomePage },
  { path: 'test', children: [
    { path: '', component: TestPage },
    { path: 'progress', component: TestProgressPage }
  ]},
  { path: 'training', component: TrainingPage },
  { path: 'statistics', component: StatisticsPage },


  { path: 'TESTING', children: [
    { path: '', component: TestingPage },
    { path: ':testId', component: Testing2Page },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
