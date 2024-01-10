import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import { errorLogger, requestLogger } from './middlewares/logger';
import authRouter from './routes/auth';
import userRouter from './routes/user';
import cardRouter from './routes/card';
import errorHandler from './errors/errorHandler';
import NotFoundError from './errors/notFound';
import authMiddleware from './middlewares/auth';

const {
  PORT = 3000,
  MONGO_CONNECT = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(requestLogger);
app.use(authRouter);
app.use(authMiddleware);
app.use(userRouter);
app.use(cardRouter);

app.use('*', (_req, _res, next) => {
  next(new NotFoundError('Ресурс не найден'));
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(MONGO_CONNECT);
    // eslint-disable-next-line no-console
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

start();
