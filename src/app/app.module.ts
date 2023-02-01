import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularfireModule } from './core/_angular-fire.module';

import { AppComponent } from './app.component';




const defaultRoute = 'testing'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: defaultRoute },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'testing', loadChildren: () => import('./testing/testing.module').then(m => m.TestingModule) },
  { path: '**', pathMatch: 'full', redirectTo: defaultRoute },
];



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    IonicModule.forRoot({mode: 'ios'}),
    AngularfireModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

