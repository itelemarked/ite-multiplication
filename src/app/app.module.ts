import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { AuthPage } from './pages/auth.page';
import { HomePage } from './pages/home.page';
import { TrainingPage } from './pages/training.page';

import { TestingComponent } from './modules/@Testing/testing.component';
import { AuthSetupComponent } from './modules/Auth/auth-setup.component';
import { ToggleButtonComponent } from './components/toggle-button.component';
import { SegmentButtonComponent } from './components/segment-button.component';
import { TrainingSetupComponent } from './modules/Training/training-setup.component';


@NgModule({
  declarations: [
    AppComponent,
    TestingComponent,
    AuthPage,
    AuthSetupComponent,
    ToggleButtonComponent,
    SegmentButtonComponent,
    HomePage,
    TrainingPage,
    TrainingSetupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
