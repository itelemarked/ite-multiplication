import { isNonNegativeNumber, Multiple } from "./interfaces";


function _getMinAndMaxFromId(multiple: Multiple): {min: number, max: number} {
  const regexp = /(\d+)x(\d+)/;
  const n1 = +multiple.id.match(regexp)![1];
  const n2 = +multiple.id.match(regexp)![2];
  return n1 < n2 ? {min: n1, max: n2} : {min: n2, max: n1};
}


export function getResult(multiple: Multiple) {
  const {min, max} = _getMinAndMaxFromId(multiple);
  return min * max;
}


export function getRandomFilteredMultiple(multiples: Multiple[], filterFn: (m: Multiple) => boolean): Multiple | null {
  const filtered = multiples.filter(filterFn);
  const randomIdx = Math.floor((Math.random() * filtered.length))
  return filtered[randomIdx];
}


export const containsNegativeNumber = (arr: number[]): boolean => {
  const foundNegative = arr.find(a => a < 0);
  return foundNegative !== undefined;
}

export const containsDuplicateNumber = (arr: number[]): boolean => {
  const foundDuplicate = arr.find((item, idx, self) => self.indexOf(item) !== idx);
  return foundDuplicate !== undefined;
}


export function generateMultiplesByBases(bases: number[], factors: number[]): Multiple[] {
  if (containsNegativeNumber(bases) || containsDuplicateNumber(bases)) {
    throw new Error('Bases contains negative or duplicate number...')
  }
  if (containsNegativeNumber(factors) || containsDuplicateNumber(factors)) {
    throw new Error('Factors contains negative or duplicate number...')
  }

  const sortedBases = bases.sort((a,b) => a-b);
  const sortedFactors = factors.sort((a,b) => a-b);

  const results: Multiple[] = [];
  for (const base of sortedBases) {
    for (const factor of sortedFactors) {
      const factorMustBeSkipped = sortedBases.includes(factor) && factor < base;
      const ZERO = 0;
      if (!factorMustBeSkipped && isNonNegativeNumber(ZERO)) {
        results.push({
          id: `${base}x${factor}`,
          successes: ZERO,
          fails: ZERO
        })
      }
    }
  }
  return results;
}


