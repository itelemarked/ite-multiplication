
const DOMAIN = '@ite-multiplication.com';

export function toUsername(email: string) {
  if (!email.match(/@ite-multiplication.com$/)) throw new Error("invalid email: should end with '@ite-multiplication.com'!")

  return email.replace(DOMAIN, "");
}

export function toEmail(username: string) {
  return username + DOMAIN;
}


export interface IUser {
  uid: string;
  username: string;
}
