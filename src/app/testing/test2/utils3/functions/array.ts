
export function hasDuplicate<T extends string | number | boolean >(arr: T[]) {
  const foundDuplicate = arr.find((item, idx, self) => self.indexOf(item) !== idx);
  return foundDuplicate !== undefined;
}
