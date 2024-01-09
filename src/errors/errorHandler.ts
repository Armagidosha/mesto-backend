import { Request, Response, NextFunction } from 'express';

export interface IError extends Error {
  statusCode: number
}

export default (err: IError, _req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  console.log(err);
  next();
};
