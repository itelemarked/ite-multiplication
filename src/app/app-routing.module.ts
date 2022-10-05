import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestingComponent } from './modules/@Testing/testing.component';
import { AuthPage } from './pages/auth.page';
import { HomePage } from './pages/home.page';

const defaultRoute = 'auth'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: defaultRoute },
  { path: '@testing', component: TestingComponent },
  { path: 'home', component: HomePage },
  { path: 'auth', component: AuthPage },
  { path: '**', pathMatch: 'full', redirectTo: defaultRoute },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
