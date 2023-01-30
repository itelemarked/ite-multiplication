export class Multiple {
  private _id: string;
  private _n1: number;
  private _n2: number;
  private _successes: number;
  private _fails: number;
  private _result: number;

  get n1(): number {
    return this._n1;
  }

  get n2(): number {
    return this._n2;
  }

  get successes(): number {
    return this._successes;
  }

  get fails(): number {
    return this._fails;
  }

  get result(): number {
    return this._result;
  }

  get id(): string {
    return this._id;
  }

  constructor(
    n1: number,
    n2: number,
    successes: number = 0,
    fails: number = 0
  ) {
    this._id = `${n1}x${n2}`
    this._n1 = n1;
    this._n2 = n2;
    this._result = n1 * n2;
    this._successes = successes;
    this._fails = fails;
  }

  getTitle(random: boolean = false): string {
    if (!random) {
      return `${this._n1} x ${this._n2}`;
    } else {
      return Math.random() < 0.5
        ? `${this._n1} x ${this._n2}`
        : `${this._n2} x ${this._n1}`;
    }
  }

  addSuccess() {
    this._successes += 1;
  }

  addFail() {
    this._fails += 1;
  }
}
