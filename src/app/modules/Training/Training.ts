import { Multiple } from './Mutliple';

export class Training {
  private _successNb: number;
  private _timeInterval: number;
  private _multiples: Multiple[];

  get successNb(): number {
    return this._successNb;
  }

  get timeInterval(): number {
    return this._timeInterval;
  }

  get multiples(): Multiple[] {
    return this._multiples;
  }

  constructor(successNb: number, timeInterval: number, multiples: Multiple[]) {
    this._successNb = successNb;
    this._timeInterval = timeInterval;
    this._multiples = [...multiples];
  }

}
