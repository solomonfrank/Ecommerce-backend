import AppError from './errorHandler';

export const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

export const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    res.status(err.statusCode).json({
      status: 'error',
      message: 'something went wrong'
    });
  }
};

export const handleCastErrorDb = err => {
  const message = `invalid data ${err.value} format`;
  return new AppError(message);
};

export const handleDbValidationErr = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `invlaid input data ${errors.join('. ')}`;
  return new AppError(message, 400);
};

export const handleDuplicateErr = err => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `input already ${value} exist`;
  return new AppError(message, 400);
};

export const handleJWTError = () =>
  new AppError('invalid token, please login again', 401);

export const handleTokenExpired = () =>
  new AppError('your token has expired', 401);
