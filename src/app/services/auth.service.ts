import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Observable, map, of } from "rxjs";
import { IUser, toEmail, toUsername } from "../models/User";






@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {}

  getUser$$(): Observable<IUser | null> {
    return this.afAuth.authState.pipe(
      map(res => {
        if(res) {
          const uid = res.uid;
          const username = toUsername(res.email!);
          return {uid, username};
        } else {
          return null;
        }
      })
    )
  }

  login(username: string, password: string) {
    const email = toEmail(username);
    this.afAuth.signInWithEmailAndPassword(email, password);
  }

}
