
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { map, mergeMap, Observable, of, switchMap, take } from "rxjs";
import { User } from "../models/User";
import { AuthService } from "../services/auth.service";
import { ITest, multiplesFromBases, Test, toNb, toTestId } from "./Test";



@Injectable({providedIn: 'root'})
export class TestsService {

  constructor(private afStore: AngularFirestore, private auth: AuthService) {}

  getTests$$(options?: Partial<(ITest & {id: string})>): Observable<Test[]> {
    const user$$ = this.auth.getUser$$();
    const tests$$ = (user: User | null): Observable<Test[]> => {
      if (user) {
        return this.afStore.collection<ITest>(`users/${user.uid}/tests`, ref => ref.orderBy('creationDate', 'desc')).valueChanges({idField: 'id'}).pipe(
          map(res => res.filter(r => {
            let match = true;
            if (options !== undefined) {
              for(let key in options) {
                if (options[key as keyof Partial<(ITest & {id: string})>] !== r[key as keyof (ITest & {id: string})]) {
                  match = false;
                }
              }
            }
            return match;
          })),
          map(res => res.map(r => {
            const {id, ...iTest} = r;
            return new Test(id, iTest);
          }))
        )
      } else {
        return of([]);
      }
    }

    return user$$.pipe(
      switchMap(usr => tests$$(usr))
    );
  }


  // getNextTestId$(): Observable<string> {
  //   const user$ = this.auth.getUser$$().pipe(take(1));
  //   const lastTest$ = (user: User | null): Observable<(ITest & {id: string}) | null> => {
  //     if(user) {
  //       return this.afStore.collection<ITest>(`users/${user.uid}/tests`, ref => ref.orderBy('creationDate', 'desc').limit(1)).valueChanges({idField: 'id'}).pipe(
  //         take(1),
  //         map(res => {
  //           if(res.length === 0) {
  //             return null;
  //           } else {
  //             return res[0];
  //           }
  //         })
  //       )
  //     } else {
  //       return of(null);
  //     }
  //   }

  //   const nextId$ = user$.pipe(
  //     switchMap(usr => lastTest$(usr)),
  //     map(lastTest => {
  //       if(lastTest) {
  //         const lastIdNb = toNb(lastTest.id);
  //         const nextIdNb = lastIdNb + 1;
  //         return toTestId(nextIdNb);
  //       } else {
  //         return toTestId(1);
  //       }
  //     })
  //   )

  //   return nextId$;
  // }


  createTest(successNb: number, timeInterval: number): Observable<Test | null> {
    const user$$: Observable<User | null> = this.auth.getUser$$();
    const nextId$$ = (user: User): Observable<string> => {
      const coll = this.afStore.collection<ITest>(`users/${user.uid}/tests`, ref => ref.orderBy('creationDate', 'desc').limit(1));
      return coll.valueChanges({idField: 'id'}).pipe(
        take(1),
        map(res => {
          if(res.length === 0) {
            const nextId = toTestId(1);
            return nextId;
          } else {
            const lastIdNb = toNb(res[0].id)
            const nextId = toTestId(lastIdNb + 1);
            return nextId;
          }
        })
      )
    }
    const createNewTest = (user: User, nextId: string, successNb: number, timeInterval: number): Test => {
      const completed = false;
      const multiples = multiplesFromBases([0,1,2,3,4,5,6,7,8,9,10,11,12]);
      const creationDate = Date.now();

      const iTest = {completed, successNb, multiples, timeInterval, creationDate}

      this.afStore.doc<ITest>(`users/${user.uid}/tests/${nextId}`).set(iTest);
      return new Test(nextId, iTest);
    }


    const test$: Observable<Test | null> = user$$.pipe(
      switchMap(usr => {
        if(usr) {
          return nextId$$(usr).pipe(
            map(nextId => {
              return createNewTest(usr, nextId, successNb, timeInterval);
            })
          );
        } else {
          return of(null)
        }
      })
    )

    return test$;

  }


  removeTest(id: string): Observable<Test | null> {
    const user$$ = this.auth.getUser$$();
    const testDoc$ = (user: User | null) => {
      if (user) {
        return of(this.afStore.doc<ITest>(`users/${user.uid}/tests/${id}`));
      } else {
        return of(null);
      }
    }

    return user$$.pipe(
      take(1),
      switchMap(usr => testDoc$(usr)),
      switchMap(testDoc => {
        if(testDoc) {
          return testDoc.valueChanges().pipe(
            take(1),
            map(iTest => {
              if(iTest) {
                testDoc.delete();
                return new Test(id, iTest);
              } else {
                return null;
              }
            })
          )
        } else {
          return of(null);
        }
      })
    )
  }


  updateTest(test: Test) {
    const user$ = this.auth.getUser$$().pipe(take(1));
    const testDoc = (user: User | null) => {
      if(user) {
        return this.afStore.doc<ITest>(`users/${user.uid}/tests/${test.id}`)
      } else {
        return null;
      }
    }

    user$.subscribe(usr => testDoc(usr)?.update(test.toJson()))
  }

}
