
export function randomIntBetween(min: number, max: number) {
  if(min >= max) throw new Error('Invalid arguments: min must be smaller than max!!')
  return Math.floor(Math.random() * (max - min + 1) + min);
}
