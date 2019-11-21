import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import apiRouter from './routes';
import AppError from './helpers/errorHandler';
import {
  sendErrorDev,
  sendErrorProd,
  handleCastErrorDb,
  handleDuplicateErr,
  handleDbValidationErr
} from './helpers/responseHandler';

dotenv.config();
const app = express();
app.use(express.json());

//uncaught exception
process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  process.exit(1);
});

// db conn using mongoose
let connectionString = process.env.DATABASE_LOCAL_URL;
if (process.env.NODE_ENV === 'production') {
  connectionString = process.env.DATABASE_PROD_URL;
}

mongoose
  .connect(`${connectionString}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('db successfully connected'));

app.use(morgan('dev'));

// app.route('/api/v1/order').get(getOrders);
app.use(apiRouter);

app.all('*', (req, res, next) => {
  next(new AppError('Routes does not exist on the error', 404));
});

// error handler middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }

  if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (error.name === 'CastError') error = handleCastErrorDb(err);
    if (error.code === 11000) error = handleDuplicateErr(err);
    if (error.name === 'ValidationError') error = handleDbValidationErr(err);
    sendErrorProd(error, res);
  }
});

const PORT = 5000 || process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`app running on  port ${PORT}`);
});

//unhandle rejection
process.on('unhandleRejection', err => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
