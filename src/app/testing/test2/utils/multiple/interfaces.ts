
// function MULTIPLE_IDS_GENERATE() {
//   const multipleIds: any = {}
//   for (let i = 0; i <= 12; i++) {
//     for (let j = i; j <= 12; j++) {
//       multipleIds[`${i}x${j}`] = null;
//     }
//   }
//   multipleIds['15x15'] = null;
//   multipleIds['20x20'] = null;
//   multipleIds['25x25'] = null;
//   return multipleIds;
// };

// type MULTIPLE_IDS = ReturnType<typeof MULTIPLE_IDS_GENERATE>


// type MultipleId_2 =
//   | '0x0'
//   | '0x1'
//   | '0x2'
//   | '0x3'
//   | '0x4'
//   | '0x5'
//   | '0x6'
//   | '0x7'
//   // etc...

export type MultipleId = `${number}x${number}`;

export type NonNegativeNumber = number & { _type: 'NonNegativeNumber' };

export function isNonNegativeNumber(n: number): n is NonNegativeNumber {
  return n >= 0;
}

export interface Multiple {
  successes: number;
  fails: number;
  f1: number;
  f2: number;
}

export interface Training {
  successesRequired: number;
  multiples: Multiple[];
}

// export class Multiple {
//   successes: number;
//   fails: number;
//   readonly a: number;
//   readonly b: number;
//   get id(): MultipleId {
//     return `${this.a}x${this.b}`;
//   }
//   get result(): number {
//     return this.a * this.b;
//   }

//   constructor(a: number, b: number, successes: number = 0, fails: number = 0) {
//     this.a = a;
//     this.b = b;
//     this.successes = successes;
//     this.fails = fails;
//   }

// }

// export type NonNegativeNumbers = number[] & { _type: 'NonNegativeNumbers'}

// export function isNonNegativeNumbers(arr: number[]): arr is NonNegativeNumbers {
//   const invalidFound = arr.find(a => a < 0);
//   return invalidFound === undefined;
// }

// export type UniqueNumbers = number[] & { _type: 'UniqueNumberArray'}

// export function isUniqueNumbers(arr: number[]): arr is UniqueNumbers {
//   const invalidFound = arr.find((a, idx, self) => self.indexOf(a) !== idx);
//   return invalidFound === undefined;
// }

// // TODO: fix type property in NonNegativeNumbers
// export type UniqueNonNegativeNumbers = UniqueNumbers & NonNegativeNumbers;
