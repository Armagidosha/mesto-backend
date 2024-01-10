import { Request, Response, NextFunction } from 'express';
import NotFoundError from '../errors/notFound';
import CardModel from '../models/card';
import ForbiddenError from '../errors/forbidden';

class CardCtrl {
  async getCards(_req: Request, res: Response, next: NextFunction) {
    try {
      const cards = await CardModel.find({});
      return res.json(cards);
    } catch (error) {
      next(error);
    }
  }

  async createCard(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, link } = req.body;
      const card = await CardModel.create({ name, link, owner: req.user._id });
      return res.status(201).json(card);
    } catch (error) {
      next(error);
    }
  }

  async deleteCard(req: Request, res: Response, next: NextFunction) {
    try {
      const card = await CardModel.findById(req.params.cardId);
      if (!card) {
        throw new NotFoundError('Карточка по указзаному _id не найдена.');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нельзя удалять чужие карточки.');
      }
      await card.deleteOne();
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
