
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { map, mergeMap, Observable, of, switchMap, take } from "rxjs";
import { getMultipleMapFromBases, IMultiple, IMultipleMap } from "../models/Multiple";
import { ITest, Test, toNb, toTestId } from "../models/Test";
import { User } from "../models/User";
import { AuthService } from "./auth.service";



@Injectable({providedIn: 'root'})
export class TestsService {

  constructor(private afStore: AngularFirestore, private auth: AuthService) {}

  getTests$$(): Observable<Test[]> {
    const user$$ = this.auth.getUser$$();
    const tests$ = (user: User | null): Observable<Test[]> => {
      if (user) {
        return this.afStore.collection<ITest>(`users/${user.uid}/tests`, ref => ref.orderBy('creationDate', 'desc')).valueChanges({idField: 'id'}).pipe(
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
      switchMap(usr => tests$(usr))
    );
  }  


  getTestById$$(id: string): Observable<Test | null> {
    const user$ = this.auth.getUser$$();
    const test$ = (user: User | null): Observable<Test | null> => {
      if(user) {
        return this.afStore.doc<ITest>(`users/${user.uid}/tests/${id}`).valueChanges().pipe(
          map(test => {
            if(test) {
              return new Test(id, test)
            } else {
              return null;
            }
          })
        )
      } else {
        return of(null)
      }
    }

    return user$.pipe(
      switchMap(usr => test$(usr))
    )
  }


  getNextTestId$(): Observable<string> {
    const user$ = this.auth.getUser$$().pipe(take(1));
    const lastTest$ = (user: User | null): Observable<(ITest & {id: string}) | null> => {
      if(user) {
        return this.afStore.collection<ITest>(`users/${user.uid}/tests`, ref => ref.orderBy('creationDate', 'desc').limit(1)).valueChanges({idField: 'id'}).pipe(
          take(1),
          map(res => {
            if(res.length === 0) {
              return null;
            } else {
              return res[0];
            }
          })
        )
      } else {
        return of(null);
      }
    }

    const nextId$ = user$.pipe(
      switchMap(usr => lastTest$(usr)),
      map(lastTest => {
        if(lastTest) {
          const lastIdNb = toNb(lastTest.id);
          const nextIdNb = lastIdNb + 1;
          return toTestId(nextIdNb);
        } else {
          return toTestId(1);
        }
      })
    )

    return nextId$;
  }


  createTest(iTest: Partial<ITest>) {

    const user$ = this.auth.getUser$$();
    const nextId$ = (user: User | null): Observable<{user: User | null, nextId: string} | null> => {
      if(user) {
        const coll = this.afStore.collection<ITest>(`users/${user.uid}/tests`, ref => ref.orderBy('creationDate', 'desc').limit(1));
        return coll.valueChanges({idField: 'id'}).pipe(
          map(res => {
            if(res.length === 0) {
              const nextId = toTestId(1);
              return {user, nextId};
            } else {
              const lastIdNb = toNb(res[0].id)
              const nextId = toTestId(lastIdNb + 1);
              return {user, nextId};
            }
          })
        )
      } else {
        return of(null)
      }
    }
    const combined$ = user$.pipe(
      switchMap(nextId$)
    )
    
    const createNewTest = (user: User | null, testId: string, options?: Partial<ITest>) => {
      const defaults: ITest = {
        completed: false,
        successNb: 2,
        multiples: getMultipleMapFromBases([0,1,2,3,4,5,6,7,8,9,10,11,12]),
        timeInterval: 3,
        creationDate: Date.now()
      }
      
      if(user) {
        this.afStore.doc<ITest>(`users/${user.uid}/tests/${testId}`).set({...defaults, ...options})
      }
    }

    combined$.pipe(take(1)).subscribe(res => {
      if(res) {
        const {user, nextId} = res;
        createNewTest(user, nextId, iTest);
      }
    })

  }


  removeTest(test: Test) {
    const user$ = this.auth.getUser$$();
    const testDoc = (user: User | null) => {
      if (user) {
        return this.afStore.doc<ITest>(`users/${user.uid}/tests/${test.id}`);
      } else {
        return null;
      }
    }

    user$.pipe(take(1)).subscribe(usr => testDoc(usr)?.delete())
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



  // editTestMultiple(testId: string, multipleId: string, multiple: IMultiple) {
  //   const user$ = this.auth.getUser$$().pipe(take(1));
  //   const testDoc = (user: User | null) => {
  //     if(user) {
  //       return this.afStore.doc<ITest>(`users/${user.uid}/tests/${testId}`)
  //     } else {
  //       return null;
  //     }
  //   }

  //   user$.subscribe(usr => testDoc(usr)?.update({
  //     [`multiples.${multipleId}`]: multiple
  //   }))
  // }


  // editTest(test: Test) {
  //   const foundITest: ITest | undefined = MOCK_TESTS.find(t => t.id === test.id);
  //   if(foundITest !== undefined) {
  //     // foundITest.id won't be changed!
  //     foundITest.completed = test.completed;
  //     foundITest.multiples = test.multiples;
  //     foundITest.successNb = test.successNb;
  //   }
  // }

  // editMultiple(testId: string, multiple: Multiple) {
  //   const foundITest: ITest | undefined = MOCK_TESTS.find(t => t.id === testId);
  //   if(foundITest !== undefined) {
  //     const foundIMultiple = foundITest.multiples.find(m => m.id === multiple.id);
  //     foundIMultiple!.value = multiple.value;
  //     foundIMultiple!.successes = multiple.successes;
  //     foundIMultiple!.fails = multiple.fails;
  //   }
  // }




  // editTest(testId: string, options: Partial<ITest>) {
  //   const user$ = this.auth.getUser$$().pipe(take(1));
  //   const testDoc = (user: IUser | null) => {
  //     if(user) {
  //       return this.afStore.doc<ITest>(`users/${user.uid}/tests/${testId}`)
  //     } else {
  //       return null;
  //     }
  //   }

  //   user$.subscribe(usr => testDoc(usr)?.update(options))
  // }


    // addTest(successNb: number, timeInterval: number) {
  //   const user$$ = this.auth.getUser$$().pipe(take(1));
  //   const nextIdForUser$ = (user: User | null): Observable<{user: User, nextId: string} | null> => {
  //     if (user) {
  //       const coll$ = this.afStore.collection<ITest>(`users/${user.uid}/tests`, ref => ref.orderBy('creationDate', 'desc').limit(1)).valueChanges({idField: 'id'})
  //       return coll$.pipe(
  //         take(1),
  //         map(res => {
  //           if (res.length === 0) {
  //             return toTestId(1);
  //           } else {
  //             const lastIdNb = toNb(res[0].id);
  //             const nextIdNb = lastIdNb + 1;
  //             return toTestId(nextIdNb);
  //           }
  //         }),
  //         map(nextId => ({nextId, user}))
  //       )
  //     } else {
  //       return of(null);
  //     }
  //   }

  //   user$$
  //     .pipe(
  //       mergeMap(usr => nextIdForUser$(usr))
  //     )
  //     .subscribe(res => {
  //       if (res) {
  //         const newDoc = this.afStore.doc<ITest>(`users/${res.user.uid}/tests/${res.nextId}`);

  //         const completed = false;
  //         const multiples = getMultipleMapFromBases([0,1,2,3,4,5,6,7,8,9,10,11,12]);
  //         const creationDate = Date.now();

  //         newDoc.set({successNb, timeInterval, completed, multiples, creationDate});
  //       }
  //     })
  // }