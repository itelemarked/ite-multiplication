import { IMultiple } from "../interfaces/multiple.interface";

export class Multiple implements IMultiple {
  id: string;
  successes: number;
  fails: number;
  n1: number;
  n2: number;
  value: number;

  constructor(imulti: IMultiple) {
    this.id = imulti.id;
    this.successes = imulti.successes || 0;
    this.fails = imulti.fails || 0;

    const [n1, n2] = imulti.id.split('x').sort((a,b) => +a - +b);
    this.n1 = +n1;
    this.n2 = +n2;

    this.value = this.n1 * this.n2;
  }

  percentage(): number | null {
    if (this.successes === 0 && this.fails === 0) {
      return null;
    } else {
      return this.successes / (this.successes + this.fails);
    }
  }

  getRandomId(): string {
     if (Math.random() < 0.5) {
       return this.n1.toString() + ' x ' + this.n2.toString()
     } else {
      return this.n2.toString() + ' x ' + this.n1.toString()
     }
  }

  toJson(): IMultiple {
    return {id: this.id, successes: this.successes, fails: this.fails}
  }

}
