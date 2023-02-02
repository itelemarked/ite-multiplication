
export type TId = `${number}x${number}`;

export interface IMultipleData { successes: number, fails: number }

export interface IMultiple extends IMultipleData { id: TId }


function _getMinAndMaxNumbersFromId(id: TId): {min: number, max: number} {
  const regexp = /(\d+)x(\d+)/;
  const match = id.match(regexp);

  if (match === null) {
    throw new Error(`Invalid Id: not matching regexp ${regexp}`)
  }

  const n1 = +match[1];
  const n2 = +match[2];

  return n1 < n2 ? {min: n1, max: n2} : {min: n2, max: n1};
}


export class Multiple {

  readonly id: TId;
  readonly a: number;
  readonly b: number;
  readonly result: number;

  get successes() {
    return this._successes;
  }
  private _successes: number;

  get fails() {
    return this._fails;
  }
  private _fails: number;


  constructor(multiple: IMultiple) {
    this.id = multiple.id;
    this.a = _getMinAndMaxNumbersFromId(multiple.id).min;
    this.b = _getMinAndMaxNumbersFromId(multiple.id).max;
    this.result = this.a * this.b;
    this._successes = multiple.successes;
    this._fails = multiple.fails;
  }

  addSuccess() {
    this._successes++;
  }

  addFail() {
    this._fails++;
  }

}
