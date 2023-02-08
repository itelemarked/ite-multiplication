function assertError<T>(value: T, typeName: string) {
  const message = `Assert error (${typeName}): '${value}' is not of type '${typeName}'`;
  throw new Error(message);
}

export type MultipleId = string & { _type: 'MultipleId' };

export function assertMultipleId(s: string): MultipleId {
  const regexp = /\d+x\d+/;
  const match = s.match(regexp);
  if (match === null) assertError(s, 'MultipleId');
  return s as MultipleId;
}


export type NonNegative = number & { _type: 'NonNegative' };

export function assertNonNegative(n: number): NonNegative {
  if (n < 0) assertError(n, 'NonNegative');
  return n as NonNegative;
}


export interface IMultiple {
  readonly id: MultipleId;
  readonly f1: NonNegative;
  readonly f2: NonNegative;
  readonly result: NonNegative;
  successes: NonNegative;
  fails: NonNegative;
}


export type MultipleConstructor = { _type: 'MultipleConstructor' } & {
  f1: NonNegative;
  f2: NonNegative;
  successes?: NonNegative;
  fails?: NonNegative;
};

export function assertMultipleConstructor(
  multiple: MultipleConstructor
): MultipleConstructor {
  const { f1, f2, successes, fails } = multiple;
  try {
    assertNonNegative(f1);
    assertNonNegative(f2);
    if (successes !== undefined) assertNonNegative(successes);
    if (fails !== undefined) assertNonNegative(fails);
  } catch (err) {
    assertError(multiple, 'MultipleConstructor');
  }
  return { f1, f2, successes, fails } as MultipleConstructor;
}


export type TrainingMultiples = IMultiple[] & { _type: 'TrainingMultiples' };

export function assertTrainingMultiples(
  multiples: IMultiple[]
): TrainingMultiples {
  const foundDuplicate = multiples.map((m) => m.id).find((id, idx, self) => self.indexOf(id) !== idx);
  if (foundDuplicate) assertError(multiples, 'TrainingMultiples');
  return multiples as TrainingMultiples;
}


/**
 * More generic, but not required... see UniqueMultipleArray instead
 */
// export type UniqueArray<T, K = ''> = T extends { [key: string]: any }
//   ? K extends keyof T
//     ? T[] & { _type: 'UniqueArray<object>'; idField: K }
//     : never
//   : T extends string | number
//     ? T[] & { _type: `UniqueArray<${T}>` }
//     : never;


export type UniqueMultipleArray = IMultiple[] & { _type: 'UniqueMultipleArray' }

export function assertUniqueMultipleArray(multiples: IMultiple[]): UniqueMultipleArray {
  const foundDuplicateId = multiples.map(m => m.id).find((id, idx, self) => {
    if(self.indexOf(id) !== idx) return id;
    return null;
  });
  if (foundDuplicateId) assertError(foundDuplicateId, 'UniqueMultipleArray');
  return multiples as UniqueMultipleArray;
}

export interface ITraining {
  readonly successesRequired: NonNegative;
  readonly multiples: UniqueMultipleArray
}



