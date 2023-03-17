import { containsDuplicates, containsNegativeNumber } from '../array/array';
import { Multiple, MultipleId } from './interfaces';


export function create(opts: {
  f1: number;
  f2: number;
  successes?: number;
  fails?: number;
}) {
  const {f1, f2, successes = 0, fails = 0 } = opts;
  return {
    f1,
    f2,
    successes,
    fails,
  };
}

export function result(multiple: Multiple) {
  const { f1, f2 } = multiple;
  return f1 * f2;
}

export function id(multiple: Multiple) {
  const { f1, f2 } = multiple;
  return f1 < f2 ? `${f1}x${f2}` : `${f2}x${f1}`;
}

export function idToFactors(id: MultipleId): {f1: number, f2: number} {
  const regexp = /(\d+)x(\d+)/;
  const n1 = +id.match(regexp)![1];
  const n2 = +id.match(regexp)![2];
  return n1 < n2 ? {f1: n1, f2: n2} : {f1: n2, f2: n1};
}


export function generateMultiplesByBases(bases: number[], factors: number[]): Multiple[] {
  if (containsNegativeNumber(bases) || containsDuplicates(bases)) {
    throw new Error('Bases contains negative or duplicate number...');
  }
  if (containsNegativeNumber(factors) || containsDuplicates(factors)) {
    throw new Error('Factors contains negative or duplicate number...');
  }

  const sortedBases = bases.sort((f1, f2) => f1 - f2);
  const sortedFactors = factors.sort((f1, f2) => f1 - f2);

  const results: Multiple[] = [];
  for (const base of sortedBases) {
    for (const factor of sortedFactors) {
      const factorMustBeSkipped = sortedBases.includes(factor) && factor < base;
      if (!factorMustBeSkipped) {
        results.push({
          f1: base,
          f2: factor,
          successes: 0,
          fails: 0,
        });
      }
    }
  }
  return results;
}










// function _getMinAndMaxFromId(multiple: Multiple): {min: number, max: number} {
//   const regexp = /(\d+)x(\d+)/;
//   const n1 = +multiple.id.match(regexp)![1];
//   const n2 = +multiple.id.match(regexp)![2];
//   return n1 < n2 ? {min: n1, max: n2} : {min: n2, max: n1};
// }

// export function result(multiple: Multiple) {
//   const {min, max} = _getMinAndMaxFromId(multiple);
//   return min * max;
// }

// export function getRandomFilteredMultiple(
//   multiples: Multiple[],
//   filterFn: (m: Multiple) => boolean
// ): Multiple | null {
//   const filtered = multiples.filter(filterFn);
//   const randomIdx = Math.floor(Math.random() * filtered.length);
//   return filtered[randomIdx];
// }

