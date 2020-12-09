import { IBase } from './base';

export interface IUser extends IBase {
  username: string;
  password: string;
  rePassword: string;
}
