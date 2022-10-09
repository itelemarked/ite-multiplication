import { Injectable } from '@angular/core';
import { openDB } from 'idb';

@Injectable({
  providedIn: 'root',
})
export class TrainingStoreService {

  dbPromise = openDB('training-database', 1, {
    upgrade(db) {
      if(!db.objectStoreNames.contains('training-store')) {
        db.createObjectStore('training-store');
      }
    },
  });

  constructor() {
    this.get('some new').then(console.log)
  }

  async get(key: string) {
    const tx = (await this.dbPromise).transaction('training-store', 'readonly');
    const store = tx.objectStore('training-store')
    return store.get(key);

    // return (await this.dbPromise).get('training-store', key);
  }
  async set(key: string, val: any) {
    return (await this.dbPromise).put('training-store', val, key);
  }
  async del(key: string) {
    return (await this.dbPromise).delete('training-store', key);
  }
  async clear() {
    return (await this.dbPromise).clear('training-store');
  }
  async keys() {
    return (await this.dbPromise).getAllKeys('training-store');
  }
}

