import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { IMultiple, Multiple } from "./Multiple";



@Injectable({providedIn: 'root'})
export class TrainingService {

  public multiples: Multiple[] | null = null;
  public successesRequired: number | null = null;

  private _complete$: Subject<void> = new Subject();
  public complete$: Observable<void> = this._complete$.asObservable();

  createByBases(bases: number[], successesRequired: number) {
    // TODO: remove duplicates!!
    this.successesRequired = successesRequired;

    const multiples: Multiple[] = [];
    // const factors = [1,2,3,4,5,6,7,8,9,10,11,12]
    const factors = [1,2,3]
    for (let i = 0; i < bases.length; i++) {
      const b = bases[i];
      for (let j = 0; j < factors.length; j++) {
        const f = factors[j];

        multiples.push(new Multiple({id: `${b}x${f}`, successes: 0, fails: 0}))
      }
    }
    this.multiples = multiples;
  }

  createByMultiples(multiples: IMultiple[], successesRequired: number) {
    this.successesRequired = successesRequired;
    this.multiples = multiples.map(m => new Multiple(m));
  }

  randomPendingMultiple(): Multiple | null {
    if (this.multiples === null || this.successesRequired === null) {
      throw new Error('Multiples or successesRequired is still null...! Use createByBases or createByMultiples before!')
    }

    const pendings = this.multiples.filter(m => m.successes < this.successesRequired!);

    if (pendings.length === 0) return null;

    const randomIdx = Math.floor((Math.random()*pendings.length))
    return pendings[randomIdx];
  }

  addSuccess(multipleId: string) {
    if (this.multiples === null) throw new Error('Multiples is still null...! Use createByBases or createByMultiples before!')
    const pending = this.randomPendingMultiple();
    if (pending === null) throw new Error ('Something bad happened... Training should have complete yet!')

    const found = this.multiples.find(m => m.id === multipleId)
    if (found === undefined) throw new Error('The searched id doesn t exist in the stored multiples...')

    found.addSuccess();

    if (this.randomPendingMultiple() === null) {
      this._complete$.next();
      console.log('training completed!')
    }
  }

  addFail(multipleId: string) {}

  reset() {
    this.multiples = null;
    this.successesRequired = null;
  }

}
