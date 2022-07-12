import { Multiple } from "./Multiple";
import { randomIntBetween } from "./Utils";

export class MultipleGroup {

  multiples: Multiple[];
  successNb: number;
  timeInterval: number;

  constructor(bases: number[], successNb: number, timeInterval: number) {
    this.multiples = this.multiplesFromBases(bases);
    this.successNb = successNb;
    this.timeInterval = timeInterval;
  }

  multiplesFromBases(bases: number[]): Multiple[] {
    const multiples = [];
    const sortedBases = bases.sort((a,b) => a-b);

    const uniqueSortedBases: number[] = [];
    sortedBases.forEach(b => {
      if(!uniqueSortedBases.includes(b)) {
        uniqueSortedBases.push(b);
      }
    })

    for(let i = 0; i < uniqueSortedBases.length; i++) {
      for(let j = 1; j < 13; j++) {

        const a = uniqueSortedBases[i];
        const b = j;

        if(!uniqueSortedBases.includes(b) || b >= a) {
          multiples.push(new Multiple(a, b))
        } else {
        }

      }
    }

    return multiples;
  }

  getMultipleById(id: string): Multiple | undefined {
    return this.multiples.find(m => m.id === id);
  }

  getUncompleteMultiples(): Multiple[] {
    return this.multiples.filter(m => m.successes < this.successNb)
  }

  pickRandomUncompleteMultiple(): Multiple | null {
    const uncompletes = this.getUncompleteMultiples();

    let randomIndex: number;
    if (uncompletes.length === 1) {
      return uncompletes[0];
    } else if(uncompletes.length > 1) {
      randomIndex = randomIntBetween(0, uncompletes.length - 1)
      return uncompletes[randomIndex];
    } else {
      return null;
    }
  }

}
