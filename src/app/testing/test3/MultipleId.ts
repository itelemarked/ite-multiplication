import { throwError } from "./utils";



export type MultipleId = string & {_type: 'MultipleId'}

export function toMultipleId(s: string): MultipleId {
  if (!s.match(/^\d+x\d+$/)) throwError(`${s} doesn't match 'nxn'...`)
  return s as MultipleId;
}
