import { Injectable } from "@angular/core";
import { DBSchema, openDB } from "idb";
import { from, Observable, of } from "rxjs";
import { ILocalStoreService, IMultiple, IMultipleData } from "./Interfaces";


const DB_NAME = 'ite-multiplication-local-db';

interface MyDB extends DBSchema {
  'trainings-trainingId:local': {
    key: 'timeInterval' | 'requiredSuccesses' | 'bases' | 'factors';
    value: number | number[];
  },
  'multiples-trainingId:local': {
    key: string;
    value: IMultipleData
  }
}


@Injectable({ providedIn: 'root' })
export class LocalStoreService implements ILocalStoreService {

  db = openDB<MyDB>(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore('trainings-trainingId:local');
      db.createObjectStore('multiples-trainingId:local');
    },
  });

  getTimeInterval$(): Observable<number | null> {
    return this._genericGetter<number | null>('timeInterval');
  }

  getRequiredSuccesses$(): Observable<number | null> {
    return this._genericGetter<number | null>('requiredSuccesses');
  }

  getBases$(): Observable<number[] | null> {
    return this._genericGetter<number[] | null>('bases');
  }

  getFactors$(): Observable<number[] | null> {
    return this._genericGetter<number[] | null>('factors');
  }

  getMultiples$(): Observable<IMultiple[] | null> {
    const getPromise = async (): Promise<IMultiple[] | null> => {
      const db = await this.db;
      const keys = await db.getAllKeys('multiples-trainingId:local');
      const multipleDatas = await db.getAll('multiples-trainingId:local');
      if (keys === undefined || multipleDatas === undefined) {
        return null;
      } else {
        const multiples: IMultiple[] = multipleDatas.map((data, index) => { 
          let multiple: IMultiple = {...data, id: keys[index]};
          return multiple;
        })
        return multiples;
      }
    }

    return from(getPromise())
  }


  setTimeInterval(val: number): Promise<void> { return Promise.resolve() }
  setRequiredSuccesses(val: number): Promise<void> {return Promise.resolve() }
  setMultiples(factors: number[], bases: number[]): Promise<void> {return Promise.resolve() }
  addMulitpleSuccess(multipleId: string): Promise<void> {return Promise.resolve() }
  addMultipleFail(multipleId: string): Promise<void> {return Promise.resolve() }


  private _genericGetter<T>(keyName: 'timeInterval' | 'requiredSuccesses' | 'bases' | 'factors'): Observable<T> {
    const getPromise = this.db.then(db => {
      return (db.get('trainings-trainingId:local', keyName) 
        .then(res => res === undefined ? null : res) 
        .catch(_err => null)) as Promise<T>;
    });
    return from(getPromise);
  }

  

}











// import { Injectable } from '@angular/core';
// import { openDB, DBSchema } from 'idb';
// import { resourceLimits } from 'worker_threads';
// import { Multiple } from './Multiple';


// const DB_NAME = 'iteMultipleDB';
// // const STORE_TRAINING = 'localTraining';

// interface MultipleDatas {
//   [id: string]: {
//     f: number,
//     b: number,
//     successes: number,
//     fails: number
//   }
// }

// // interface MultipleData {
// //   f: number,
// //   b: number,
// //   successes: number,
// //   fails: number
// // }

// type TTrainingSettingsStore = 'training-settings'
// type TTrainingSettingsKey = 'timeInterval' | 'requiredSuccesses' | 'bases' | 'factors' | 'multiples'
// type TTrainingSettingsValue = number | number[] | MultipleDatas;

// type TPath = 
//   'training-settings' |
//   'training-settings.timeInterval' |
//   'training-settings.requiredSuccesses'

// // interface myDb {
// //   trainingSettings: {
// //     timeInterval: number;
// //     requiredSuccesses: number;
// //     bases: number[];
// //     factors: number[];
// //     multiples: MultipleDatas;
// //   }
// // }

// interface MyDB extends DBSchema {
//   'training-settings': {
//     key: 'timeInterval' | 'requiredSuccesses' | 'bases' | 'factors' | 'multiples';
//     value: number | number[] | MultipleDatas;
//   },
// }


// @Injectable({ providedIn: 'root' })
// export class LocalStoreService {

//   db = openDB<MyDB>(DB_NAME, 1, {
//     upgrade(db) {
//       db.createObjectStore('training-settings');
//       // db.createObjectStore('training-multiples');
//     },
//   });

//   // async set(path: TPath, value: any): Promise<{key: 'timeInterval' | 'requiredSuccesses' | 'bases' | 'factors' | 'multiples', value: any} | null> {
//   //   // let storeName = path.split('.')[0] as 'training-settings';
//   //   // let keyName = path.split('.')[1] as 'timeInterval' | 'requiredSuccesses' | 'bases' | 'factors' | 'multiples';
//   //   const [storeName, keyName] = path.split('.');
//   //   const db = await this.db;
//   //   const result = db.put(storeName, value, keyName)
//   //     .then(_res => ({ key: keyName, value }));
//   //   return result;
//   // }
  
//   async getTimeInterval(): Promise<number | null> {
//     const db = await this.db;
//     const result = (db.get('training-settings', 'timeInterval') as Promise<number | undefined>)
//       .then((res) => res === undefined ? null : res)
//       .catch(err => {throw err})
//     return result;
//   }

//   async setTimeInterval(val: number): Promise<{ key: string; value: number } | null> {
//     const db = await this.db;
//     return new Promise(
//       (
//         resolve: (value: { key: string; value: number } | null) => void
//       ) => {
//         db.put('training-settings', val, 'timeInterval')
//           .then((_res) => resolve({ key: 'timeInterval', value: val }))
//           .catch((_err) => resolve(null));
//       }
//     );
//   }


//   async getRequiredSuccesses(): Promise<number | null> {
//     const db = await this.db;
//     const result = (db.get('training-settings', 'requiredSuccesses') as Promise<number | undefined>)
//       .then((res) => res === undefined ? null : res)
//       .catch(err => {throw err})
//     return result;
//   }

//   async setRequiredSuccesses(val: number): Promise<{ key: string, value: number } | null> {
//     const db = await this.db;
//     return new Promise(
//       (
//         resolve: (value: { key: string, value: number } | null) => void
//       ) => {
//         db.put('training-settings', val, 'requiredSuccesses')
//           .then((_res) => resolve({ key: 'requiredSuccesses', value: val }))
//           .catch((_err) => resolve(null));
//       }
//     );
//   }


//   async getMultiples(): Promise<Multiple[] | null> {
//     const db = await this.db;
//     const result = (db.get('training-settings', 'timeInterval') as Promise<MultipleDatas | undefined>)
//       .then((res) => res === undefined ? null : this._toMultiples(res))
//       .catch(err => {throw err})
//     return result;
//   }

//   async setMultiples(val: Multiple[]): Promise<{ key: string, value: Multiple[] } | null> {
//     const db = await this.db;
//     return new Promise(
//       (
//         resolve: (value: { key: string, value: Multiple[] } | null) => void
//       ) => {
//         db.put('training-settings', this._toMultipleDatas(val), 'multiples')
//           .then((_res) => resolve({ key: 'multiples', value: val }))
//           .catch((_err) => resolve(null));
//       }
//     );
//   }

//   private _toMultiples(multipleDatas: MultipleDatas): Multiple[] {
//     const multiples: Multiple[] = [];
//     for (let key in multipleDatas) {
//       const {f, b, successes, fails} = multipleDatas[key];
//       multiples.push(new Multiple(f, b, successes, fails))
//     }
//     return multiples;
//   }

//   private _toMultipleDatas(multiples: Multiple[]): MultipleDatas {
//     const multipleDatas: MultipleDatas = {};
//     multiples.forEach(m => {
//       const { id, n1, n2, successes, fails } = m;
//       multipleDatas[id] = {f: n1, b: n2, successes, fails}
//     })
//     return multipleDatas;
//   }

//   // private _toMultipleData(multiple: Multiple): MultipleData {
//   //   const multipleData: MultipleData = {};
//   //   multiples.forEach(m => {
//   //     const { id, n1, n2, successes, fails } = m;
//   //     multipleDatas[id] = {f: n1, b: n2, successes, fails}
//   //   })
//   //   return multipleDatas;
//   // }

// }


  // async test(): Promise<number | null> {
  //   const p = new Promise<number>((resolve, reject) => {
  //     setTimeout(() => {
  //       // resolve(10)
  //       reject(99)
  //     }, 2000);
  //   });

  //   /** A - this return always resolves! (no need for catch at higher level) */

  //   /** with then catch */
  //   // return p
  //   //   .then(res => res * 2)
  //   //   .catch(_err => null)
    
  //   /** same code with async await */
  //   // try {
  //   //   const res = await p;
  //   //   return res * 2;
  //   // } catch(err) {
  //   //   return null;
  //   // }

  //   /** B - this return rethrow error, and must be managed at higher level */
  //   return p
  //     .then(res => res * 2)
  //     .catch(err => {
  //       console.warn(`an error occured: ${err}`)
  //       throw err
  //     })
  // }

  // async getTimeInterval(): Promise<number | null> {
  //   const db = await this.db;
  //   return new Promise(
  //     (
  //       resolve: (value: number | null) => void
  //     ) => {
  //       db.get(STORE_TRAINING, 'timeInterval')
  //         .then(res => !!res ? resolve(res) : resolve(null))
  //         .catch(_err => resolve(null))
  //     }
  //   );
  // }

  // async setTimeInterval(val: number): Promise<{ key: string; value: number } | null> {
  //   const db = await this.db;
  //   return new Promise(
  //     (
  //       resolve: (value: { key: string; value: number } | null) => void
  //     ) => {
  //       db.put(STORE_TRAINING, val, 'timeInterval')
  //         .then((_res) => resolve({ key: 'timeInterval', value: val }))
  //         .catch((_err) => resolve(null));
  //     }
  //   );
  // }


  // async getRequiredSuccesses(): Promise<number | null> {
  //   const db = await this.db;
  //   return new Promise(
  //     (
  //       resolve: (value: number | null) => void
  //     ) => {
  //       db.get(STORE_TRAINING, 'requiredSuccesses')
  //         .then(res => !!res ? resolve(res) : resolve(null))
  //         .catch(_err => resolve(null))
  //     }
  //   );
  // }

  // async setRequiredSuccesses(val: number): Promise<{ key: string, value: number } | null> {
  //   const db = await this.db;
  //   return new Promise(
  //     (
  //       resolve: (value: { key: string, value: number } | null) => void
  //     ) => {
  //       db.put(STORE_TRAINING, val, 'requiredSuccesses')
  //         .then((_res) => resolve({ key: 'requiredSuccesses', value: val }))
  //         .catch((_err) => resolve(null));
  //     }
  //   );
  // }


  // async getMultiples(): Promise<Multiple[] | null> {
  //   const db = await this.db;
  //   return new Promise(
  //     (
  //       resolve: (value: Multiple[] | null) => void
  //     ) => {
  //       db.get(STORE_TRAINING, 'multiples')
  //         .then((res: MultipleDatas) => !!res ? resolve(this._toMultiple(res)) : resolve(null))
  //         .catch(_err => resolve(null))
  //     }
  //   );
  // }

  // async setMultiples(val: Multiple[]): Promise<{ key: string, value: Multiple[] } | null> {
  //   const db = await this.db;
  //   return new Promise(
  //     (
  //       resolve: (value: { key: string, value: Multiple[] } | null) => void
  //     ) => {
  //       db.put(STORE_TRAINING, this._toMultipleDatas(val), 'multiples')
  //         .then((_res) => resolve({ key: 'multiples', value: val }))
  //         .catch((_err) => resolve(null));
  //     }
  //   );
  // }

  // private _toMultiple(multipleDatas: MultipleDatas): Multiple[] {
  //   const multiples: Multiple[] = [];
  //   for (let key in multipleDatas) {
  //     const {f, b, successes, fails} = multipleDatas[key];
  //     multiples.push(new Multiple(f, b, successes, fails))
  //   }
  //   return multiples;
  // }

  // private _toMultipleDatas(multiples: Multiple[]): MultipleDatas {
  //   const multipleDatas: MultipleDatas = {};
  //   multiples.forEach(m => {
  //     const { id, n1, n2, successes, fails } = m;
  //     multipleDatas[id] = {f: n1, b: n2, successes, fails}
  //   })
  //   return multipleDatas;
  // }
