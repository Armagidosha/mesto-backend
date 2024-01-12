import { Router } from 'express';
import NotFoundError from '../errors/notFound';
import authMiddleware from '../middlewares/auth';
import authRouter from './auth';
import userRouter from './user';
import cardRouter from './card';

const router = Router();

router.use('/', authRouter);
router.use(authMiddleware);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', (_req, _res, next) => {
  next(new NotFoundError('Ресурс не найден'));
});

export default router;
