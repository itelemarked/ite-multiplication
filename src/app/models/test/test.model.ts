import { IMultiple } from "../multiple/multiple.interface";
import { ITest } from "./test.interface";

export class Test implements ITest {

  id: string;
  completed: boolean;
  successNb: number | null;
  multiples: IMultiple[];

  constructor(itest: ITest) {
    this.id = itest.id;
    this.completed = itest.completed;
    this.successNb = itest.successNb;
    this.multiples = itest.multiples;
  }

  toJson(): ITest {
    return {id: this.id, completed: this.completed, successNb: this.successNb, multiples: this.multiples}
  }

}
