import { Application, NextFunction, Request, Response } from 'express';

export type Handler = (req: Request, res: Response, next: NextFunction) => Promise<unknown | void> | void;

export type Route = {
  path: string;
  method: string;
  validator?: any;
  handler: Handler | Handler[];
};

export type Wrapper = (app: Application) => unknown;

export type ReqInput = {
  url?: string;
  params?: {};
  headers?: any;
  query?: {};
  body?: {};
};
export type Rule = {
  from: string;
  key: string;
  type: string | any;
  required: boolean;
  enum?: string[];
  isSubDoc?: boolean;
  message?: string;
  validate?: Function;
};
