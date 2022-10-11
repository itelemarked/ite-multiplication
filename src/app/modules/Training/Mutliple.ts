export class Multiple {
  private _n1: number;
  private _n2: number;
  private _successes: number;
  private _fails: number;

  constructor(a: number, b: number, successes: number = 0, fails: number = 0) {
    // make sure n1 is smaller or equal to n2
    if (a <= b) {
      this._n1 = a;
      this._n2 = b;
    } else {
      this._n1 = b;
      this._n2 = a;
    }
    this._successes = successes;
    this._fails = fails;
  }

  getN1(): number {
    return this._n1;
  }
  
  getN2(): number {
    return this._n2;
  }
  
  getSuccesses(): number {
    return this._successes;
  }
  
  getFails(): number {
    return this._fails;
  }
  
  getResult(): number {
    return this._n1 * this._n2;
  }

  getId(): string {
    return `${this._n1}x${this._n2}`;
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
