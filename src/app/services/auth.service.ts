import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Observable, map, of } from "rxjs";
import { User, toUsername, toEmail } from "../models/User";






@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {}

  getUser$$(): Observable<User | null> {
    return this.afAuth.authState.pipe(
      map(usr => {
        if(usr) {
          const uid = usr.uid;
          const username = toUsername(usr.email!);
          return new User(uid, username);
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
