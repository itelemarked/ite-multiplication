import { IMultiple, IMultipleConstructor } from "../interfaces/interfaces";
import { hasDuplicate } from "./array";

export function createMultiple(multipleConstructor: IMultipleConstructor): IMultiple {
  const {f1, f2, successes = 0, fails = 0} = multipleConstructor;
  return {
    f1,
    f2,
    successes,
    fails,
    id: `${f1}x${f2}`,
    result: f1 * f2
  }
}

export function generateMultiplesByBasesAndFactors(bases: number[], factors: number[]): IMultiple[] {
  if (hasDuplicate(bases)) throw new Error(`Found duplicate in ${bases}!`)
  if (hasDuplicate(factors)) throw new Error(`Found duplicate in ${factors}!`)

  const sortedBases = bases.sort((a,b) => a-b)
  const sortedFactors = factors.sort((a,b) => a-b)

  let multiples: IMultiple[] = []
  for (const base of sortedBases) {
    for (const factor of sortedFactors) {
      if (!sortedBases.includes(factor) || factor >= base) {
        multiples.push(createMultiple({f1: base, f2: factor}))
      }
    }
  }
  return multiples;
}
