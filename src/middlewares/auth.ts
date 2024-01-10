import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/unauthorized';

const { JWT_KEY } = process.env;

export default (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      throw new UnauthorizedError('Необходима авторизация');
    }
    const payload = jwt.verify(token, JWT_KEY as string);
    if (!payload) {
      throw new UnauthorizedError('Необходима авторизация');
    }
    req.user = payload as { _id: string };
    next();
  } catch (error) {
    next(error);
  }
};
