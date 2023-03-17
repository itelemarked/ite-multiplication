
export class Multiple {
	readonly id: string
	readonly f1: number
	readonly f2: number
	readonly result: number

	private _successes: number
	get successes(): number {
		return this._successes
	}

	private _fails: number
	get fails(): number {
		return this.fails
	}

	constructor(
		f1: number,
		f2: number,
		successes: number = 0,
		fails: number = 0
		) {
			this.f1 = f1
			this.f2 = f2
			this._successes = successes
			this._fails = fails
			this.result = f1 * f2
			this.id = f2 > f1 ? `${f1}x${f2}` : `${f2}x${f1}`
	}

	addSuccess() {
		return this._successes++
	}

	addFail() {
		return this._fails++
	}

	toData() {
		return {
			f1: this.f1,
			f2: this.f2,
			successes: this._successes,
			fails: this._fails
		}
	}

	clone(): Multiple {
		const {f1, f2, successes, fails} = this;
		return new Multiple(f1, f2, successes, fails)
	}
}






