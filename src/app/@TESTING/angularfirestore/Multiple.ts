

export interface IMultiple {
  n1: number;
  n2: number;
  successes: number;
  fails: number;
}

export interface IKeyStringIMultiple {
  [key:string]: IMultiple
}


export function getMultiplesFromBases(bases: number[]): IKeyStringIMultiple {
  const orderedBases = bases.sort((a: number, b: number) => a - b)

  let results: IKeyStringIMultiple = {}
  
  for(let i = 0; i < orderedBases.length; i++) {
    for(let j = i; j < orderedBases.length; j++) {
      const m = new Multiple({n1: orderedBases[i], n2: orderedBases[j], successes: 0, fails: 0})
      results[m.id] = m.toJson();
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

  randomString(): string {
    if (Math.random() < 0.5) {
      return this.n1.toString() + ' x ' + this.n2.toString();
    } else {
      return this.n2.toString() + ' x ' + this.n1.toString();
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





// export class Multiple implements IMultiple {

//   id: string;
//   value: number;
//   successes: number;
//   fails: number;

//   n1: number;
//   n2: number;

//   constructor(n1: number, n2: number, successes?: number, fails?: number) {
//     this.id = n1.toString() + 'x' + n2.toString();
//     this.value = n1 * n2;
//     this.successes = successes || 0;
//     this.fails = fails || 0;
//     this.n1 = n1;
//     this.n2 = n2;
//   }

//   randomString(): string {
//     if (Math.random() < 0.5) {
//       return this.n1.toString() + ' x ' + this.n2.toString();
//     } else {
//       return this.n2.toString() + ' x ' + this.n1.toString();
//     }
//   }

//   toJson(): IMultiple {
//     return {
//       id: this.id,
//       value: this.value,
//       successes: this.successes,
//       fails: this.fails
//     }
//   }

// }