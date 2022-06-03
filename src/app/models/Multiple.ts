

export interface IMultiple {
  n1: number;
  n2: number;
  successes: number;
  fails: number;
}

/**
 * Example: 
 *    const iMultipleMap = {
 *      (...)
 *      '3x3': {n1: 3, n2: 3, successes: 0, fails: 0},
 *      (...)
 *    }
 */
export interface IMultipleMap {
  [key:string]: IMultiple;
}

/**
 * Example: 
 *    const iMultipleArr = [
 *     (...)
 *     {id: '3x3', n1: 3, n2: 3, successes: 0, fails: 0},
 *     (...)
 *    ]
 */
export type IMultipleArr = (IMultiple & { id: string })[];


export function toMultipleArr(multipleMap: IMultipleMap): IMultipleArr {
  const multipleArr: IMultipleArr = [];

  for(let key in multipleMap) {
    const id = key;
    const {...rest} = multipleMap[key];
    multipleArr.push({id, ...rest})
  }

  return multipleArr;
}

export function toMultipleMap(multipleArr: IMultipleArr): IMultipleMap {
  const multipleMap: IMultipleMap = {};

  multipleArr.forEach(m => {
    const {id, ...rest} = m;
    multipleMap[id] = {...rest};
  })

  return multipleMap;
} 


export function getMultipleMapFromBases(bases: number[]): IMultipleMap {
  const orderedBases = bases.sort((a: number, b: number) => a - b)

  let results: IMultipleMap = {};

  for(let i = 0; i < orderedBases.length; i++) {
    for(let j = i; j < orderedBases.length; j++) {
      const m = new Multiple({n1: orderedBases[i], n2: orderedBases[j], successes: 0, fails: 0})
      results[m.id as keyof IMultiple] = m.toJson();
    }
  }

  return results;
}


export class Multiple {

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
