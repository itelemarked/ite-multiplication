import { Training } from "./classes/training";
import { createMultiple } from "./functions/multiple";

const multiples = [
  createMultiple({f1: 2, f2: 3}),
  createMultiple({f1: 3, f2: 3})
]
const training = new Training(1, multiples)
training.complete$.subscribe(val => console.log(val))

const m = training.getMultiples();
console.log(m)
training.addSuccess('2x3')
console.log(m)
training.addSuccess('3x3')
console.log(m)

