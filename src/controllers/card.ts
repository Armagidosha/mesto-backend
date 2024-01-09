import { Request, Response, NextFunction } from 'express';
import NotFoundError from '../errors/notFound';
import CardModel from '../models/card';

class CardCtrl {
  async getCards(req: Request, res: Response, next: NextFunction) {
    try {
      const cards = await CardModel.find({});
      return res.json(cards);
    } catch (error) {
      next(error);
    }
  }

  async createCard(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req);
      const { name, link } = req.body;
      const card = await CardModel.create({ name, link, owner: req.user._id });
      return res.status(201).json(card);
    } catch (error) {
      next(error);
    }
  }

  async deleteCard(req: Request, res: Response, next: NextFunction) {
    try {
      const card = await CardModel.findByIdAndDelete(req.params.cardId);
      if (!card) {
        throw new NotFoundError('Карточка по указзаному _id не найдена.');
      }
      return res.json(card);
    } catch (error) {
      next(error);
    }
  }

  async likeCard(req: Request, res: Response, next: NextFunction) {
    try {
      const card = await CardModel.findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: req.user._id } },
        { new: true },
      );
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки.');
      }
      return res.json(card);
    } catch (error) {
      next(error);
    }
  }

  async dislikeCard(req: Request, res: Response, next: NextFunction) {
    try {
      const card = await CardModel.findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } },
        { new: true },
      );
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки.');
      }
      return res.json(card);
    } catch (error) {
      next(error);
    }
  }
}

export default new CardCtrl();
