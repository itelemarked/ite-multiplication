
export function randomItem<T>(arr: T[]): T {
  const randomIdx = Math.floor(Math.random() * arr.length);
  return arr[randomIdx];
}

export function containsNegativeNumber(arr: number[]): boolean {
  const foundNegative = arr.find((f1) => f1 < 0);
  return foundNegative !== undefined;
}

export function containsDuplicates<T extends number | string | boolean>(arr: T[]): boolean {
  const foundDuplicate = arr.find(
    (item, idx, self) => self.indexOf(item) !== idx
  );
  return foundDuplicate !== undefined;
}

