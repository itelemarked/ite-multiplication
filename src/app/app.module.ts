import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { getAuth, provideAuth } from '@angular/fire/auth';
// import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { environment } from '../environments/environment';

import { AuthPage } from './pages/auth/auth.page';
import { HomePage } from './pages/home/home.page';
import { TestPage } from './pages/test/test.page';
import { TestProgressPage } from './pages/test-progress/test-progress.page';
import { TrainingPage } from './pages/training/training.page';
import { StatisticsPage } from './pages/statistics/statistics.page';

import { NumericKeyboardComponent } from './components/numeric-keyboard/numeric-keyboard.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthPage,
    HomePage,
    TestPage,
    TestProgressPage,
    TrainingPage,
    StatisticsPage,
    NumericKeyboardComponent,
    ProgressBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence()

    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
