import { throwError } from "./utils";


export type NonNegativeInt = number & {_type: 'NonNegativeInt'}

export function toNonNegativeInt(n: number): NonNegativeInt {
  if (!Number.isInteger(n)) throwError(`${n} is not an integer...`)
  if (n < 0) throwError(`${n} is smaller than 0...`)
  return n as NonNegativeInt;
}
