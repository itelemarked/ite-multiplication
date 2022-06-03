import { IMultiple, IMultipleArr, IMultipleMap, Multiple, toMultipleArr, toMultipleMap } from "./Multiple";

export interface ITest {
  completed: boolean;
  successNb: number | null;
  multiples: IMultipleMap;
  timeInterval: number;
  creationDate: number;
}


const ID = 'test'

export function toNb(testId: string): number {
  if(!testId.match(/^test\d+$/)) throw new Error("Invalid testId: should be format 'testXX' where XX is an integger")
  return +testId.replace(ID, '');
}

export function toTestId(nb: number): string {
  if (nb < 1) throw new Error("Invalid nb: should be equal or greater than 1")
  return ID + nb.toString();
}




export class Test {

  id: string;
  completed: boolean;
  successNb: number | null;
  timeInterval: number;
  creationDate: number;
  multiples: Multiple[];

  constructor(id: string, itest: ITest) {
    this.id = id;
    this.completed = itest.completed;
    this.successNb = itest.successNb;
    this.timeInterval = itest.timeInterval;
    this.creationDate = itest.creationDate;
    this.multiples = toMultipleArr(itest.multiples).map(m => new Multiple(m));
  }

  toJson(): ITest {
    const completed = this.completed;
    const successNb = this.successNb;
    const multiples = toMultipleMap(this.multiples);
    const timeInterval = this.timeInterval;
    const creationDate = this.creationDate;
    return {completed, successNb, multiples, timeInterval, creationDate}
  }

  getMultiples(filteredBy?: 'id'): Multiple[] {
    switch(filteredBy) {
      case undefined:
        return this.multiples;
      case 'id':
        return this.multiples.sort((a, b) => {
          const aNb = a.n1 + a.n2/100;
          const bNb = b.n1 + b.n2/100;

          if(aNb < bNb) return -1;
          if(aNb > bNb) return 1;
          return 0;
        })
    }
  }

  getMultipleById(multipleId: string): Multiple | null {
    const foundMultiple = this.multiples.find(m => m.id === multipleId);
    if(foundMultiple) {
      return foundMultiple
    } else {
      return null;
    }
  }

}

