import { Multiple } from './Mutliple';

export class Training {
  private _successNb: number;
  private _timeInterval: number;
  private _multiples: Multiple[];

  constructor(successNb: number, timeInterval: number, multiples: Multiple[]) {
    this._successNb = successNb;
    this._timeInterval = timeInterval;
    this._multiples = [...multiples];
  }

  getSuccessNb(): number {
    return this._successNb;
  }

  getTimeInterval(): number {
    return this._timeInterval;
  }

  getMultiples(): Multiple[] {
    return [...this._multiples];
  }

}
