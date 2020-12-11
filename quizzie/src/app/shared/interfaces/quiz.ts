import { IBase } from './base';

export interface IQuiz extends IBase {
  username: string;
  password: string;
  rePassword: string;
}