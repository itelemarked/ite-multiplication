import { ITest } from "../models/test/test.interface";

interface IIdValue {
  id: string,
  value: number
}


function getMultiplesFrom(min: number, max: number): IIdValue[] {
  if (min > max) throw new Error('Min is greater than max!')

  const results = [];

  for (let i = min; i <= max; i++) {
    for (let j = i; j <= max; j++) {
      const id = i.toString() + 'x' + j.toString();
      const value = i * j;
      results.push({id, value});
    }
  }

  return results;
}


function randomIntWithin(min: number, max: number): number {
  if (min > max) throw new Error('Min is greater than max!')

  return Math.floor(Math.random() * (max-min+1)) + min;
}


const MULTIPLES = {
  overall: getMultiplesFrom(0, 12).map(m => 
    ({id: m.id, value: m.value, successes: randomIntWithin(0, 20), fails: randomIntWithin(0, 20)})
  ),
  test1: getMultiplesFrom(0, 12).map(m => 
    ({id: m.id, value: m.value, successes: randomIntWithin(0, 2), fails: randomIntWithin(0, 5)})
  )
}


export let MOCK_TESTS: ITest[] = [
  {
    id: 'overall',
    successNb: null,
    completed: false,
    multiples: MULTIPLES.overall
  },
  {
    id: 'test1',
    successNb: 2,
    completed: false,
    multiples: MULTIPLES.test1
  }
]