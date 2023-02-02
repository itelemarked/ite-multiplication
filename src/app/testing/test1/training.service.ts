import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { IMultiple, Multiple, TId } from "./Multiple";
import { Training } from "./Training";


@Injectable({providedIn: 'root'})
export class TrainingController {

  get currentTraining() {
    return this._currentTraining
  }
  private _currentTraining: Training | null = null;

  // createByBases(bases: number[], successesRequired: number) {
  //   // TODO: remove duplicates!!
  //   this.currentTraining = new Training();
  //   this.currentTraining.successesRequired = successesRequired;

  //   const multiples: Multiple[] = [];
  //   // const factors = [1,2,3,4,5,6,7,8,9,10,11,12]
  //   const factors = [1,2,3]
  //   for (let i = 0; i < bases.length; i++) {
  //     const b = bases[i];
  //     for (let j = 0; j < factors.length; j++) {
  //       const f = factors[j];

  //       multiples.push(new Multiple({id: `${b}x${f}`, successes: 0, fails: 0}))
  //     }
  //   }
  //   this.multiples = multiples;
  // }

  create(opts: {multiples: IMultiple[], successesRequired: number}): Training {
    if (this._currentTraining !== null) {
      throw new Error('Unable to create a new training... one training is still running!')
    }

    const {successesRequired, multiples} = opts;
    this._currentTraining = new Training(successesRequired, multiples);

    return this._currentTraining;
  }

  /**
   * Get the current training instance.
   * Note that the training could be completed:
   * E.g if you want to display a summary of the results!
   */
  get(): Training {
    if (this._currentTraining === null) {
      throw new Error('There is no created training available yet... create one with createXY methods!')
    }
    return this._currentTraining;
  }

  kill() {
    this._currentTraining = null;
  }

}

