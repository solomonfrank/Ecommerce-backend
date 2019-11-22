import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../model/userModel';
import catchAsync from '../helpers/catchAsync';

import AppError from '../helpers/errorHandler';

dotenv.config();

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
export const signupController = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  const token = await jwt.sign(
    {
      id: newUser._id
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  res.status(201).json({
    status: 'success',
    token,
    data: newUser
  });
});

export const signinController = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('please provode valid email or password', 400));
  }
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = jwt.sign(
    {
      id: user._id
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
  res.status(200).json({
    status: 'success',
    token
  });
});

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // eslint-disable-next-line prefer-destructuring
    token = req.headers.authorization(' ')[1];
  }

  if (!token) {
    return next(new AppError('you are not logged in ', 401));
  }

  const decoded = await promisify(jwt.verify)(token, JWT_SECRET);

  const user = User.findById(decoded.id);
  if (!user) {
    return next(new AppError('user belonging to the no longer exist', 401));
  }
  if (user.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('user recently changed password', 401));
  }
  req.user = user;
  next();
});

export const restrict = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('you dont have permission to this route', 403));
    }
    next();
  };
};
