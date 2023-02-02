import { Multiple, TId } from "./interfaces";


function _getMinAndMaxFromId(id: TId): {min: number, max: number} {
  const regexp = /(\d+)x(\d+)/;
  const match = id.match(regexp);

  if (match === null) {
    throw new Error(`Invalid Id: not matching regexp ${regexp}`)
  }

  const n1 = +match[1];
  const n2 = +match[2];

  return n1 < n2 ? {min: n1, max: n2} : {min: n2, max: n1};
}

export function getResult(id: TId) {
  const {min, max} = _getMinAndMaxFromId(id);
  return min * max;
}

export function getRandomFilteredMultiple(multiples: Multiple[], filterFn: (m: Multiple) => boolean): Multiple | null {
  const filtered = multiples.filter(filterFn);
  const randomIdx = Math.floor((Math.random() * filtered.length))

  return filtered[randomIdx];
}
