
export type TId = `${number}x${number}`

export interface Multiple {
  readonly id: TId,
  successes: number,
  fails: number
}

export interface Training {
  successesRequired: number,
  multiples: Multiple[]
}


