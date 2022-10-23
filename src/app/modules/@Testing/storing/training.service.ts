
import { Injectable } from '@angular/core';
import { openDB } from 'idb';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Multiple } from './Multiple';
import { StoreService } from './store.service';

const DEFAULTS = {
  timeInterval: 33,
};

@Injectable({ providedIn: 'root' })
export class TrainingService {

  private _timeInterval$ = new BehaviorSubject<number>(DEFAULTS.timeInterval);
  timeInterval$ = this._timeInterval$.asObservable();
  // requiredSuccesses: number;
  // bases: number[];
  // multiples: Multiple[] | null;

  constructor(private store: StoreService) {
    this.store.getTimeInterval().then(res => { if (!!res) this._timeInterval$.next(res) })
  }

  async setTimeInterval(val: number): Promise<{ key: string; value: number }> {
    this._timeInterval$.next(val);
    return this.store.setTimeInterval(val);
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
