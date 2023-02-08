import { assertMultipleId, assertNonNegative, IMultiple, MultipleConstructor, MultipleId, NonNegative } from "./interfaces";


export function createMultiple(multiple: MultipleConstructor): IMultiple {
  const f1 = multiple.f1;
  const f2 = multiple.f2;
  const successes = multiple.successes ?? assertNonNegative(0);
  const fails = multiple.fails ?? assertNonNegative(0);
  const result = assertNonNegative(f1 * f2);
  const id = assertMultipleId(`${f1}x${f2}`);
  return { id, f1, f2, successes, fails, result }
}


export class MultipleClass {

  readonly id: MultipleId;
  readonly f1: NonNegative;
  readonly f2: NonNegative;
  readonly result: NonNegative;
  private _successes: NonNegative;
  private _fails: NonNegative;

  get successes(): NonNegative { return this._successes }
  get fails(): NonNegative { return this._fails }

  constructor(multiple: MultipleConstructor) {
    this.f1 = multiple.f1;
    this.f2 = multiple.f2;
    this.id = assertMultipleId(`${multiple.f1}x${multiple.f2}`);
    this.result = assertNonNegative(multiple.f1 * multiple.f2);
    this._successes = multiple.successes ?? assertNonNegative(0);
    this._fails = multiple.fails ?? assertNonNegative(0);
  }

}
