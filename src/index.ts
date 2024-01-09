import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import userRouter from './routes/user';
import cardRouter from './routes/card';
import errorHandler from './errors/errorHandler';
import NotFoundError from './errors/notFound';

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
app.use((req, _res, next) => {
  req.user = {
    _id: '659d65e53158bc85981705c6',
  };
  next();
});

app.use(userRouter);
app.use(cardRouter);
app.use('*', (_req, _res, next) => {
  next(new NotFoundError('Ресурс не найден'));
});
app.use(errors());
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
