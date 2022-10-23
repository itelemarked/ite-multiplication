
import { Injectable } from '@angular/core';
import { openDB } from 'idb';


const DB_NAME = 'iteMultipleDB';
const STORE_TRAINING = 'localTraining'

@Injectable({ providedIn: 'root' })
export class StoreService {

  db = openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_TRAINING);
    },
  });

  async getTimeInterval(): Promise<number | null> {
    const db = await this.db;
    return new Promise(
      (
        resolve: (value: number | null) => void
      ) => {
        db.get(STORE_TRAINING, 'timeInterval')
          .then(res => !!res ? resolve(res) : resolve(null))
          .catch(_err => resolve(null))
      }
    );
  }

  async setTimeInterval(val: number): Promise<{ key: string; value: number }> {
    const db = await this.db;
    return new Promise(
      (
        resolve: (value: { key: string; value: number }) => void,
        reject: (err: any) => void
      ) => {
        db.put(STORE_TRAINING, val, 'timeInterval')
          .then((_res) => resolve({ key: 'timeInterval', value: val }))
          .catch((err) => reject(err));
      }
    );
  }

}
