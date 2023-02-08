import { Multiple, TId } from "./interfaces";


function _getMinAndMaxFromId(id: TId): {min: number, max: number} {
  const regexp = /(\d+)x(\d+)/;
  const match = id.match(regexp);

  if (match === null) {
    throw new Error(`Invalid Id: not matching regexp ${regexp}`)
  }

  const n1 = +match[1];
  const n2 = +match[2];

  return n1 < n2 ? {min: n1, max: n2} : {min: n2, max: n1};
}


export function getResult(id: TId) {
  const {min, max} = _getMinAndMaxFromId(id);
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
  for (let i = 0; i < bases.length; i++) {
    const baseItem = sortedBases[i];
    for (let j = 0; j < factors.length; j++) {
      const factorItem = sortedFactors[j];

      if (!bases.includes(factorItem) || factorItem >= baseItem) {
        results.push({
          id: `${baseItem}x${factorItem}`,
          successes: 0,
          fails: 0
        })
      }
    }
  }

  return results;
}


