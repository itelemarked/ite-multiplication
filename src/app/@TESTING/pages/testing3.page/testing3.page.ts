import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, take } from 'rxjs';
import { MultipleGroup } from '../../MultipleGroup/MultipleGroup';

@Component({
  selector: 'app-testing3',
  templateUrl: './testing3.page.html',
  styleUrls: ['./testing3.page.scss']
})
export class Testing3Page {

  bases = [1,2]

  constructor() {
    const test1 = new MultipleGroup([6,7,9,6], 2, 2)
    // test1.multiples.forEach(m => m.successes = 2);
    // test1.multiples[1].successes = 1;
    // test1.multiples[10].successes = 1;

    // // console.log(test1.getUncompleteMultiples())
    // console.log(test1.pickRandomUncompleteMultiple())
  }

  logChecked(newChecked: boolean) {
    console.log(newChecked)
  }


  // constructor(private afDatabase: AngularFireDatabase) {
  //   const settings$ = this.get$$(['settings']);
  //   settings$.subscribe(res => {
  //     console.log('settings changed')
  //     console.log(res)
  //   })

  //   setTimeout(() => {
  //     // this.afDatabase.object('settings').update(['aaa', 'bbb'])
  //     // this.remove(['settings', 'lives'])
  //     // this.remove(['settings', 'user', 'firstnam'])
  //     // this.update(['settings', 'user'], {firstname: 'Bob', lastname: 'Dylan'})
  //   }, 3000);

  // }

  // get$$<T>(key: string[]): Observable<T | null> {
  //   const path = key.join('/');
  //   return this.afDatabase.object<T>(path).valueChanges();
  // }

  // getOnce$<T>(key: string[]): Observable<T | null> {
  //   const path = key.join('/');
  //   return this.afDatabase.object<T>(path).valueChanges().pipe(take(1));
  // }

  // patch(key: string[], valueObj: object) {
  //   const path = key.join('/');
  //   this.afDatabase.object(path).update(valueObj);
  // }

  // set(key: string[], valueObj: object) {
  //   const path = key.join('/');
  //   this.afDatabase.object(path).set(valueObj);
  // }

  // remove(key: string[]) {
  //   const path = key.join('/');
  //   this.afDatabase.object(path).remove();
  // }

}
