
export function throwError(msg: string): never {
  const prefix = 'ITE-ERROR: ';
  throw new Error(prefix + msg);
}


export function uuid(): string {
  const prefix = Date.now();
  const suffix = Math.floor(Math.random() * 1000000);
  return prefix + '-' + suffix;
}
