
import { Observable } from 'rxjs';

export interface IMultiple {
  readonly id: string;
  readonly f1: number;
  readonly f2: number;
  readonly result: number;
  successes: number;
  fails: number;
}

export interface IMultipleConstructor {
  f1: number;
  f2: number;
  successes?: number;
  fails?: number;
}

export interface ITraining {
  complete$: Observable<boolean>;
  getSuccessRequired: () => number;
  getMultiples: () => Readonly<Readonly<IMultiple>[]>;
  addSuccess: (multipleId: string) => void;
  addFail: (multipleId: string) => void;
}

