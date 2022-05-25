import { IKeyStringIMultiple, IMultiple, Multiple } from "./Multiple";


export interface ITest {
  completed: boolean;
  successNb: number;
  multiples: {[key: string]: IMultiple};
}


export function getMultiplesFrom(min: number, max: number): IMultiple[] {
  if (min > max) throw new Error('Min is greater than max!')

  const results = [];

  for (let i = min; i <= max; i++) {
    for (let j = i; j <= max; j++) {
      const newMultiple = {
        n1: i,
        n2: j,
        successes: 0,
        fails: 0
      }
      results.push(newMultiple);
    }
  }

  return results;
}

// function getMultiplesFrom(min: number, max: number): Multiple[] {
//   if (min > max) throw new Error('Min is greater than max!')

//   const results = [];

//   for (let i = min; i <= max; i++) {
//     for (let j = i; j <= max; j++) {
//       const newMultiple = new Multiple(i, j);
//       results.push(newMultiple);
//     }
//   }

//   return results;
// }


export class Test implements ITest {

  id: string;
  completed: boolean;
  successNb: number;
  multiples: IKeyStringIMultiple;

  constructor(id: string, iTest: ITest) {
    this.id = id;
    this.successNb = iTest.successNb;
    this.completed = iTest.completed || false;
    this.multiples = iTest.multiples || getMultiplesFrom(0, 12);
  }

  // getMultiples(): Multiple[] {
  //   return this.multiples.map(m => new Multiple(m));
  // }

}