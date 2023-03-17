import { Multiple } from "./model.multiple";
import { throwError } from "./utils";


export class Training {
	private _id: string
	get id(): string {
		return this._id;
	}

	private _successRequired: number
	get successRequired(): number {
		return this._successRequired;
	}

	private _multiples: Multiple[]
	get multiples(): Multiple[] {
		return this._multiples.map(m => m.clone())
	}

	constructor(
	  id: string,
		successRequired: number,
		multiples: Multiple[],
	) {
    if (multiples.length === 0) throwError(`Invalid multiples: it is empty`)

		this._id = id;
		this._multiples = multiples.map(m => m.clone())
		this._successRequired = successRequired;
	}

}


function _containsDuplicates(arr: number[]): boolean {
	const foundDuplicate = arr.find((item, idx, self) => self.indexOf(item) !== idx);
	return foundDuplicate !== undefined;
}

export function generateMultiples(bases: number[], factors: number[]): Multiple[] {
  if (_containsDuplicates(bases)) throwError(`Array contains duplicates: ${bases}`)
	if (_containsDuplicates(factors)) throwError(`Array contains duplicates: ${factors}`)

  const multiples: Multiple[] = [];
  for (const base of bases) {
    for (const factor of factors) {
			const newMultiple = new Multiple(base, factor);
			const newId = newMultiple.id;
			const ids = multiples.map(m => m.id)
			if (!ids.includes(newId)) {
				multiples.push(newMultiple);
			}
    }
  }

  return multiples;
}

