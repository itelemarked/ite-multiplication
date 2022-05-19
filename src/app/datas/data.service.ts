
import { Injectable } from "@angular/core";
import { Multiple } from "../models/multiple/multiple.model";
import { ITest } from "../models/test/test.interface";
import { Test } from "../models/test/test.model";
import { MOCK_TESTS } from "./mock.tests";


interface IDataService {
  getTestById: (testId: string) => ITest | undefined,
  getFirstPendingTest: () => ITest | undefined,
  addTest: (test: Test) => void,
  removeTest: (testId: string) => void,
  editTest: (test: Test) => void,
  editMultiple: (testId: string, multiple: Multiple) => void
}



@Injectable({providedIn: 'root'})
export class DataService implements IDataService {

  constructor() {}

  getTestById(testId: string): ITest | undefined {
    return MOCK_TESTS.find(t => t.id === testId);
  }

  getFirstPendingTest(): ITest | undefined {
    return MOCK_TESTS.find(t => !t.completed);
  }

  addTest(test: Test) {
    MOCK_TESTS.push(test.toJson())
  }

  removeTest(testId: string) {
    const foundIndex = MOCK_TESTS.findIndex(t => t.id === testId);
    if (foundIndex > -1) {
      MOCK_TESTS.splice(foundIndex, 1);
    }
  }

  editTest(test: Test) {
    const foundITest: ITest | undefined = MOCK_TESTS.find(t => t.id === test.id);
    if(foundITest !== undefined) {
      // foundITest.id won't be changed!
      foundITest.completed = test.completed;
      foundITest.multiples = test.multiples;
      foundITest.successNb = test.successNb;
    }
  }

  editMultiple(testId: string, multiple: Multiple) {
    const foundITest: ITest | undefined = MOCK_TESTS.find(t => t.id === testId);
    if(foundITest !== undefined) {
      const foundIMultiple = foundITest.multiples.find(m => m.id === multiple.id);
      foundIMultiple!.value = multiple.value;
      foundIMultiple!.successes = multiple.successes;
      foundIMultiple!.fails = multiple.fails;
    }
  }

}