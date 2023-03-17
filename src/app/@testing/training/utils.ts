

export function throwError(msg: string): never {
  const prefix = 'ITE-ERROR: '
  throw new Error(prefix + msg);
}

export function toUniqueSortedInt(numbers: number[]): number[] | never {
  if (numbers.length === 0) throwError(`The array must have at least one value`)

  const foundNonInt = numbers.find(n => !Number.isInteger(n))
  if (foundNonInt !== undefined) throwError(`Non integer found: ${foundNonInt}`)

  const foundNonUnique = numbers.find((n, idx, self) => self.indexOf(n) !== idx)
  if (foundNonUnique !== undefined) throwError(`Non unique found: ${foundNonUnique}`)

  return numbers.sort((a, b) => a-b);
}




export function uuid(): string {
	const prefix = Date.now()
	const suffix = Math.random() * 1000
	return prefix + '-' + suffix;
}

export function toNonNegativeInt(n: number): number {
	if (!Number.isInteger(n)) throwError('n is not an integer')
	if (n < 0) throwError('n is negative')
	return n;
}


export function getRandomIntBetween(min: number, max: number): number | never {
  if (min > max) throwError(`min: ${min} is greater than max: ${max}`);
  return Math.floor(Math.random() * (max - min + 1) + min)
}


// export function arrToObj<T extends {[key:string]: any}>(arr: T[], idField: keyof T) {

// 	const obj: {
// 		[key:string]: Exclude<T, idField>
// 	} = {}

// 	arr.forEach(a => {
// 		const {[idField]: id, ...rest} = a;
// 		obj[id] = rest
// 	})

// 	return obj;
// }


// // TODO: type of idField must exclude typeof T
// export function objToArr<T extends {[key:string]: any}>(obj: {[key:string]: T}, idField: string) {

// 	const arr = []

// 	for(const key in obj) {
// 		const innerObj: {[key:string]: any} = obj[key];
// 		innerObj[idField] = key;
// 		arr.push(innerObj)
// 	}

// 	return arr;
// }

// export function containsDuplicates<T extends {[key:string]:any}, R extends keyof T>(arr: T[], key: R): boolean
// export function containsDuplicates<T extends string | number>(arr: T[]): boolean
// export function containsDuplicates<T, R extends keyof T>(arr: T[], key?: R): boolean {
// 	let newArr: unknown[];
// 	key !== undefined ? newArr = arr.map(a => a[key]) : newArr = arr;

// 	const foundDuplicate = newArr.find((item, idx, self) => self.indexOf(item) !== idx);
// 	return foundDuplicate !== undefined;
// }

// containsDuplicates([{id: {x:2}}], 'id')
