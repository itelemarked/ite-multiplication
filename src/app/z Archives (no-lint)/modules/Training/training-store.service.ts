import { Injectable } from '@angular/core';
import { deleteDB, openDB } from 'idb';
import { BehaviorSubject, Observable, timeInterval } from 'rxjs';
import { Multiple } from './Mutliple';
import { Training } from './Training';

interface IMultipleDatas {
  [id: string]: {
    successes: number;
    fails: number;
  }
}

const DB_NAME = 'iteMultipleDB';
const DB_VERSION = 1;
const STORE_NAME = 'localTraining';

@Injectable({
  providedIn: 'root',
})
export class TrainingStoreService {

  // Creates the database and the store (will be present in (almoast) any case... or they might be some errors, to be handled!)
  // TODO: handle error in case database or store cannot be created!
  db = openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME);
    }
  });

  constructor() {
    this.test().then(console.log)
  }

  async test() {
    console.log('testing starts')
    const db = await this.db;

    console.log('testing ends')
    return this.get('localTraining.successNb')
  }

  /**
   * returns Promise<any | null>
   * Doesn't throw specific errors or warnings.
   * It returns the value if found, null in any cases otherwise!
   * It doesn't check if the path exists or not (it will returns null in case a wrong path has been given!)
   * It transforms the value in given conditions (e.g if path is 'localTraining.multiples' it converts the value into a Multiple Array)
   */
  async get(path: string): Promise<any | null> {
    let storeName: string;
    let keyName: string | undefined;
    let others: string[] | undefined;
    [storeName, keyName, ...others] = path.split('.');

    const db = await this.db;

    // Particular case: returns the whole store
    if (path === 'localTraining') {
      const keyValObj: {[key:string]: any} = {};
      const tx = db.transaction(storeName, 'readonly');
      const keys = await tx.store.getAllKeys() as string[];
      // there are currently no keys stored
      if (keys.length === 0) {
        return null;
      }
      const values = await tx.store.getAll() as any[];
      for (let i = 0; i < keys.length; i++) {
        keyValObj[keys[i]] = values[i];
      }
      return keyValObj;
    }

    // Particular case: transform to multiples
    if (path === 'localTraining.multiples') {
      let result: Multiple[]

      const multiplesDatas = await db.get(storeName, keyName);
      if (multiplesDatas === undefined) return null;
      result = this._toMultiples(multiplesDatas);
      return result;
    }

    // Particular case: get single multiple
    if (path.match(/^localTraining.multiples.\d+x\d+$/)) {
      let result: Multiple;

      const multiplesDatas = await db.get(storeName, keyName);
      const id = path.match(/\d+x\d+$/)![0];
      const data: {[key:string]:any} = {}
      data[id] = multiplesDatas[id]
      result = this._toMultiples(data)[0];
      return result;
    }

    // Generic case:
    // invalid Storename (would throw an error)
    if (!db.objectStoreNames.contains(storeName)) return null;

    // result would return the stored value or undefined...
    const result = db.get(storeName, keyName);
    // transform undefined to null.
    if (result === undefined) return null;
    // return the stored value
    return result;
  }


  private _toMultiples(multipleDatas: IMultipleDatas): Multiple[] {
    const multiples: Multiple[] = [];
    for(let key in multipleDatas) {
      const id = key;
      const n1 = +key.match(/^\d+/)!;
      const n2 = +key.match(/\d+$/)!;
      const successes = multipleDatas[key].successes;
      const fails = multipleDatas[key].fails;
      multiples.push(new Multiple(n1, n2, successes, fails))
    }
    return multiples;
  }

}




