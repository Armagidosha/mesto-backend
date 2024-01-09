import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import UserCtrl from '../controllers/user';

const router = Router();

router.get('/users', UserCtrl.getUsers);

router.get('/users/:id', celebrate({
  params: Joi.object({
    id: Joi.string().required().alphanum().length(24),
  }),
}), UserCtrl.getCurrentUser);

router.post('/users', celebrate({
  body: Joi.object({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),
    avatar: Joi.string().required().uri({ scheme: ['http', 'https'] }),
  }),
}), UserCtrl.createUser);

router.patch('/users/me', celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(200).required(),
  }),
}), UserCtrl.updateProfile);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object({
    avatar: Joi.string().required().uri({ scheme: ['http', 'https'] }),
  }),
}), UserCtrl.updateAvatar);

export default router;
