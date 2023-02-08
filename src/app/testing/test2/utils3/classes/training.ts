import { BehaviorSubject } from "rxjs";
import { IMultiple, ITraining } from "../interfaces/interfaces";

export class Training implements ITraining {
  private _successRequired: number;
  private _multiples: IMultiple[];
  private _complete$ = new BehaviorSubject<boolean>(false);
  complete$ = this._complete$.asObservable();

  constructor(successRequired: number, multiples: IMultiple[]) {
    this._successRequired = successRequired;
    this._multiples = multiples;

    if (this._multiples.find(m => m.successes < this._successRequired) === undefined) {
      this._complete$.next(true);
    }
  }

  getSuccessRequired(): number {
    return this._successRequired;
  }

  getMultiples(): Readonly<Readonly<IMultiple>[]> {
    return this._multiples.map((m) => {
      return m as Readonly<IMultiple>;
    }) as Readonly<Readonly<IMultiple>[]>;
  }

  addSuccess(multipleId: string) {
    const trainingCompleted = this._complete$.getValue()
    if (trainingCompleted) return;

    const foundMultiple = this._multiples.find(m => m.id === multipleId);
    if (foundMultiple) {
      foundMultiple.successes++;
    }

    if (this._multiples.find(m => m.successes < this._successRequired) === undefined) {
      this._complete$.next(true);
    }
  }

  addFail(multipleId: string) {
    const trainingCompleted = this._complete$.getValue()
    if (trainingCompleted) return;

    const foundMultiple = this._multiples.find(m => m.id === multipleId);
    if (foundMultiple) {
      foundMultiple.fails++;
    }

    if (this._multiples.find(m => m.successes < this._successRequired) === undefined) {
      this._complete$.next(true);
    }
  }
}
