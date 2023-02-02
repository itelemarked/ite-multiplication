

export type MultipleId = `${number}x${number}`;

export type NonNegativeNumber = number & { _type: 'NonNegativeNumber' };

export function isNonNegativeNumber(n: number): n is NonNegativeNumber {
  return n >= 0;
}


export interface Multiple {
  readonly id: MultipleId,
  successes: number,
  fails: number
}


export interface Training {
  successesRequired: number,
  multiples: Multiple[]
}





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
