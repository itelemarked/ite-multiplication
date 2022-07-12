
export class Multiple {

  n1: number;
  n2: number;
  successes: number;
  fails: number;

  get id(): string {
    const str1 = this.n1.toString();
    const str2 = this.n2.toString();
    return `${str1}x${str2}`;
  }

  get value(): number {
    return this.n1 * this.n2;
  }

  constructor(a: number, b: number) {
    // if (a < b) {
      this.n1 = a;
      this.n2 = b;
    // } else {
    //   this.n1 = b;
    //   this.n2 = a;
    // }
    this.successes = 0;
    this.fails = 0;
  }

  getTitle(random = false) {
    const str1 = this.n1.toString();
    const str2 = this.n2.toString();
    if (random) {
      return Math.random() < 0.5 ? `${str1} x ${str2}` : `${str2} x ${str1}`
    } else {
      return `${str1} x ${str2}`;
    }
  }

}
