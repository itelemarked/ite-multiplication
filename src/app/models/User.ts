
const DOMAIN = '@ite-multiplication.com';

export function toUsername(email: string) {
  const domainRegexp = new RegExp(`${DOMAIN}$`)
  if (!email.match(domainRegexp)) throw new Error("invalid email: should end with '@ite-multiplication.com'!")

  return email.replace(DOMAIN, "");
}

export function toEmail(username: string) {
  return username + DOMAIN;
}




export class User {

  uid: string;
  username: string;

  constructor(uid: string, username: string) {
    this.uid = uid;
    this.username = username;
  }

}






// export class User {

//   private DOMAIN = '@ite-multiplication.com';

//   readonly uid: string;
//   readonly username: string;
//   readonly email: string;

//   constructor(uid: string, username?: string, email?: string) {
//     if(username !== undefined && email !== undefined) throw new Error('Invalid constructor arguments: username and email cannot be both be given!');
//     if(username === undefined && email === undefined) throw new Error('Invalid constructor arguments: username or email must be given!');
    
//     this.uid = uid;
//     this.username = username || this.toUsername(email!);
//     this.email = email || this.toEmail(username!);
//   }

//   private toUsername(email: string) {
//     const domainRegexp = new RegExp(`${this.DOMAIN}$`)
//     if (!email.match(domainRegexp)) throw new Error("invalid email: should end with '@ite-multiplication.com'!")
  
//     return email.replace(this.DOMAIN, "");
//   }
  
//   private toEmail(username: string) {
//     return username + this.DOMAIN;
//   }

// }






