
export type TId = `${number}x${number}`;


export type PositiveOrZeroNumber = number & {_type: 'PositiveOrZeroNumber' };

export function isPositiveOrZeroNumber(n: number): n is PositiveOrZeroNumber {
  return n >= 0;
}


export type PositiveOrZeroNumberArray = number[] & { _type: 'PositiveOrZeroNumberArray'}

export function isPositiveOrZeroNumberArray(arr: number[]): arr is PositiveOrZeroNumberArray {
  const invalidFound = arr.find(a => a < 0);
  return invalidFound === undefined;
}


export type UniqueNumberArray = number[] & { _type: 'UniqueNumberArray'}


export interface Multiple {
  readonly id: TId,
  successes: number,
  fails: number
}


export interface Training {
  successesRequired: number,
  multiples: Multiple[]
}



