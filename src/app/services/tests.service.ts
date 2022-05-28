
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { map, mergeMap, Observable, of, switchMap, take } from "rxjs";
import { getMultiplesFromBases } from "../models/Multiple";
import { ITest, Test, toNb, toTestId } from "../models/Test";
import { IUser } from "../models/User";
import { AuthService } from "./auth.service";



@Injectable({providedIn: 'root'})
export class TestsService {

  constructor(private afStore: AngularFirestore, private auth: AuthService) {}

  getTests$$(): Observable<Test[]> {
    const user$$ = this.auth.getUser$$();
    const tests$ = (user: IUser) => {
      return this.afStore.collection<ITest>(`users/${user.uid}/tests`, ref => ref.orderBy('creationDate', 'desc')).valueChanges({idField: 'id'})
    }

    return user$$.pipe(
      switchMap(usr => {
        if(usr) {
          return tests$(usr).pipe(
            map(res => res.map(r => {
              const {id, ...iTest} = r;
              return new Test(id, iTest);
            }))
          )
        } else {
          return of([]);
        }
      })
    )
  }


  getTestById$(testId: string): Observable<Test | null> {
    const user$ = this.auth.getUser$$();
    const test$ = (user: IUser) => {
      return this.afStore.doc<ITest>(`users/${user.uid}/tests/${testId}`).valueChanges().pipe(
        map(res => {
          if(res) {
            return new Test(testId, res)
          } else {
            return null;
          }
        })
      )
    }

    const obs$ = user$.pipe(
      switchMap(usr => {
        if(usr) {
          return test$(usr)
        } else {
          return of(null)
        }
      })
    )

    return obs$;
  }


  getNextId$$(): Observable<string | null> {
    const user$$ = this.auth.getUser$$();
    const tests$ = (user: IUser) => {
      return this.afStore.collection<ITest>(`users/${user.uid}/tests`, ref => ref.orderBy('creationDate', 'desc')
        .limit(1))
        .valueChanges({idField: 'id'})
    }

    return user$$.pipe(
      switchMap(usr => {
        if(usr) {
          return tests$(usr).pipe(
            map(res => {
              if(res.length === 0) {
                return 'test1';
              } else {
                const lastNb = toNb(res[0].id);
                const nextNb = lastNb + 1;
                return toTestId(nextNb);
              }
            })
          )
        } else {
          return of(null);
        }
      })
    )
  }

  addTest(successNb: number, timeInterval: number) {
    const user$$ = this.auth.getUser$$();
    const nextId$ = this.getNextId$$().pipe(take(1));
    const completed = false;
    const multiples = getMultiplesFromBases([0,1,2,3,4,5,6,7,8,9,10,11,12]);
    const creationDate = Date.now();


    user$$
      .pipe(
        take(1),
        mergeMap(usr => {
          return nextId$.pipe(
            map(nextId => {
              return {usr, nextId};
            })
          )
        })
      )
      .subscribe(res => {
        if(res.usr && res.nextId) {
          this.afStore.doc<ITest>(`users/${res.usr.uid}/tests/${res.nextId}`).set({successNb, timeInterval, completed, multiples, creationDate});
        }
      })
  }

  removeTest(id: string) {
    const user$$ = this.auth.getUser$$();
    const testDoc = (user: IUser) => {
      return this.afStore.doc<ITest>(`users/${user.uid}/tests/${id}`)
    }

    user$$
      .pipe(take(1))
      .subscribe(usr => {
        if(usr) {
          testDoc(usr).delete()
        }
      })
  }

  // getTestById(testId: string): ITest | undefined {
  //   return MOCK_TESTS.find(t => t.id === testId);
  // }

  // getFirstPendingTest(): ITest | undefined {
  //   return MOCK_TESTS.find(t => !t.completed);
  // }

  // addTest(test: Test) {
  //   MOCK_TESTS.push(test.toJson())
  // }

  // removeTest(testId: string) {
  //   const foundIndex = MOCK_TESTS.findIndex(t => t.id === testId);
  //   if (foundIndex > -1) {
  //     MOCK_TESTS.splice(foundIndex, 1);
  //   }
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

}
