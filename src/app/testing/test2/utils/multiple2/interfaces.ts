const AVAILABLE_MULTIPLE_IDS = availableMultiplesIds();

function availableMultiplesIds() {}

export type Factor1 =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 15
  | 20
  | 25;

export type Factor2 = Factor1 & { _flag: 'Factor2' };

export type MultipleId = string & { _flag: 'MultipleId' };
export function assertMultipleId(id: string): asserts id is MultipleId {
  const regexp = /0x[0-9]/
}

export interface Multiple {
  readonly id: MultipleId;
  readonly f1: Factor1;
  readonly f2: Factor2;
  readonly result: NonNegative;
  successes: NonNegative;
  fails: NonNegative;
}

export type TrainingMultiples = Multiple[] & { _flag: 'TrainingMultiples' };

export interface Training {
  // multiples: TrainingMultiples,
  successRequired: NonNegative;
}

export type NonNegative = number & { _flag: 'NonNegative' };
export function assertNonNegative(n: number): asserts n is NonNegative {
  if (n < 0) throw new Error('Asserting NonNegative failed!')
}
// export function isNonNegative(n: number): Promise<NonNegative> {
//   if (n < 0) return Promise.reject()
//   return Promise.resolve(n as NonNegative)
// }
// export function isNonNegative(n: number): n is NonNegative {
//   if (n < 0) return false;
//   return true;
// }
// export function assertNonNegative(n: number): NonNegative {
//   if (n < 0) throw new Error(`"NonNegative" assert failed, evaluating: ${n}!`)
//   return n as NonNegative;
// }







function createTraining(s: NonNegative): Training {
  return { successRequired: s };
}

// const s = assertNonNegative(2);

// const s = -1;
// isNonNegative(s)
//   .then((s) => {
//     const t = createTraining(s);
//   })
//   .catch((_) => {});

// const s = -1;
// // if (isNonNegative(s)) {
//   const t = createTraining(s);
// // }

type Obj = Exclude<object, {x: 1}>

const a: Obj = {x: 1}
