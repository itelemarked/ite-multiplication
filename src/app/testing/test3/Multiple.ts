import { MultipleId, toMultipleId } from "./MultipleId";
import { NonNegativeInt, toNonNegativeInt } from "./NonNegativeInt";
import { throwError } from "./utils";


export class Multiple {

  readonly id: string;
  readonly f1: number;
  readonly f2: number;
  readonly result: number;

  private _successes: number;
  get successes(): number { return this._successes; }

  private _fails: number;
  get fails(): number { return this._fails; }

  constructor(f1: number, f2: number, successes: number = 0, fails: number = 0) {
    this.f1 = f1;
    this.f2 = f2;
    this._successes = successes;
    this._fails = fails;
    this.id = f2 > f1 ? `${f1}x${f2}`: `${f2}x${f1}`;
    this.result = f1 * f2;
  }

  addSuccess() {
    this._successes++;
  }

  addFail() {
    this._fails++;
  }

}

// export class Multiple {

//   private _id: MultipleId;
//   private _f1: NonNegativeInt;
//   private _f2: NonNegativeInt;
//   private _result: NonNegativeInt;
//   private _successes: NonNegativeInt;
//   private _fails: NonNegativeInt;

//   get id(): MultipleId { return this._id; }
//   get f1(): NonNegativeInt { return this._f1; }
//   get f2(): NonNegativeInt { return this._f2; }
//   get result(): NonNegativeInt { return this._result; }
//   get successes(): NonNegativeInt { return this._successes; }
//   get fails(): NonNegativeInt { return this._fails; }

//   constructor(f1: NonNegativeInt, f2: NonNegativeInt, successes: NonNegativeInt = toNonNegativeInt(0), fails: NonNegativeInt = toNonNegativeInt(0)) {
//     this._id = f1 < f2 ? toMultipleId(`${f1}x${f2}`) : toMultipleId(`${f2}x${f1}`);
//     this._f1 = f1;
//     this._f2 = f2;
//     this._result = toNonNegativeInt(f1 * f2);
//     this._successes = successes;
//     this._fails = fails;
//   }

//   addSuccess() {
//     this._successes++
//   }

//   addFail() {
//     this._fails++
//   }

// }



