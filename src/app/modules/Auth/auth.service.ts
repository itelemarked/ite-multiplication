import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, catchError, from, map, Observable, of, Subject, take } from 'rxjs';
import { AUTH_EMAIL_SUFFIX, IAuthError, IUser } from './auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user$ = new Subject<IUser | null>();
  user$ = this._user$.asObservable();

  private _ERRORS: IAuthError[] = [
    { code: 'auth/network-request-failed', message: 'You are not connected to the internet...'},
    { code: 'auth/user-not-found', message: 'Wrong username...'},
    { code: 'auth/wrong-password', message: 'Wrong password...'},
    { code: 'auth/email-already-in-use', message: 'This username already used by another user, choose another one...'}
  ]

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.onAuthStateChanged((usr) => {
      if (usr === null) {
        this._user$.next(null);
      } else {
        const username = usr.email!.replace(AUTH_EMAIL_SUFFIX, '');
        const id = usr.uid;
        this._user$.next({id, username});
      }
    })
  }

  login$(username: string, password: string): Observable<IUser> {
    const email = username + AUTH_EMAIL_SUFFIX;
    const loginPromise = this.afAuth.signInWithEmailAndPassword(email, password);
    const loginObservable = from<Promise<any>>(loginPromise).pipe(
      map(result => {
        const username = result.user.email!.replace(AUTH_EMAIL_SUFFIX, '');
        const id = result.user.uid;
        return { username, id };
      }),
      catchError((err: IAuthError) => { 
        const foundError = this._ERRORS.find(e => e.code === err.code);
        if (foundError === undefined) {
          throw {code: 'ite/unknown-error', message: `Unknown error (${err.code})`};
        } else {
          throw foundError;
        }
      })
    )
    return loginObservable;
  }

  signup(username: string, password: string) {
    const email = username + AUTH_EMAIL_SUFFIX;
    const loginPromise = this.afAuth.createUserWithEmailAndPassword(email, password);
    const loginObservable = from<Promise<any>>(loginPromise).pipe(
      map(result => {
        const username = result.user.email!.replace(AUTH_EMAIL_SUFFIX, '');
        const id = result.user.uid;
        return { username, id };
      }),
      catchError((err: IAuthError) => { 
        const foundError = this._ERRORS.find(e => e.code === err.code);
        if (foundError === undefined) {
          throw {code: 'ite/unknown-error', message: `Unknown error (${err.code})`};
        } else {
          throw foundError;
        }
      })
    )
    return loginObservable;
  }

  logout() {
    this.afAuth.signOut()
  }

  
}
