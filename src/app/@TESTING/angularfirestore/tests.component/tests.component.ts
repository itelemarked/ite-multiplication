import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

// import { addDoc, collectionData, CollectionReference, deleteDoc, doc, docData, Firestore, getDoc, increment, setDoc } from '@angular/fire/firestore';

import { combineLatest, map, Observable, switchMap, take, tap } from 'rxjs';
import { TestingModule } from '../../testing.module';
import { getMultiplesFromBases, IKeyStringIMultiple, IMultiple, Multiple } from '../Multiple';
import { getMultiplesFrom, ITest, Test } from '../Test';


@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {

  tests: Test[] = [];

  testsColRef: AngularFirestoreCollection<ITest>;
  
  constructor(private afs: AngularFirestore) {

    this.testsColRef = afs.collection<ITest>('tests', undefined);

    this.getTests$$().subscribe(res => {
      console.log('getTests$$() fired')
      this.tests = res;
    })


    // setTimeout(() => {
    //   console.log('timeout')
    //   // afs.doc('tests/@store').set({lastIdNb: 9}, {merge: true})
    //   afs.doc('tests/test8').set({completed: true}, {merge: true})
    // }, 3000);

    // this.addTest({
    //   completed: false, 
    //   successNb: 2, 
    //   multiples: getMultiplesFrom(0,12)
    // })
  }

  ngOnInit(): void {}

  getTests$$(): Observable<Test[]> {
    return this.testsColRef.valueChanges({idField: 'id'})     
      .pipe(
        map(res => res.map(r => {
          const id = r.id;
          const {completed, successNb, multiples} = r;
          return new Test(id, {completed, successNb, multiples})
        }))
      )
  }

  getTestById$(id: string): Observable<Test | undefined> {
    const testDocRef = this.afs.doc<ITest>(`tests/${id}`)
    return testDocRef.valueChanges({idField: 'id'}).pipe(
      map(res => {
        if (res !== undefined) {
          const id = res.id;
          const {completed, successNb, multiples} = res;
          return new Test(id, {completed, successNb, multiples})
        } else {
          return undefined;
        }
      })
    )

  }

  getTestsNextIdNb$(): Observable<number | undefined> {
    const storeDocRef = this.afs.doc<{lastIdNb: number}>('tests/@store')
    return storeDocRef.valueChanges().pipe(
      take(1),
      map(res => res?.lastIdNb)
    )
  }

  deleteTest(test: Test) {
    const testDoc = this.afs.doc<ITest>(`tests/${test.id}`)
    testDoc.delete()

    // TODO
    // const tests$ = this.afs.collection<ITest>('tests').valueChanges({idField: 'id'}).pipe(take(1))
    // tests$.subscribe(res => {
    //   if (res.length === 1) {
    //     res.forEach(r => this.afs.doc(`tests/${r.id}`).delete);
    //   }
    // })
  }


  addTest(successNb: number) {
    const lastIdNb$ = this.afs.doc<{lastIdNb: number}>('stores/testsStore').valueChanges().pipe(
      take(1),
      map(res => res!.lastIdNb)
    )

    const completed = false;
    const multiples = getMultiplesFromBases([0,1,2,3,4,5,6,7,8,9,10,11,12])
    
    lastIdNb$.subscribe(idNb => {
      const id = this.toId(idNb + 1);
      this.afs.doc<ITest>(`tests/${id}`).set({completed, successNb, multiples})
      this.afs.doc<{lastIdNb: number}>('stores/testsStore').update({lastIdNb: idNb + 1})
    })
  }





  // addTest(test: ITest) {
  //   const tests$ = this.getTests$$().pipe(take(1))
  //   const lastIdNb$ = this.getTestsNextIdNb$()

  //   const combined$ = combineLatest([tests$, lastIdNb$]).pipe(
  //     map(res => {
  //       const [tests, lastIdNb] = res;
  //       return {tests, lastIdNb}
  //     })
  //   )

  //   combined$.subscribe(res => {
  //     const tests = res.tests;
  //     const lastIdNb = res.lastIdNb || 0;
      
  //     if (tests.length === 0) {

  //     } else if (tests.length === 1) {
  //       throw new Error('There is something wrong in the database: tests cannot have only 1 item!')
  //     } else {
  //       this.afs.doc<ITest>(`tests/test${lastIdNb + 1}`).set({
  //         completed: test.completed,
  //         successNb: test.successNb,
  //         multiples: test.multiples
  //       })

  //       const nextId = lastIdNb + 1;
  //       this.afs.doc<{lastIdNb: number}>('tests/@store').set({lastIdNb: nextId})      
  //     }
  //   })
  // }


  /**
   * Returns the number of the id which must be formatted with 'testXX' 
   * where XX is a number between 1 and inifinity!
   *  */ 
  private toIdNb(testId: string): number | null {
    const ID_FORMAT = /^test([1-9][0-9]?)$/;
    const match: RegExpMatchArray | null = testId.match(ID_FORMAT)
    return match ? +match[1] : null;
  }

  /**
   * Returns a formatted id in testXX,
   * where XX is a integer equal or greater than 1. 
   */
  private toId(nb: number): string {
    if (nb < 1) throw new Error("Invalid argument: must be >= 1!")
    if (!Number.isInteger(nb)) throw new Error("Invalid argument: must be an integer!")
    return 'test' + nb.toString()
  }

}






// @Component({
//   selector: 'app-tests',
//   templateUrl: './tests.component.html',
//   styleUrls: ['./tests.component.scss']
// })
// export class TestsComponent implements OnInit {

//   tests: Test[] = [];

//   testsRef: CollectionReference;
  
//   constructor(private firestore: Firestore) {
//     this.testsRef = collection(firestore, 'tests');

//     this.getTests().subscribe(res => {
//       this.tests = res;
//     })
//   }

//   ngOnInit(): void {}

//   getTests(): Observable<Test[]> {
//     const testsRef = collection(this.firestore, 'tests');
//     return (collectionData(testsRef, {idField: 'id'}) as Observable<ITest[]>).pipe(
//       map(res => res.map(r => new Test(r)))
//     )
//   }

//   deleteTest(test: Test) {
//     const docRef = doc(this.firestore, `tests/${test.id}`);
//     deleteDoc(docRef);
//   }

//   addTest() {
//     const storedRef = doc(this.firestore, 'tests/@store');
//     (docData(storedRef) as Observable<{lastIdNb: number}>).pipe(take(1)).subscribe(res => {
//       const lastIdNb = res.lastIdNb;
//       const newTestRef = doc(this.firestore, `tests/test${lastIdNb + 1}`);
//       const newTest = new Test({id: 'test'+(lastIdNb + 1).toString, successNb: 2});
//       setDoc(newTestRef, {completed: false, multiples: []})
//       setDoc(storedRef, {lastIdNb: lastIdNb + 1})
//     });
//   }

// }
