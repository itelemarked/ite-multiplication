import { Multiple } from "./Multiple";



export class Training {

  readonly id: string;
  readonly successRequired: number;
  readonly multiples: Multiple[];

  constructor(id: string, successRequired: number, multiples: Multiple[]) {
    this.id = id;
    this.successRequired = successRequired;
    this.multiples = multiples;
  }

}


// export class Training {

//   private _successRequired: NonNegativeInt;
//   private _multiples: Multiple[];

//   get successRequired(): NonNegativeInt { return this._successRequired; }
//   get multiples(): Multiple[] { return this._multiples }

//   constructor(successRequired: NonNegativeInt, multiples: UniqueMultiples) {
//     this._successRequired = successRequired;
//     this._multiples = multiples;
//   }

// }





