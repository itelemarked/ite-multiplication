import { IMultiple, ITraining, NonNegative, UniqueMultipleArray } from "./interfaces";


function getMultiples(training: ITraining): IMultiple[] {
  return JSON.parse(JSON.stringify(training.multiples)) as IMultiple[]
}

function getSuccessRequired(training: ITraining): NonNegative {
  return training.successesRequired;
}


export class Training  {

  private _successesRequired: NonNegative;
  private _multiples: UniqueMultipleArray;

  constructor(successesRequired: NonNegative, multiples: UniqueMultipleArray) {
    this._successesRequired = successesRequired;
    this._multiples = [...multiples] as UniqueMultipleArray;
  }

  // getMultiples(filterFn?: (m: Multiple) => boolean): Multiple[] {
  //   if (!filterFn) {
  //     return [...this._multiples]
  //   }
  //   return this._multiples.filter(filterFn) as Readonly<Multiple>[];
  // }

}
