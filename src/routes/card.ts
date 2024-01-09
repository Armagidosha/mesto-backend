import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import CardCtrl from '../controllers/card';

const router = Router();

router.get('/cards', CardCtrl.getCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().uri({ scheme: ['http', 'https'] }),
  }),
}), CardCtrl.createCard);

router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), CardCtrl.deleteCard);

router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), CardCtrl.likeCard);

router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), CardCtrl.dislikeCard);

export default router;
