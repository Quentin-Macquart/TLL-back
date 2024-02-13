import { ReqInput } from '@app/shared/utils/helper/types';

export const mockResponse = () => {
  const res: any = {};
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

export const mockRequest = (args?: ReqInput) => {
  let req: any = {};
  if (args) {
    req = { ...req, ...args };
  }
  return req;
};

export const mockNext = () => jest.fn();
