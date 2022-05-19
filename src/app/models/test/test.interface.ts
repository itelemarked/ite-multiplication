import { IMultiple } from "../multiple/multiple.interface";

export interface ITest {
  id: string;
  completed: boolean;
  successNb: number | null;
  multiples: IMultiple[];
}
