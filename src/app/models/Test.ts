import { IMultiple, IMultipleMap } from "./Multiple";

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




export class Test implements ITest {

  id: string;
  completed: boolean;
  successNb: number | null;
  multiples: IMultipleMap;
  timeInterval: number;
  creationDate: number;

  constructor(id: string, itest: ITest) {
    this.id = id;
    this.completed = itest.completed;
    this.successNb = itest.successNb;
    this.multiples = itest.multiples;
    this.timeInterval = itest.timeInterval;
    this.creationDate = itest.creationDate;
  }

  toJson(): ITest {
    const completed = this.completed;
    const successNb = this.successNb;
    const multiples = this.multiples;
    const timeInterval = this.timeInterval;
    const creationDate = this.creationDate;
    return {completed, successNb, multiples, timeInterval, creationDate}
  }

}

