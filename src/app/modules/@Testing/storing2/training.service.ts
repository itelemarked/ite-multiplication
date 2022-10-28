
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StoreService } from './local-store.service';

const DEFAULTS = {
  timeInterval: 3,
  requiredSuccesses: 2,
  bases: [1,2,3,4,5,6,7,8,9,10,11,12],
  factors: [1,2,3,4,5,6,7,8,9,10,11,12],
  multiples: []
};

@Injectable({ providedIn: 'root' })
export class TrainingService {

  private _timeInterval$ = new BehaviorSubject<number>(DEFAULTS.timeInterval);
  private _requiredSuccesses$ = new BehaviorSubject<number>(DEFAULTS.requiredSuccesses);
  private _bases$ = new BehaviorSubject<number[]>(DEFAULTS.bases);
  private _factors$ = new BehaviorSubject<number[]>(DEFAULTS.factors);
  private _multiples$ = new BehaviorSubject<Multiple[]>(DEFAULTS.multiples);
  
  timeInterval$ = this._timeInterval$.asObservable();
  requiredSuccesses$ = this._requiredSuccesses$.asObservable();
  bases$ = this._bases$.asObservable();
  factors$ = this._factors$.asObservable();
  multiples$ = this._multiples$.asObservable();


  constructor(private store: StoreService) {
    this.store.getTimeInterval().then(res => { if (!!res) this._timeInterval$.next(res) })
    this.store.getRequiredSuccesses().then(res => { if (!!res) this._requiredSuccesses$.next(res) })
  }

  async setTimeInterval(val: number) {
    this._timeInterval$.next(val);
    this.store.setTimeInterval(val);
  }

  async setRequiredSuccesses(val: number) {
    this._requiredSuccesses$.next(val);
    this.store.setRequiredSuccesses(val);
  }

  async setMultiples(bases: number[], factors: number[]) {
    const multiples: Multiple[] = this._getMultiplesByBasesAndFactors(bases, factors);

    this._multiples$.next(multiples);
    this._bases$.next(bases);
    this._factors$.next(factors);
  }


  private _getMultiplesByBasesAndFactors(bases: number[], factors: number[]): Multiple[] {

    const sorted = (arr: number[]): number[] => {
      const uniques: number[] = [];
      arr.forEach(a => {
        if(!uniques.includes(a)) uniques.push(a);
      })
      return uniques.sort((a,b) => a-b);
    }

    const sortedBases = sorted(bases);
    const sortedFactors = sorted(factors);

    const multiples: Multiple[] = [];

    for (let i = 0; i < sortedBases.length; i++) {
      let b = sortedBases[i];
      for (let j = 0; j < sortedFactors.length; j++) {
        let f = sortedFactors[j];
        if (!(sortedBases.includes(f) && f < b)) {
          multiples.push(new Multiple(f, b));
        }
      }
    }
    return multiples;
  }
}







// import { Injectable } from '@angular/core';
// import { openDB } from 'idb';
// import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
// import { Multiple } from './Multiple';

// const DEFAULTS = {
//   timeInterval: 33,
// };

// @Injectable({ providedIn: 'root' })
// export class TrainingService {

//   private _timeInterval$ = new BehaviorSubject<number>(DEFAULTS.timeInterval);
//   timeInterval$ = this._timeInterval$.asObservable();
//   // requiredSuccesses: number;
//   // bases: number[];
//   // multiples: Multiple[] | null;

//   db = openDB('iteMultipleDB', 1, {
//     upgrade(db) {
//       db.createObjectStore('localTraining');
//     },
//   });

//   constructor() {
//     console.log('StoreService constructor');

//     this.db.then((db) => {
//       db.get('localTraining', 'timeInterval').then((res) => {
//         if (!!res) this._timeInterval$.next(res);
//       });
//     });
//   }

//   async setTimeInterval(val: number): Promise<{ key: string; value: number }> {
//     this._timeInterval$.next(val);
//     const db = await this.db;
//     return new Promise(
//       (
//         resolve: (value: { key: string; value: number }) => void,
//         reject: (err: any) => void
//       ) => {
//         db.put('localTraining', val, 'timeInterval')
//           .then((_res) => resolve({ key: 'timeInterval', value: val }))
//           .catch((err) => reject(err));
//       }
//     );
//   }
// }
