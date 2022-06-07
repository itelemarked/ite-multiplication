

export interface IMultiple {
  n1: number;
  n2: number;
  successes: number;
  fails: number;
}

export function multiplesFromBases(bases: number[]): Multiple[] {
  const orderedBases = bases.sort((a: number, b: number) => a - b)

  let results: Multiple[] = [];

  for(let i = 0; i < orderedBases.length; i++) {
    for(let j = i; j < orderedBases.length; j++) {
      const m = new Multiple({n1: orderedBases[i], n2: orderedBases[j], successes: 0, fails: 0})
      results.push(m);
    }
  }

  return results;
}


export class Multiple implements IMultiple {

  n1: number;
  n2: number;
  successes: number;
  fails: number;

  id: string;
  value: number;


  constructor(iMultiple: IMultiple) {
    if (iMultiple.n1 > iMultiple.n2) throw new Error('Invalid arguments: n1 must be smaller or equal to n2!')

    this.n1 = iMultiple.n1;
    this.n2 = iMultiple.n2;
    this.successes = iMultiple.successes;
    this.fails = iMultiple.fails;

    this.id = iMultiple.n1.toString() + 'x' + iMultiple.n2.toString();
    this.value = iMultiple.n1 * iMultiple.n2;
  }

  title(inverted?: boolean): string {
    if(inverted === true) {
      return this.n2.toString() + ' x ' + this.n1.toString();
    } else {
      return this.n1.toString() + ' x ' + this.n2.toString();
    }
  }

  randomTitle(): string {
    if (Math.random() < 0.5) {
      return this.title();
    } else {
      return this.title(true);
    }
  }


  toJson(): IMultiple {
    return {
      n1: this.n1,
      n2: this.n2,
      successes: this.successes,
      fails: this.fails
    }
  }

}






export interface ITest {
  timeInterval: number;
  successNb: number | null;
  creationDate: number;
  completed: boolean;
  multiples: Multiple[];
}


const ID = 'test'

export function toNb(testId: string): number {
  const idRegexp = new RegExp(`^${ID}\d+$`)
  if(!testId.match(idRegexp)) throw new Error("Invalid testId: should be format 'testXX' where XX is an integger")
  return +testId.replace(ID, '');
}

export function toTestId(nb: number): string {
  if (nb < 1) throw new Error("Invalid nb: should be equal or greater than 1")
  return ID + nb.toString();
}




export class Test implements ITest {

  timeInterval: number;
  successNb: number | null;
  creationDate: number;
  completed: boolean;
  multiples: Multiple[];
  
  id: string;

  constructor(id: string, iTest: ITest) {
    this.completed = iTest.completed;
    this.successNb = iTest.successNb;
    this.timeInterval = iTest.timeInterval;
    this.creationDate = iTest.creationDate;
    this.multiples = iTest.multiples;

    this.id = id;
  }

  toJson(): ITest {
    const completed = this.completed;
    const successNb = this.successNb;
    const multiples = this.multiples;
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