import { IMultiple } from "./multiple.interface";

export interface ITest {
  id: string;
  remainingIds: string[];
  requiredSuccesses: number;
  multiples: IMultiple[]; // length: 91
}
