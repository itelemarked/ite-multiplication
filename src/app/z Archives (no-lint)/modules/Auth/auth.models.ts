

export const AUTH_EMAIL_SUFFIX = '@ite-multiplication.com';

export type TAuthStatus = 'login' | 'signup' | 'logout';

export interface IAuthError {
  code: string;
  message: string;
}

export interface IUserData {
  username: string;
}

export interface IUserDatas {
  [key: string]: IUserData;
}

export interface IUser extends IUserData {
  id: string;
}



