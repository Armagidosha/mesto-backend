import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Conflict from '../errors/conflict';
import NotFoundError from '../errors/notFound';
import userModel from '../models/user';
import envConfig from '../config';
import UnauthorizedError from '../errors/unauthorized';

// TODO: refactor add decorators

class UserCtrl {
  async getUsers(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userModel.find({});
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async getCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userModel.findById(req.params.id);
      if (!user) {
        throw new NotFoundError('Пользователь по указзаному _id не найден.');
      }
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userModel.findById(req.user._id);
      if (!user) {
        throw new NotFoundError('Пользователь по указзаному _id не найден.');
      }
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        name,
        about,
        avatar,
        password,
        email,
      } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userModel.create({
        email, password: hashedPassword, name, about, avatar,
      });
      return res.status(201).json({
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      });
    } catch (error) {
      if ((error as any).code === 11000) {
        next(new Conflict('Пользователь уже существует.'));
      } else {
        next(error);
      }
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, about } = req.body;
      const user = await userModel.findByIdAndUpdate(
        req.user._id,
        { name, about },
        { new: true, runValidators: true },
      );
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
      const user = await userModel.findByIdAndUpdate(
        req.user._id,
        { avatar },
        { new: true, runValidators: true },
      );
      if (!user) {
        throw new NotFoundError('Пользователь по указзаному _id не найден.');
      }
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email }).select('+password');
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      const matched = await bcrypt.compare(password, user.password);

      if (!matched) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      const token = jwt.sign({ _id: user._id }, envConfig.JWT_KEY as string, { expiresIn: '7d' });
      return res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      }).end();
    } catch (error) {
      next(error);
    }
  }
}

export default new UserCtrl();
