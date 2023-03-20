import type {Negative, SetOptional} from 'type-fest';

function negative<T extends number>(n: T) {
  return n as Negative<T>
}

let a: Negative<T extends number> = -1
console.log(a)

