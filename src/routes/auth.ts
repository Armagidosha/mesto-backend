import { Joi, celebrate } from 'celebrate';
import { Router } from 'express';
import UserCtrl from '../controllers/user';

const router = Router();

router.post('/signup', celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().uri({ scheme: ['http', 'https'] }),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
}), UserCtrl.createUser);

router.post('/signin', celebrate({
  body: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), UserCtrl.login);

export default router;
