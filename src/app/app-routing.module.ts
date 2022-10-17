import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPage } from './pages/auth.page';
import { HomePage } from './pages/home.page';
import { TrainingPage } from './pages/training.page';

const defaultRoute = 'training'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: defaultRoute },
  { path: '@testing', loadChildren: () => import('./modules/@Testing/_testing.module').then(m => m.TestingModule) },
  { path: 'home', component: HomePage },
  { path: 'auth', component: AuthPage },
  { path: 'training', component: TrainingPage },
  { path: '**', pathMatch: 'full', redirectTo: defaultRoute },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
