import { throwError } from "./utils";

export const DOMAIN = '@ite-multiplication.com'

export class User {
	private _id: string
	private _email: string
	private _username: string

	get id(): string {
		return this._id;
	}

	get email(): string {
		return this._email;
	}

	get username(): string {
		return this._username;
	}

	constructor(id: string, username: string) {
		this._id = id;
		this._username = username;
		this._email = username + DOMAIN;
	}
}


export function toUsername(email: string): string {
	if (!email.includes(DOMAIN)) throwError(`email doen't contains Domain`)
	return email.replace(DOMAIN, '');
}

export function toEmail(username: string): string {
	return username + DOMAIN;
}
