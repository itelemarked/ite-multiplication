import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

import { AuthPage } from './pages/auth/auth.page';
import { HomePage } from './pages/home/home.page';
import { TestPage } from './pages/test/test.page';
import { TrainingPage } from './pages/training/training.page';
import { StatisticsPage } from './pages/statistics/statistics.page';
import { NumericKeyboardComponent } from './components/numeric-keyboard/numeric-keyboard.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthPage,
    HomePage,
    TestPage,
    TrainingPage,
    StatisticsPage,
    NumericKeyboardComponent,
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
