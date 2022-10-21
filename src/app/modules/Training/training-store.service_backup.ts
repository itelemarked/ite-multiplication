import { Injectable } from '@angular/core';
import { openDB } from 'idb';
import { BehaviorSubject, Observable } from 'rxjs';
import { Multiple } from './Mutliple';
import { Training } from './Training';

interface IMultipleDatas {
  [id: string]: {
    successes: number;
    fails: number;
  }
}

interface ITrainingDatas {
  successNb: number;
  timeInterval: number;
  multipleDatas: IMultipleDatas
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

  private _storedTraining$ = new BehaviorSubject<Training | null | undefined>(undefined);
  storedTraining$: Observable<Training | null | undefined> = this._storedTraining$.asObservable();

  constructor() {
    console.log('trainingStoreService constructor()')
    this.fetch().then((val: Training | null) => {
      this._storedTraining$.next(val);
    })

    // const newTraining = new Training(10,11,[new Multiple(1,1,2,2), new Multiple(1,2,9,8)])
    // this.setTraining(newTraining)
    //   .then(_ => console.log('training set successfully!'))
    //   .catch((reason) => console.error(reason))
  }

  async store(training: Training): Promise<void> {
    try {
      const db = await this.db;
      const tx = db.transaction(STORE_NAME, 'readwrite');

      const { successNb, timeInterval, multipleDatas } = this._toTrainingDatas(training);
      tx.store.put(successNb, 'successNb');
      tx.store.put(timeInterval, 'timeInterval');
      tx.store.put(multipleDatas, 'multiples');
      const done = await tx.done;
      this._storedTraining$.next(training);
      return done;
    } 

    catch (err) {
      console.warn('Unable to set training...', err)
    }
  }

  private _toTrainingDatas(training: Training): ITrainingDatas {
    const multiplesObj: IMultipleDatas = {};
    training.multiples.forEach(m => {
      const id = m.id;
      const successes = m.successes;
      const fails = m.fails;
      multiplesObj[id] = { successes, fails };
    })

    return {
      successNb: training.successNb,
      timeInterval: training.timeInterval,
      multipleDatas: multiplesObj
    }
  }

  async fetch(): Promise<Training | null> {
    try {
      const db = await this.db;
      const tx = db.transaction(STORE_NAME, 'readonly');

      const successNb: number = await tx.store.get('successNb');
      const timeInterval: number = await tx.store.get('timeInterval');
      const multipleDatas: IMultipleDatas = await tx.store.get('multiples');

      if (typeof(successNb) !== 'number') throw new Error('Invalid database: successNb is not a number')
      if (typeof(timeInterval) !== 'number') throw new Error('Invalid database: timeInterval is not a number')
      // validate multipleDatas???

      const trainingDatas: ITrainingDatas = { successNb, timeInterval, multipleDatas }
      return this._toTraining(trainingDatas)
    } 

    catch (err) {
      console.warn('Unable to get training...', err);
      return null
    }
  }

  private _toTraining(trainingDatas: ITrainingDatas): Training {
    const { successNb, timeInterval } = trainingDatas;
    const multiples: Multiple[] = [];
    
    for (let m in trainingDatas.multipleDatas) {
      const n1 = +m.match(/^\d+/)![0];
      const n2 = +m.match(/\d+$/)![0];
      const successes = trainingDatas.multipleDatas[m].successes;
      const fails = trainingDatas.multipleDatas[m].fails;
      multiples.push(new Multiple(n1, n2, successes, fails))
    }

    return new Training(successNb, timeInterval, multiples);
  }

  // async databaseExists(databaseName: string): Promise<boolean> {
  //   const databaseInfos = await window.indexedDB.databases();
  //   const found = databaseInfos.find(d => d.name === databaseName);
  //   return found === undefined ? false : true;
  // }

  // async databaseHasValidTrainingStore(storeName: string): Promise<boolean> {

  // }

  // getTraining(): Promise<Training | null> {

  // }

  // private async _trainingStoreExists(): boolean {
  //   return true;
  // }

  // async deleteDatabase() {
  //   return window.indexedDB.deleteDatabase(DB_NAME);
  // }

}

