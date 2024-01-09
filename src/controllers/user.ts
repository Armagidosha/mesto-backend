import { Request, Response, NextFunction } from 'express';
import { isCelebrateError } from 'celebrate';
import BadRequest from '../errors/badRequest';
import NotFoundError from '../errors/notFound';
import UserModel from '../models/user';

class UserCtrl {
  async getUsers(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserModel.find({});
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async getCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Всё ок');
      console.log(req);
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        throw new NotFoundError('Пользователь по указзаному _id не найден.');
      }
      return res.json(user);
    } catch (error) {
      if (isCelebrateError(error)) {
        next(new BadRequest('Переданы некорректные данные'));
      }
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, about, avatar } = req.body;
      const user = await UserModel.create({ name, about, avatar });
      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, about } = req.body;
      const user = await UserModel.findByIdAndUpdate(req.user._id, { name, about }, { new: true });
      if (!user) {
        throw new NotFoundError('Пользователь по указзаному _id не найден.');
      }
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const { avatar } = req.body;
      const user = await UserModel.findByIdAndUpdate(req.user._id, { avatar }, { new: true });
      if (!user) {
        throw new NotFoundError('Пользователь по указзаному _id не найден.');
      }
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserCtrl();
