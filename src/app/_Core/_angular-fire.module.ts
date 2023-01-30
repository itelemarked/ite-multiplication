import { NgModule } from "@angular/core";

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCXCVzUms4dvhzDwWZuHRIDQt2XFTX9v0U",
  authDomain: "ite-multiplication-d85b5.firebaseapp.com",
  databaseURL: "https://ite-multiplication-d85b5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ite-multiplication-d85b5",
  storageBucket: "ite-multiplication-d85b5.appspot.com",
  messagingSenderId: "220010654620",
  appId: "1:220010654620:web:73bb0c0e1c52748c62b659"
}



@NgModule({
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ]
})
export class AngularfireModule {}
