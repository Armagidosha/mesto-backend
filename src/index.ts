import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import { errorLogger, requestLogger } from './middlewares/logger';
import errorHandler from './errors/errorHandler';
import envConfig from './config';
import routes from './routes';

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(envConfig.MONGO_CONNECT);
    // eslint-disable-next-line no-console
    app.listen(envConfig.PORT, () => console.log(`Server started on port: ${envConfig.PORT}`));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

start();
