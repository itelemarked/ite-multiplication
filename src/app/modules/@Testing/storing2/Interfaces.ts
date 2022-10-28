import { Observable } from "rxjs";

export interface IMultipleData {
  f: number;
  b: number;
  successes: number;
  fails: number;
}

export interface IMultiple extends IMultipleData {
  id: string;
}

export interface ITrainingData {
  timeInterval: number;
  requiredSuccesses: number;
  bases: number[];
  factors: number[];
  multiple: IMultiple[];
}

export interface ITraining extends ITrainingData {
  id: string;
}

interface IStoreGetters {
  getTimeInterval$: (trainingId: string) => Observable<number | null>;
  getRequiredSuccesses$: (trainingId: string) => Observable<number | null>;
  getBases$: (trainingId: string) => Observable<number[] | null>;
  getFactors$: (trainingId: string) => Observable<number[] | null>;
  getMultiples$: (trainingId: string) => Observable<IMultiple[] | null>;
}

interface IStoreSetters {
  setTimeInterval: (trainingId: string, val: number) => Promise<void>;
  setRequiredSuccesses: (trainingId: string, val: number) => Promise<void>;
  setMultiples: (trainingId: string, factors: number[], bases: number[]) => Promise<void>;
  addMulitpleSuccess: (trainingId: string, multipleId: string) => Promise<void>;
  addMultipleFail: (trainingId: string, multipleId: string) => Promise<void>;
}

interface IAddRemove {
  addTraining: (timeInterval: number, requiredSuccesses: number, bases: number[], factors: number[]) => Promise<void>
  removeTraining: (trainingId: string) => Promise<void>;
}


export interface IDefaultStoreService extends IStoreGetters {}

export interface ILocalStoreService {
  getTimeInterval$: () => Observable<number | null>;
  getRequiredSuccesses$: () => Observable<number | null>;
  getBases$: () => Observable<number[] | null>;
  getFactors$: () => Observable<number[] | null>;
  getMultiples$: () => Observable<IMultiple[] | null>;

  setTimeInterval: (val: number) => Promise<void>;
  setRequiredSuccesses: (val: number) => Promise<void>;
  setMultiples: (factors: number[], bases: number[]) => Promise<void>;
  addMulitpleSuccess: (multipleId: string) => Promise<void>;
  addMultipleFail: (multipleId: string) => Promise<void>;
}

export interface IServerStoreService extends IStoreGetters, IStoreSetters, IAddRemove {}

export interface ITrainingService extends IStoreGetters, IStoreSetters, IAddRemove {}


const server_store_db = {
  'trainings': {
    '<trainingId>': {
      timeInterval: 3,
      requiredSuccesses: 2,
      bases: [1],
      factors: [2],
    }
    // (...)
  },
  'multiples': {
    '<trainingId>': {
      '<multipleId>': { 
        f: 1, b: 1, successes: 0, fails: 3 
      }
      // (...)
    }
    // (...)
  }
}

const local_store_db = {
  'trainings-trainingId:local': {
    timeInterval: 3,
    requiredSuccesses: 2,
    bases: [1],
    factors: [2],                    
  },
  'multiples-trainingId:local': {
    '1x1': { f: 1, b: 1, successes: 0, fails: 3 }
    // (...)
  }
}

const default_store = {
  training: {
    timeInterval: 3,
    requiredSuccesses: 2,
    bases: [1,2,3,4,5,6,7,8,9,10,11,12],
    factors: [1,2,3,4,5,6,7,8,9,10,11,12],
    multiples: []
  },
}