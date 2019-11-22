import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import mangoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean'
import helmet from 'helmet';
import apiRouter from './routes';
import AppError from './helpers/errorHandler';
import {
  sendErrorDev,
  sendErrorProd,
  handleCastErrorDb,
  handleDuplicateErr,
  handleDbValidationErr,
  handleJWTError,
  handleTokenExpired
} from './helpers/responseHandler';

dotenv.config();
const app = express();
// http header
app.use(helmet())

app.use(express.json({ limit: '10kb'}));

// data sanitization against NoSQL injection
app.use(mangoSanitize());

// sanitize against xss
app.use(xss());

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

const rateLimiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'too many request for this IP'
});

app.use(morgan('dev'));

// limit request from same ip
app.use('/api', rateLimiter);

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
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleTokenExpired();
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
