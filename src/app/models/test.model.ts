import { IMultiple } from "../interfaces/multiple.interface";
import { ITest } from "../interfaces/test.interface";

export class Test implements ITest {

  id: string;
  requiredSuccesses: number;
  remainingIds: string[];
  multiples: IMultiple[];

  constructor(itest: ITest) {
    this.id = itest.id;
    this.remainingIds = itest.remainingIds;
    this.requiredSuccesses = itest.requiredSuccesses;
    this.multiples = itest.multiples;
  }


}
